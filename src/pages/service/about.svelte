<Page
  name="about"
  class={`page`}
  pageContent={true}>

  <Navbar title="О приложении" backLink="Back" />

  <Block>
    <p><b>Приложение-клиент для задания параметров автоматического смазчика цепи "Cosmoiler".</b></p>
  </Block>

  <Block>
    <p>Для работы приложения и смазчика выход в интернет не требуется (кроме действий при обновлении прошивки блока управления).</p>
  </Block>

  <Block>
    <p>Более подробная информация доступна по адресу: <Link href="https://vk.com/cosmoiler" external>Cosmoiler</Link></p>
  </Block>

</Page>

<script>
    import {
      Page,
      Link,
      Navbar,
      Block
    } from 'framework7-svelte';
    import {t} from '../../services/i18n.js';

</script>
