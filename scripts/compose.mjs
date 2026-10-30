import {readFileSync,writeFileSync} from 'node:fs';
const core=readFileSync(new URL('../src/core.js',import.meta.url),'utf8');
const page=readFileSync(new URL('../src/index.html',import.meta.url),'utf8');
writeFileSync(new URL('../worker/index.js',import.meta.url),core+'\nconst PAGE = '+JSON.stringify(page)+';\nexport default {fetch(request,env){return handleRequest(request,env,PAGE)}};\n');
