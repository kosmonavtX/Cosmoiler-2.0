<Page
  name="about"
  class={`page`}
  pageContent={true}>

  <Navbar title={$t('О приложении')} backLink="Back" />

  <Block strong class={`settings-main__list-item`}>
    <Block>
      <p align="center"><b>Приложение-клиент для задания параметров работы автоматического смазчика цепи "Cosmoiler".</b></p>
    </Block>

    <Block>
      <p>Для работы приложения-клиента и блока управления смазчика доступ в Интернет не требуется (кроме действий при обновлении прошивки блока управления).</p>
    </Block>

    <Block>
      <p>Более подробная информация доступна по адресу: <Link href="https://vk.com/cosmoiler" external>Cosmoiler</Link></p>
    </Block>
  </Block>

<!--   <Block >
    <Row tag="p">
      <Col tag="span">
        <Button outline back>Назад</Button>
      </Col>
      <Col tag="span">
        <Button fill on:click={Save}>Сохранить</Button>
      </Col>
    </Row>
  </Block> -->

</Page>

<script>
    import {
      Page,
      Link,
      Navbar,
      Block,
      Button,
      Row, Col
    } from 'framework7-svelte';
    import {t} from '../../services/i18n.js';

    function Save() {

    }
</script>
