import React, { useEffect } from 'react';
import { useData } from '../context/DataContext';

export const AnalyticsScripts: React.FC = () => {
  const { siteSettings } = useData();

  useEffect(() => {
    // Яндекс.Метрика + Вебвизор
    if (siteSettings.yandexMetrikaId) {
      const id = siteSettings.yandexMetrikaId;
      if (!document.querySelector(`script[data-ym-id="${id}"]`)) {
        const script = document.createElement('script');
        script.setAttribute('data-ym-id', id);
        script.textContent = `
          (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
          m[i].l=1*new Date();
          for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}
          k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
          (window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");
          ym(${id},"init",{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:true});
        `;
        document.head.appendChild(script);
      }
    }

    // Яндекс.Директ
    if (siteSettings.yandexDirectId) {
      const id = siteSettings.yandexDirectId;
      if (!document.querySelector(`script[data-yd-id="${id}"]`)) {
        const script = document.createElement('script');
        script.setAttribute('data-yd-id', id);
        script.src = `https://yandex.ru/ads/system/context.js`;
        script.async = true;
        document.head.appendChild(script);
      }
    }

    // Calltouch
    if (siteSettings.calltouchModId && siteSettings.calltouchRoutKey) {
      const modId = siteSettings.calltouchModId;
      if (!document.querySelector(`script[data-ct-mod="${modId}"]`)) {
        const script = document.createElement('script');
        script.setAttribute('data-ct-mod', modId);
        script.textContent = `
          (function(w,d,n,c){w.CalltouchDataObject=n;w[n]=function(){w[n]["callbacks"].push(arguments)};
          if(!w[n]["callbacks"]){w[n]["callbacks"]=[]}w[n]["loaded"]=false;
          if(typeof c!=="object"){c=[c]}w[n]["counters"]=c;
          for(var i=0;i<document.scripts.length;i++){if(document.scripts[i].id===n){return;}}
          var f=d.getElementsByTagName("script")[0],s=d.createElement("script");
          s.type="text/javascript";s.async=true;s.id=n;
          s.src="https://mod.calltouch.ru/init.js?id="+c[0];
          s.onerror=function(){w[n]["hierarch498498498"]=1};f.parentNode.insertBefore(s,f);
          })(window,document,"ct","${modId}");
        `;
        document.head.appendChild(script);
      }
    }
  }, [siteSettings.yandexMetrikaId, siteSettings.yandexDirectId, siteSettings.calltouchModId, siteSettings.calltouchRoutKey]);

  // Render noscript pixel for Yandex Metrika
  if (siteSettings.yandexMetrikaId) {
    return (
      <noscript>
        <div>
          <img src={`https://mc.yandex.ru/watch/${siteSettings.yandexMetrikaId}`} style={{position:'absolute',left:'-9999px'}} alt="" />
        </div>
      </noscript>
    );
  }

  return null;
};
