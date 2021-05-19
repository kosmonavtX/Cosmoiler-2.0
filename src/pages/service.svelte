<Page
  name="service"
  class={`page`}
  pageContent={true}>

  <Navbar title={$t('service.title')} />

  <BlockTitle class={`block-title-noconnection__text`} >{$t('home.noconnect')}</BlockTitle>

  <List mediaList inset class='elevation-3' style="border-radius: 6px;">
    <ListItem class={`settings-main__list-item`}
      after={store.state.versw}

    >
      <div slot='title' class="home-list-item__title home-list-item__title_up-color">
        COSMOILER
      </div>
      <div slot="subtitle">
        <div class="home-list-item__subtitle-text home-list-item__subtitle-text_color">FW: {ver.fw}   HW: {ver.hw}</div>
      </div>
      <div slot='text' class="home-list-item__text">S/N: {system.pn}</div>
      <img slot="media" src="static/img/icon.png" width="64" />
    </ListItem>
  </List>

  <List>
    {#each items as {link, title, view}}
      {#if view}
      <ListItem link={link} title={title} class={`settings-main__list-item`}>
      </ListItem>
      {/if}
    {/each}
  </List>

</Page>

<script>
  import {
    Page,
    List,
    ListItem,
    Navbar,
    Block,
    BlockTitle,
    SkeletonBlock,
    useStore
  } from 'framework7-svelte';
  import {t} from '../services/i18n.js';
  import store from '../js/store';

  let connected = useStore('connected', (value) => connected = value);
  $: system = useStore('system', (value) => system = value);
  $: ver = useStore('ver', (value) => ver = value);


  $: items = [
    {link: '/service/wifi/', title: $t('service.wifi.title'), view: connected},
    {link: '/service/system/', title: $t('service.system.title'), view: true},
    {link: '/service/update/', title: $t('service.update.title'), view: connected},
    {link: '/service/about/', title: $t('service.about.title'), view: true},
  ]

</script>
