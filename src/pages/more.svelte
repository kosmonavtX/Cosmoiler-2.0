<Page
  name="settings"
  class={`page`}
  pageContent={true}>

  <Navbar title={$t('home.settings')} />

 <!--  <BlockTitle>About My App</BlockTitle> -->

  <List mediaList inset>
    <ListItem
      after="2.0"

    >
    <div slot='title' class="home-list-item__title home-list-item__title_up-color">
      COSMOILER
    </div>
    <div slot="subtitle">
      <div class="home-list-item__subtitle-text home-list-item__subtitle-text_color">FW: {ver.fw}, HW: {ver.hw}</div>
    </div>
    <div slot='text' class="home-list-item__text">S/N: {system.pn}</div>
      <img slot="media" src="https://cdn.framework7.io/placeholder/people-160x160-1.jpg" width="64" />
    </ListItem>
  </List>

  <List>
    {#each items as {link, title}}
      <ListItem link={link} title={title} class={`settings-main__list-item`}>
      </ListItem>
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
    useStore
  } from 'framework7-svelte';
  import {t} from '../services/i18n.js';

  let connected = useStore('connected', (value) => connected = value);
  let system = useStore('system', (value) => system = value);
  let ver = useStore('ver', (value) => ver = value);


  let items = [
    {link: '/wifi/', title: $t('more.wifi.title')},
    {link: '/system/', title: $t('more.system.title')},
    {link: '/update/', title: $t('more.update.title')},
    {link: '/about/', title: $t('more.about.title')},
  ]

</script>
