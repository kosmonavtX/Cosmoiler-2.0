<Page>
    <Views
        init={false}
        tabs
        class="safe-areas"
        browserHistoryStoreHistory={false}>

        <Toolbar tabbar labels bottom>
          <Link tabLink={items[0].link} icon={items[0].icon} text={items[0].text} tabLinkActive />
          <Link tabLink={items[1].link} icon={items[1].icon} text={items[1].text} />
          <Link tabLink={items[2].link} icon={items[2].icon} text={items[2].text} />
          <Link tabLink={items[3].link} icon={items[3].icon} text={items[3].text} />
    <!--       {#each items as {link, icon, text}, i}
          {#if i == 0}
            <Link tabLink={link} tabLinkActive icon={icon} text={text} />
            {:else}
            <Link tabLink={link} icon={icon} text={text} />
            {/if}
          {/each} -->
        </Toolbar>


        <View id="view-home" name="main" main tab tabActive url="/" animate={false} />
       <!--  {#if connected} -->
        <View id={idtele} name="telemetry" tab url="/telemetry/" />
        <View id="view-settings" name="settings" tab url="/settings/" />
      <!--   {/if} -->
        <View id="view-service" name="service" tab url="/service/" />
    </Views>
</Page>


<script>
    import {
        Views,
        View,
        Toolbar,
        Page,
        Link,
        useStore
    } from 'framework7-svelte';
import { f7 } from 'framework7-svelte';
    import {t} from '../services/i18n.js';


    let items = [
        {link: '#view-home',      text: 'Cosmoiler',  icon: "icon-rocket"},
        {link: '#view-telemetry', text: 'Телеметрия', icon: "icon-telemetry-outline"},
        {link: '#view-settings',  text: 'Настройки',  icon: "icon-settings"},
        {link: '#view-service',   text: 'Сервис',     icon: "icon-service"},
    ]

    let connected = useStore('connected', (value) => connected = value);

    let idtele = ""
    $: console.log(connected);
    $: if (connected) {
            idtele = 'view-telemetry'
           // f7.views.main.router.navigate('/')
           // if (f7.views.telemetry) f7.views.telemetry.el.remove()
    } else {idtele = ""; }

</script>
