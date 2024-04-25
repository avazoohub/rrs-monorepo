import React from 'react';

export default function useFacebookSdk() {
  React.useEffect(() => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: '3562080684033215', 
        cookie: true,
        xfbml: true,
        version: 'v19.0',
      });
    };

    (function (d, s, id) {
      let js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;

      js = d.createElement(s) as HTMLScriptElement;
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode?.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  }, []);
};
