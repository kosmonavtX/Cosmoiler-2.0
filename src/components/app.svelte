<App { ...f7params } >

  <Main/>

</App>

<script>
  import { onMount } from 'svelte';
  import { getDevice }  from '../js/framework7-custom.js';
  import {
    f7,
    f7ready,
    App,
  } from 'framework7-svelte';

  import capacitorApp from '../js/capacitor-app';
  import routes from '../js/routes';
  import store from '../js/store';
  import Main from '../pages/appview.svelte';

  const device = getDevice();
  // Framework7 Parameters
  let f7params = {
    name: 'Cosmoiler 2.0', // App name
    theme: 'auto', // Automatic theme detection

    id: 'com.cosmoiler.app', // App bundle ID
    // App store
    store: store,
    // App routes
    routes: routes,

    // TODO Input settings
    input: {
      scrollIntoViewOnFocus: device.capacitor,
      scrollIntoViewCentered: device.capacitor,
    },
    // TODO Capacitor Statusbar settings
    statusbar: {
      iosOverlaysWebView: true,
      androidOverlaysWebView: true,
    }
  };

  onMount(() => {

    f7ready(() => {

      // Init capacitor APIs (see capacitor-app.js)
      if (f7.device.capacitor) {
        capacitorApp.init(f7);
      }
      // Call F7 APIs here
      store.dispatch('init')
    });
  })

</script>
