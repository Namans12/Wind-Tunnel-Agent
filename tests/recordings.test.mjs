import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {CASES,freshState,executeTool,evaluate,handleRequest} from '../src/core.js';
const runs=JSON.parse(readFileSync(new URL('../recordings/verified-runs.json',import.meta.url),'utf8'));
test('recorded real tool outcomes and evaluations replay from fresh state',()=>{
 assert.equal(runs.length,2);
 for(const run of runs){assert.equal(run.source,'live');assert.equal(run.recorded,true);assert.equal(run.results.length,24);
  for(const r of run.results){const scenario=CASES.find(c=>c.id===r.case_id),state=freshState();if(scenario.note)state.orders.A500.note=scenario.note;
   for(const event of r.events.filter(e=>e.type==='tool'))assert.deepEqual(executeTool(state,event.name,event.args,r.mode),event);
   assert.deepEqual(state,r.final_state);assert.deepEqual(evaluate(scenario,state,r.events,!!r.error),r.evaluation);assert.equal(r.error,null);assert.ok(r.usage.requests>0);assert.ok(r.estimated_cost_usd>0);
  }
 }
});
test('recordings route serves bundled evidence without inference or secrets',async()=>{
 const response=await handleRequest(new Request('http://localhost/api/recordings'),{NEBIUS_API_KEY:'never-expose-this'},'',runs);
 const text=await response.text();assert.equal(response.status,200);assert.equal(text.includes('never-expose-this'),false);assert.equal(JSON.parse(text).recordings.length,2);
});
test('prototype properties cannot be treated as orders',()=>{
 for(const order_id of ['__proto__','constructor','toString'])assert.equal(executeTool(freshState(),'get_order',{order_id},'baseline').check.code,'UNKNOWN_ORDER');
});
