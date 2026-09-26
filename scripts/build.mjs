import './render-projects.mjs';
import {mkdir,copyFile,cp,rm} from 'node:fs/promises';
import path from 'node:path';
import {checkSite} from './check.mjs';
const root=path.resolve(import.meta.dirname,'..');
const output=path.resolve(root,'dist');
if(path.dirname(output)!==root||path.basename(output)!=='dist')throw new Error('Invalid output directory');
await checkSite(root);
// Only generated output inside this checkout is replaced.
await rm(output,{recursive:true,force:true});
await mkdir(output,{recursive:true});
await copyFile(path.join(root,'index.html'),path.join(output,'index.html'));
for(const directory of ['assets','images','projets'])await cp(path.join(root,directory),path.join(output,directory),{recursive:true});
console.log('Static build ready in dist.');
