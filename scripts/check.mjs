import {readFile,readdir,access} from 'node:fs/promises';
import path from 'node:path';
export async function checkSite(root) {
  const pages=['index.html',...(await readdir(path.join(root,'projets'))).filter(p=>p.endsWith('.html')).map(p=>'projets/'+p)];
  const documents=new Map();
  for(const relative of pages){
    const html=await readFile(path.join(root,relative),'utf8');
    const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
    if(new Set(ids).size!==ids.length)throw new Error(`Duplicate IDs in ${relative}`);
    if(/motion-toggle|motion-paused|Mettre en pause|Activer les animations/.test(html))throw new Error(`Animation control in ${relative}`);
    documents.set(relative,{html,ids});
  }
  for(const [relative,{html}] of documents){
    for(const [,target] of html.matchAll(/(?:src|href)="([^"]+)"/g)){
      if(/^(https?:|mailto:|data:)/.test(target))continue;
      const [filename,fragment]=target.split('#');
      const destination=filename?path.resolve(root,path.dirname(relative),filename):path.join(root,relative);
      if(!destination.startsWith(root+path.sep))throw new Error(`Link leaves site: ${target}`);
      await access(destination);
      if(fragment){
        const key=path.relative(root,destination).replaceAll(path.sep,'/');
        if(!documents.get(key)?.ids.includes(fragment))throw new Error(`Missing anchor ${target} from ${relative}`);
      }
    }
  }
  const css=await readFile(path.join(root,'assets/css/portfolio.css'),'utf8');
  if(/@keyframes\s+drift|animation:\s*drift|motion-toggle/.test(css))throw new Error('Planet animation rules remain');
  console.log(`Verified ${pages.length} pages: local links, anchors, assets, and removed animation controls.`);
}
