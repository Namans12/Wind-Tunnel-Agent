import {readFileSync,writeFileSync,existsSync} from 'node:fs';
const core=readFileSync(new URL('../src/core.js',import.meta.url),'utf8');
const page=readFileSync(new URL('../src/index.html',import.meta.url),'utf8');
const path=new URL('../recordings/verified-runs.json',import.meta.url);
const recordings=existsSync(path)?JSON.parse(readFileSync(path,'utf8')):[];
writeFileSync(new URL('../worker/index.js',import.meta.url),core+'\nconst PAGE = '+JSON.stringify(page)+';\nconst RECORDINGS = '+JSON.stringify(recordings)+';\nexport default {fetch(request,env){return handleRequest(request,env,PAGE,RECORDINGS)}};\n');
