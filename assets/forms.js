/* Compatibility adapter for the original forms: all writes use the protected Edge Function. */
(()=>{
 if(window.iboukounForms)return;window.iboukounForms=true;
 const nativeFetch=window.fetch.bind(window);
 const configPromise=nativeFetch('/site-config.json').then(r=>r.json());
 const mapping={contact_submit:'contact',commande_submit:'commande',revendeur_submit:'revendeur',log_whatsapp:'whatsapp'};
 function result(message){return new Response(JSON.stringify({success:false,message}),{status:503,headers:{'Content-Type':'application/json'}});}
 window.fetch=async(input,options={})=>{
  const url=new URL(typeof input==='string'?input:input.url,location.href);
  const match=url.origin===location.origin&&url.pathname.match(/^\/api\/(contact_submit|commande_submit|revendeur_submit|log_whatsapp)(?:\.php)?$/);
  if(!match)return nativeFetch(input,options);
  const config=await configPromise;
  if(!config.supabaseUrl||!config.supabasePublicKey)return result('Les formulaires seront disponibles après la configuration Supabase. Vous pouvez nous contacter sur WhatsApp.');
  let payload={};
  if(options.body instanceof FormData)payload=Object.fromEntries(options.body.entries());
  else if(typeof options.body==='string')try{payload=JSON.parse(options.body);}catch{return result('Demande invalide.');}
  const action=mapping[match[1]],form=document.querySelector(action==='commande'?'form#fpOrderForm':action==='contact'?'form#contactForm':'form#revForm, form#revFormAccueil');
  const token=payload['cf-turnstile-response']||form?.querySelector('[name="cf-turnstile-response"]')?.value||document.querySelector('[name="cf-turnstile-response"]')?.value||'';
  try{
   const response=await nativeFetch(config.supabaseUrl+'/functions/v1/public-submit',{method:'POST',headers:{'Content-Type':'application/json',apikey:config.supabasePublicKey},body:JSON.stringify({action,payload,token}),signal:AbortSignal.timeout(20000),credentials:'omit'});
   return response;
  }catch{return result('Erreur réseau. Réessayez ou contactez-nous sur WhatsApp.');}
  finally{if(action!=='whatsapp'&&window.turnstile)document.querySelectorAll('[data-turnstile-id]').forEach(el=>window.turnstile.reset(el.dataset.turnstileId));}
 };
 window.mountIboukounForms=async()=>{
  const config=await configPromise;
  const forms=[...document.querySelectorAll('form')].filter(f=>!f.closest('#admin-app'));
  if(!config.turnstileSiteKey||!forms.length)return;
  const mount=()=>forms.forEach(form=>{
   if(form.querySelector('.iboukoun-captcha'))return;
   const container=document.createElement('div');container.className='iboukoun-captcha';
   form.querySelector('[type="submit"]')?.before(container);
   if(!container.isConnected)form.append(container);
   container.dataset.turnstileId=window.turnstile.render(container,{sitekey:config.turnstileSiteKey,language:'fr'});
  });
  if(window.turnstile){mount();return;}
  window.iboukounCaptchaReady=mount;
  if(!document.querySelector('script[data-captcha]')){const script=document.createElement('script');script.dataset.captcha='true';script.src='https://challenges.cloudflare.com/turnstile/v0/api.js?onload=iboukounCaptchaReady&render=explicit';script.async=true;document.head.append(script);}
 };
 window.mountIboukounForms();
})();
