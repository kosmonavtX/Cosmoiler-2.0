<Page
  name="фищге"
  class={`page`}
  pageContent={true}>

  <Navbar title={$t('home.settings')} backLink="Back" />

  <Block strong>
    <p>Приложение-клиент для задания параметров автоматического смазчика цепи.</p>
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
