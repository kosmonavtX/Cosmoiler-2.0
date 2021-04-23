<Page
  name="wifi"
  class={`page`}
  pageContent={true}>

  <Navbar title={$t('home.settings')} backLink="Back" />

  <Block strong>
    <p>1. Название точки доступа блока</p>
    <p>2. Точка доступа для обновления</p>
  </Block>

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
    import {t} from '../../services/i18n.js';

    let connected = useStore('connected', (value) => connected = value);
    let system = useStore('system', (value) => system = value);

    let items = [
      {link: '/wifi/', title: $t('more.wifi.title')},
      {link: '/system/', title: $t('more.system.title')},
      {link: '/update/', title: $t('more.update.title')},
      {link: '/about/', title: $t('more.about.title')},
    ]

  </script>
