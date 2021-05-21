<App { ...f7params } >

<!--   <Views init={false} tabs class="safe-areas">
      <Toolbar tabbar labels bottom>
        <Link tabLink={items[0].link} icon={items[0].icon} text={items[0].text} tabLinkActive />
        <Link tabLink={items[1].link} icon={items[1].icon} text={items[1].text} />
        <Link tabLink={items[2].link} icon={items[2].icon} text={items[2].text} />
        <Link tabLink={items[3].link} icon={items[3].icon} text={items[3].text} />
      </Toolbar>


      <View id="view-home" name="main" main tab tabActive url="/" animate={false} />
      <View id="view-telemetry" name="telemetry" tab url="/telemetry/" />
      <View id="view-settings" name="settings" tab url="/settings/" />
      <View id="view-service" name="service" tab url="/service/" />
  </Views> -->
  <Main/>

</App>

<script>
  import { onMount } from 'svelte';
  import { getDevice }  from '../js/framework7-custom.js';
  import {
    f7,
    f7ready,
    App,
    Views,
    View,
    Toolbar,
    Link
  } from 'framework7-svelte';

/*   import { fade, fly, slide } from 'svelte/transition'; */
/*   import {Router, Route} from 'svelte-routing'; */
/*   import { scale } from 'svelte/transition'; */
/*   import HomePage from '../pages/home.svelte';
  import AboutPage from '../pages/about.svelte'; */



  import capacitorApp from '../js/capacitor-app';
  import routes from '../js/routes';
  import store from '../js/store';
  import {t} from '../services/i18n.js';
  import connecting from '../js/storeconn.js'
  import Main from '../pages/appview.svelte';
//import { link } from 'fs';
//import { isContext, isContext } from 'vm';

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
  // Login screen demo data
/*   let username = '';
  let password = ''; */
  let url = window.location.pathname;

/*   $: link = (link) => {
    return (store.state.connect) ? link : '#'
  } */

  let items = [
    {link: '#view-home',      text: $t('Cosmoiler'),  icon: "icon-rocket"},
    {link: '', text: $t('Телеметрия'), icon: "icon-telemetry-outline"},
    {link: '#view-settings',  text: $t('Настройки'),  icon: "icon-settings"},
    {link: '#view-service',   text: $t('Сервис'),     icon: "icon-service"},
  ]

  $: console.log(store.getters.connected)

  onMount(() => {

    f7ready(() => {

      // Init capacitor APIs (see capacitor-app.js)
      if (f7.device.capacitor) {
        capacitorApp.init(f7);
      }
      // Call F7 APIs here
      store.dispatch('init')
      items[1].link = (store.getters.connected.value) ? items[1].link = '#view-telemetry' : ''
      console.log(store.getters.connected)
      //f7.views.main.router.navigate('/home/')
      //f7.views.create('.safe-areas',{url: '/'})
     // this.$f7router.navigate('/home/')
      //f7.views.main.router.navigate({ name: 'telemetry' });

    });
  })

 // $: items[1].link = (connected)?'#view-telemetry' : ''

</script>
