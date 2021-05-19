<Page
  name="about"
  class={`page`}
  pageContent={true}>

  <Navbar title="О приложении" backLink="Back" />

  <Block>
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
