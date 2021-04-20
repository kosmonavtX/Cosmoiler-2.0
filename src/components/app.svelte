<App { ...f7params } >


  <Views init={false} tabs class="safe-areas">
    {#if connected}

    <Toolbar tabbar labels bottom>
  <!--     <div style="display: contents" transition:fade="{{delay: 250, duration: 300}}"> -->
      <Link tabLink="#view-home" tabLinkActive icon="icon-rocket" text="Cosmoiler" />
      <Link tabLink="#view-telemetry" icon="icon-telemetry-outline" text="Телеметрия" />
      <Link tabLink="#view-settings" icon="icon-settings" text="Настройки" />
      <Link tabLink="#view-more" icon="icon-ellipsis-outline" text="Ещё" />
   <!--  </div> -->
    </Toolbar>


    {/if}

    <View id="view-home" name="main" main tab tabActive url="/" />

    <View id="view-telemetry" name="telemetry" tab url="/telemetry/" />

    <View id="view-settings" name="settings" tab url="/settings/" />

    <View id="view-more" name="more" tab url="/more/" />

  </Views>


<!--
  <View id="view-home" main>
    <Router url="{url}">
      <Route path="/about/">
          <div transition:scale={{duration:200}}>
            <AboutPage/>
          </div>
      </Route>
      <Route path="/**">
        <div transition:scale={{duration:200}}>
          <HomePage/>
        </div>
      </Route>
    </Router>
  </View> -->

<!--   <LoginScreen id="my-login-screen">
    <View>
      <Page loginScreen>
        <LoginScreenTitle>Login</LoginScreenTitle>
        <List form>
          <ListInput
            type="text"
            name="username"
            placeholder="Your username"
            bind:value={username}
          />
          <ListInput
            type="password"
            name="password"
            placeholder="Your password"
            bind:value={password}
          />
        </List>
        <List>
          <ListButton title="Sign In" onClick={() => alertLoginData()} />
        </List>
        <BlockFooter>
          Some text about login information.<br />Click "Sign In" to close Login Screen
        </BlockFooter>
      </Page>
    </View>
  </LoginScreen> -->
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
    Link,
    useStore
  } from 'framework7-svelte';
  import { fade, fly, slide } from 'svelte/transition';
/*   import {Router, Route} from 'svelte-routing'; */
/*   import { scale } from 'svelte/transition'; */
/*   import HomePage from '../pages/home.svelte';
  import AboutPage from '../pages/about.svelte'; */


  import capacitorApp from '../js/capacitor-app';
  import routes from '../js/routes';
  import store from '../js/store';

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
      androidOverlaysWebView: false,
    },
  };
  // Login screen demo data
  let username = '';
  let password = '';
  let url = window.location.pathname;

/*   function alertLoginData() {
    f7.dialog.alert('Username: ' + username + '<br>Password: ' + password, () => {
      f7.loginScreen.close();
    });
  } */
  /* let connected = f7.useStore('connected', (value) => connected = value);
 */
/*  const doSomething = () => {
    f7.dialog.alert('Hello world');
  }

  doSomething() */

  onMount(() => {

    f7ready(() => {

      // Init capacitor APIs (see capacitor-app.js)
      if (f7.device.capacitor) {
        capacitorApp.init(f7);
      }
      // Call F7 APIs here
      store.dispatch('init')
      //f7.views.main.router.navigate({ name: 'telemetry' });

    });
  })



  //console.log(document.getElementById('app'))

  let connected = useStore(store, 'connected', (value) => connected = value)



</script>
