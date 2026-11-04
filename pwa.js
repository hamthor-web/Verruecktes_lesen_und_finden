'use strict';
(()=>{
 const button=document.getElementById('installApp'),status=document.getElementById('installStatus'),dialog=document.getElementById('installHelp'),help=document.getElementById('installHelpText');
 if(!button)return;
 let deferred=null;
 const ua=navigator.userAgent||'',ios=/iPad|iPhone|iPod/i.test(ua)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
 const android=/Android/i.test(ua),firefox=/Firefox|FxiOS/i.test(ua),safari=/Safari/i.test(ua)&&!/Chrome|CriOS|Edg|FxiOS|OPR/i.test(ua);
 const standalone=()=>matchMedia('(display-mode: standalone)').matches||navigator.standalone===true;
 const msg=t=>{status.hidden=false;status.textContent=t;};
 function update(){button.textContent=standalone()?'Installiert':'Installieren';button.disabled=standalone();}
 addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferred=e;update();});
 addEventListener('appinstalled',()=>{deferred=null;msg('Das Spiel ist installiert und kann vom Startbildschirm geöffnet werden.');update();});
 document.getElementById('installHelpClose').onclick=()=>dialog.close();
 function guidance(){
  if(ios)return 'Auf iPhone oder iPad: Öffne diese Seite in Safari. Tippe auf „Teilen“ und anschließend auf „Zum Home-Bildschirm“ bzw. „Zum Home-Bildschirm hinzufügen“. Bestätige die Auswahl.';
  if(android&&firefox)return 'Firefox auf Android: Öffne das Menü (⋮) und wähle „Installieren“ oder „Zum Startbildschirm hinzufügen“. Die genaue Bezeichnung hängt von deiner Firefox-Version ab.';
  if(android)return 'Öffne das Browsermenü (⋮) und wähle „App installieren“ oder „Zum Startbildschirm hinzufügen“. In Chrome, Edge oder Samsung Internet kann die Bezeichnung abweichen.';
  if(firefox)return 'Firefox unter Windows und Linux unterstützt keine direkte Installation dieser Web-App als eigenständige Anwendung. Du kannst sie weiter in Firefox spielen. Für eine installierte App öffne dieselbe Adresse in Chrome oder Edge und wähle im Browsermenü „App installieren“.';
  if(safari)return 'Safari auf dem Mac: Wähle im Menü „Ablage“ die Funktion „Zum Dock hinzufügen“, sofern deine macOS-Version sie anbietet.';
  return 'In Chrome oder Edge: Öffne das Browsermenü und wähle „App installieren“ bzw. unter „Apps“ die Installationsfunktion. Falls der Eintrag fehlt, lade die Seite neu. Das Spiel kann jederzeit auch direkt im Browser genutzt werden.';
 }
 button.onclick=async()=>{
  if(standalone())return;
  if(deferred){const p=deferred;deferred=null;try{await p.prompt();const chosen=await p.userChoice;if(chosen.outcome==='accepted')msg('Installation bestätigt. Folge gegebenenfalls den weiteren Hinweisen des Geräts.');else msg('Installation nicht gestartet. Du kannst sie später erneut versuchen.');}catch{help.textContent=guidance();dialog.showModal();}update();return;}
  help.textContent=guidance();dialog.showModal();
 };
 if('serviceWorker' in navigator&&location.protocol==='https:')navigator.serviceWorker.register('./sw.js',{updateViaCache:'none'}).catch(()=>{msg('Der Installationsdienst ist gerade nicht verfügbar. Du kannst das Spiel trotzdem im Browser nutzen.');});
 update();
})();