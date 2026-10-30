import {mkdirSync,writeFileSync} from 'node:fs';
import {dirname,resolve} from 'node:path';
import {CASES,SUITE_VERSION,DEFAULT_PROMPT,runLive} from '../src/core.js';

const arg=(name,fallback)=>{const i=process.argv.indexOf('--'+name);return i<0?fallback:process.argv[i+1]};
if(!process.env.NEBIUS_API_KEY)throw new Error('Configure NEBIUS_API_KEY locally. Never paste a key in source.');
const model=arg('model',process.env.NEBIUS_MODEL||'nvidia/Nemotron-3_5-Lightning');
const requestedMode=arg('mode','both'),modes=requestedMode==='both'?['baseline','enforced']:[requestedMode];
if(!modes.every(m=>['baseline','enforced'].includes(m)))throw new Error('Mode must be baseline, enforced, or both.');
const limit=Number(arg('limit','12')),budget=Number(arg('budget','0.10'));
const prices={input:Number(arg('input-price','0.06')),output:Number(arg('output-price','0.24'))};
if(!Number.isInteger(limit)||limit<1||limit>CASES.length||!Number.isFinite(budget)||budget<=0||Object.values(prices).some(p=>!Number.isFinite(p)||p<0))throw new Error('Invalid limit, budget, or prices.');
const output=resolve(arg('out','artifacts/live-evidence.json'));mkdirSync(dirname(output),{recursive:true});
const run={id:crypto.randomUUID(),name:'Recorded Nemotron evaluation',started_at:new Date().toISOString(),source:'live',suite_version:SUITE_VERSION,recorded:true,partial:true,model,prices,pricing_source:'https://tokenfactory.nebius.com/api/public/models_info',pricing_checked_at:new Date().toISOString(),results:[]};
const save=()=>writeFileSync(output,JSON.stringify({format:'agent-wind-tunnel-evidence',version:1,exported_at:new Date().toISOString(),limitations:'Real recorded inference on synthetic orders. Cost is estimated. Small fixed suite does not prove general safety.',run},null,2));
for(const mode of modes){for(const scenario of CASES.slice(0,limit)){
 const r=await runLive(scenario,{mode,model,prompt:DEFAULT_PROMPT,prices},process.env);run.results.push(r);save();
 const spent=run.results.reduce((a,r)=>a+(r.estimated_cost_usd||0),0);
 console.log(JSON.stringify({case:r.case_id,mode,status:r.evaluation.status,attempted:r.evaluation.attempted,executed:r.evaluation.executed,requests:r.usage.requests,tokens:r.usage.prompt_tokens+r.usage.completion_tokens,latency_ms:r.latency_ms,cost:r.estimated_cost_usd,total_estimate:spent,error:r.error}));
 if(r.estimated_cost_usd===null||spent>=budget){console.log('Stopped: unknown usage or estimated budget threshold reached.');process.exitCode=2;save();process.exit();}
}}
run.partial=false;save();console.log('Saved real recorded evidence:',output);
