import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {projects} from '../data/projects.mjs';
const root=new URL('../',import.meta.url);
const escape = value => String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const link = ([label,url],className='button') => `<a class="${className}" href="${escape(url)}" target="_blank" rel="noopener noreferrer">${escape(label)} <span aria-hidden="true">↗</span></a>`;
const pageUrl = p => `projets/${p.slug}.html`;
const contactLinks = [
  ['itch.io','https://apogriff.itch.io/'],
  ['GitHub','https://github.com/ThibautPat'],
  ['LinkedIn','https://www.linkedin.com/in/thibautpatry/?skipRedirect=true'],
  ['Email','mailto:patrythibautcontact@gmail.com']
].map(([label,url])=>`<a class="button" href="${escape(url)}"${url.startsWith('mailto:')?'':' target="_blank" rel="noopener noreferrer"'}>${label} <span aria-hidden="true">↗</span></a>`).join('');
const groups=[
  {id:'featured',title:'Projets scolaires',text:'C++, Unity, réseau et programmation graphique.'},
  {id:'experiments',title:'Prototypes & game jams',text:'Simulation, gameplay et intégration.'}
];
function card(p){
  const cover=p.cover?`images/games/${p.cover}`:`images/planets/${p.planet}.webp`;
  return `<article class="game-card${p.cover?'':' planet-card'}" style="--accent:${p.accent}">
      <a href="${pageUrl(p)}" aria-label="${escape(p.title)} — voir le projet">
        <div class="game-cover"><img src="${cover}" alt="${p.cover?'Jaquette de '+escape(p.title):''}" width="${p.cover?315:1536}" height="${p.cover?250:1024}" loading="lazy">${p.cover?'':`<span class="planet-card-label">${escape(p.stack.slice(0,2).join(' / '))}</span>`}<span class="game-open" aria-hidden="true">Voir le projet →</span></div>
        <h3>${escape(p.title)}</h3>
      </a><p class="game-description">${escape(p.summary)}</p><p class="game-genre">${escape(p.category)}</p><p class="game-platforms">${escape(p.role)}</p>
    </article>`;
}
const homeProjects=`<section id="projets" class="section projects" aria-labelledby="projects-title">
  <div class="section-heading"><div><p class="eyebrow">01 / PROJETS</p><h2 id="projects-title">Mes projets</h2></div><span class="project-count">${projects.length} projets</span></div>
  ${groups.map(g=>`<div class="project-group"><div class="project-group-heading"><h3>${g.title}</h3><p>${g.text}</p></div><div class="games-grid">${projects.filter(p=>p.group===g.id).map(card).join('\n')}</div></div>`).join('\n')}
</section>`;
let home=await readFile(new URL('index.html',root),'utf8');
if(!home.includes('<!-- PROJECTS:START -->')||!home.includes('<!-- PROJECTS:END -->')) throw new Error('Project insertion markers are missing');
home=home.replace(/<!-- PROJECTS:START -->[\s\S]*?<!-- PROJECTS:END -->/,`<!-- PROJECTS:START -->\n${homeProjects}\n<!-- PROJECTS:END -->`);
home=home.replace(/<div class="contact-links">[\s\S]*?<\/div>/,`<div class="contact-links">${contactLinks}</div>`);
await writeFile(new URL('index.html',root),home);
await mkdir(new URL('projets/',root),{recursive:true});
for(let i=0;i<projects.length;i++){
  const p=projects[i],next=projects[(i+1)%projects.length];
  const sourceLinks=p.links.map(l=>link(l)).join('');
  const html=`<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#080e14">
  <meta name="description" content="${escape(p.summary)} Portfolio de Thibaut Patry.">
  <title>${escape(p.title)} — Thibaut Patry</title>
  <link rel="icon" href="../assets/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="../assets/css/portfolio.css">
  <script src="../assets/js/portfolio.js" defer></script>
</head>
<body class="project-page" style="--accent:${p.accent}">
  <a class="skip-link" href="#presentation">Aller à la présentation du projet</a>
  <header class="header"><a class="brand" href="../index.html" aria-label="Thibaut Patry, accueil">thibaut<span class="brand-dot">.</span></a><nav aria-label="Navigation principale"><a href="../index.html#projets" aria-current="page">Mes projets</a><a href="../index.html#univers">À propos</a><a href="#contact">Contact</a></nav></header>
  <main>
    <section class="project-hero" aria-labelledby="project-title">
      <img class="project-planet" src="../images/planets/${p.planet}.webp" alt="" width="1536" height="1024" fetchpriority="high">
      <div class="project-hero-shade"></div>
      <div class="project-hero-copy"><a class="back-link" href="../index.html#projets">← Tous les projets</a><p class="eyebrow">${escape(p.category)}</p><h1 id="project-title">${escape(p.title)}</h1><p class="project-lead">${escape(p.summary)}</p><ul class="tech-list" aria-label="Technologies et caractéristiques">${p.stack.map(s=>`<li>${escape(s)}</li>`).join('')}</ul></div>
    </section>
    <div class="project-details">
      <dl class="project-facts">${p.facts.map(([name,value])=>`<div><dt>${escape(name)}</dt><dd>${escape(value)}</dd></div>`).join('')}</dl>
      <section id="presentation" class="project-overview" aria-labelledby="overview-title"><div class="section-label"><span>01</span><h2 id="overview-title">Le projet</h2></div><div><p>${escape(p.overview)}</p><div class="project-source-links">${sourceLinks}</div></div></section>
      <section class="project-work" aria-labelledby="work-title"><div class="section-label"><span>02</span><h2 id="work-title">${escape(p.workTitle)}</h2></div><div><ol class="contribution-list">${p.work.map(item=>`<li>${escape(item)}</li>`).join('')}</ol></div></section>
      <section class="project-learning" aria-labelledby="learning-title"><div class="section-label"><span>03</span><h2 id="learning-title">Ce que j’en retiens</h2></div><div>${p.learning.map(item=>`<p>${escape(item)}</p>`).join('')}</div></section>
      ${p.cover?`<figure class="project-cover-detail"><img src="../images/games/${p.cover}" alt="Jaquette officielle de ${escape(p.title)}" width="315" height="250" loading="lazy"><figcaption><span class="eyebrow">VERSION PUBLIÉE</span><h2>${escape(p.title)}</h2><p>Retrouvez la version jouable et les informations de téléchargement sur la page du jeu.</p>${link(p.links[0])}</figcaption></figure>`:''}
      <nav class="project-pagination" aria-label="Navigation entre les projets"><a href="../index.html#projets">← Tous les projets</a><a href="${next.slug}.html"><span>Projet suivant</span><strong>${escape(next.title)} →</strong></a></nav>
    </div>
    <section id="contact" class="section contact" aria-labelledby="contact-title"><div class="contact-copy"><p class="eyebrow">CONTACT</p><h2 id="contact-title">Me retrouver</h2><p>Mes jeux et mon code.</p></div><div class="contact-links">${contactLinks}</div></section>
  </main>
  <footer><a class="brand" href="../index.html">thibaut<span class="brand-dot">.</span></a><p>Développeur jeux vidéo</p><a href="#project-title">Haut de page ↑</a><span>© <span data-year>2026</span> Thibaut Patry</span></footer>
</body>
</html>`;
  await writeFile(new URL(pageUrl(p),root),html);
}
console.log(`Rendered ${projects.length} internal project pages.`);
