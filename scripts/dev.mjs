import http from 'node:http';
import {readFileSync} from 'node:fs';
import {handleRequest} from '../src/core.js';
const port=Number(process.env.PORT||4173);
http.createServer(async(req,res)=>{
 try{let chunks=[];for await(const c of req)chunks.push(c);const abort=new AbortController();res.on('close',()=>{if(!res.writableEnded)abort.abort()});const request=new Request('http://'+req.headers.host+req.url,{method:req.method,headers:req.headers,body:['GET','HEAD'].includes(req.method)?undefined:Buffer.concat(chunks),signal:abort.signal});const response=await handleRequest(request,process.env,readFileSync(new URL('../src/index.html',import.meta.url),'utf8'));res.writeHead(response.status,Object.fromEntries(response.headers));res.end(Buffer.from(await response.arrayBuffer()));}catch{res.writeHead(500,{'Content-Type':'application/json'});res.end(JSON.stringify({error:'Local server error.'}));}
}).listen(port,'127.0.0.1',()=>console.log('Local: http://127.0.0.1:'+port));
