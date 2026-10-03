// Service worker auto-destrutivo.
//
// Este projeto NAO usa service worker. Este arquivo existe apenas para matar
// registros orfaos que ficaram presos no origin (ex.: http://localhost:3003),
// deixados por outro projeto que ja ocupou essa mesma porta.
//
// Service worker e escopado por origin (scheme + host + porta), nao por projeto.
// Um SW registrado por outro app na mesma porta continua interceptando os
// requests deste app — inclusive os chunks de HMR do Next — o que quebra o
// hot reload e joga o navegador num loop de full reload.
//
// Quando o navegador faz o update check da registration antiga, ele busca
// /sw.js, recebe este script, instala e ativa — e a ativacao se auto-remove.

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => caches.delete(key)));
      await self.registration.unregister();
    })()
  );
});
