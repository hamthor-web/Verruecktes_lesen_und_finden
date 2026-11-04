'use strict';
const VERSION='2026-11-04-install-1';
const CACHE='verrueckt-gesucht-shell-'+VERSION;
const SHELL=['./','index.html','style.css','app.js','data.js','engine.js','tree.js','pfau.js','pfau-art.js','tree-art.js','knurpsel.js','rakete.js','matschwiese.js','unterwasserwelt.js','baumhaus.js','marsmission.js','kinderzimmer.js','blumenwiese.js','wundereiche.js','pwa.js','manifest.webmanifest','icons/icon-192.png','icons/icon-512.png'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(async cache=>{for(const p of SHELL){const u=new URL(p,self.registration.scope);const res=await fetch(u,{cache:'reload'});if(!res.ok)throw Error('Missing: '+p);await cache.put(u,res);}}));self.skipWaiting();});
self.addEventListener('activate',event=>event.waitUntil((async()=>{for(const k of await caches.keys())if(k.startsWith('verrueckt-gesucht-shell-')&&k!==CACHE)await caches.delete(k);await self.clients.claim();})()));
self.addEventListener('fetch',event=>{
 const req=event.request;if(req.method!=='GET')return;const url=new URL(req.url);if(url.origin!==self.location.origin||!url.href.startsWith(self.registration.scope))return;
 event.respondWith((async()=>{
  if(req.mode==='navigate'){try{const fresh=await fetch(req);if(fresh.ok)(await caches.open(CACHE)).put(new URL('index.html',self.registration.scope),fresh.clone());return fresh;}catch{const cache=await caches.open(CACHE);return await cache.match(new URL('index.html',self.registration.scope))||Response.error();}}
  const cache=await caches.open(CACHE);const cached=await cache.match(req,{ignoreSearch:true});
  if(cached)return cached;
  try{const fresh=await fetch(req);if(fresh.ok)cache.put(req,fresh.clone()).catch(()=>{});return fresh;}catch{return Response.error();}
 })());
});