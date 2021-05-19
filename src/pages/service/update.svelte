<Page
  name="update"
  class={`page`}
  pageContent={true}>

  <Navbar title={$t('service.update.title')} backLink="Back" />

  <BlockTitle ><span>{$t('service.update.fw.title')}</span></BlockTitle>
  <Block strong style="background-color: var(--f7-theme-color-bg-tint-color)">
<!--     <Row> -->
      <!-- <Col><input accept='.bin' type='file' bind:files/></Col> -->
      <Col>
        <input
          type='file'
          bind:files
          bind:this={browseInput}
          class={`hidden`}
          />
        <Button outline lager on:click={selectFile}>{nameFile}</Button>
      </Col>
      <Col>
        <Button disabled={!files} fill small on:click={update} class={`margin-top__10px`}>Обновить</Button>
<!--         {#if files}
        <Button disabled={files} fill small on:click={update} class={`margin-top__10px`}>Обновить</Button>
        {/if} -->
      </Col>

<!--
    </Row> -->
  </Block>

  <BlockTitle ><span>{$t('service.update.cnfg.title')}</span></BlockTitle>
  <Block strong style="background-color: var(--f7-theme-color-bg-tint-color)">
    <Button fill small on:click={clickB}>{$t('service.update.cnfg.button.title')}</Button>
  </Block>

</Page>

<script>
    import {
      Page,
      Navbar,
      Block,
      BlockTitle,
      Button,
      Col
    } from 'framework7-svelte';
    import {t} from '../../services/i18n.js';
    import { f7 } from 'framework7-svelte';
    import log from '../../js/debug.js';

/*     let connected = useStore('connected', (value) => connected = value);
    let system = useStore('system', (value) => system = value); */

    let files;
    let browseInput;
    let nameFile;

    $: if (files) {
        console.log(files)
        nameFile = files[0].name
    } else nameFile = "Выберите файл..."

    function update() {
      f7.dialog.progress();
      var formData = new FormData();
      formData.append('fw', files[0]);
/*       f7.request.post('http://192.168.4.1/update', { data: formData, async: false, cache: false,
        contentType: false, enctype: 'multipart/form-data', processData: false,
        headers:{'Access-Control-Allow-Origin': '*'}},
        function (data) {
          f7.dialog.close();
        }); */

      f7.request({
        url: 'http://192.168.4.1/update',
        method: 'POST',
        contentType: 'multipart/form-data',
        data: formData,
        async: true,
        cache: false,
        //processData: false,
        success: function(response) {
          f7.dialog.close();
          f7.dialog.alert('Обновлено успешно. Перезагрузите устройство.', "Cosmoiler")
        },
        error: function(xhr, status) {
          log(status)
          f7.dialog.close();
          f7.dialog.alert('Ошибка обновления. Повторите  попытку.', "Cosmoiler")
        }
      })
    }

    function clickB() {
      //logger("Button")
      f7.dialog.confirm($t('service.update.cnfg.confirm.text'), "Cosmoiler",
        () => {
          //store.dispatch('cmdReset')
          f7.preloader.show();
          f7.request.get('http://192.168.4.1/clear')
          .then((res) => {
              f7.preloader.hide()
              log('192.168.4.1/status', res.data)
          })
          .catch((err) => {
            log(err)
          })
        })
    }

    function selectFile() {
      browseInput.click()
    }
/*     var f=document.getElementById('input').files[0];   /// form input type="file"
    var id=document.getElementById('id').value;        /// form input type="number"
    var FData = new FormData();
    FData.append('files',f);    /// for file object (on server in $_FILES['files'])
    FData.append('id',id);      /// for other data (on server in $_POST['id'])
    app.request.post('php/photo_load.php', FData, function (data) {
      console.log(data);
    });
 */
</script>
