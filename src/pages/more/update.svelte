<Page
  name="system"
  class={`page`}
  pageContent={true}>

  <Navbar title={$t('home.settings')} backLink="Back" />

  <Block strong>
    <p>1. Обновление ПО</p>
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

</script>
