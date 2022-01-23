<Page
  name="update"
  class={`page`}
  pageContent={true}>

  <Navbar title={$t('service.update.title')} backLink="Back" />
  {#if !f_connected}
    <BlockTitle class={`block-title-noconnection__text`} >{$t('home.noconnect')}</BlockTitle>
  {/if}
  <BlockTitle ><span>{$t('service.update.fw.title1')}</span></BlockTitle>
  <Block strong style="background-color: var(--f7-theme-color-bg-tint-color)">
      <Col>
        <Button outline lager on:click = {downloadFW}>Скачать файлы</Button>
      </Col>
  </Block>
  <BlockTitle ><span>{$t('service.update.fw.title2')}</span></BlockTitle>
  <Block strong style="background-color: var(--f7-theme-color-bg-tint-color)">
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
        <Button disabled={!files | !f_connected} fill on:click={update} class={`margin-top__20px`}>Обновить</Button>
      </Col>
  </Block>

  <BlockTitle ><span>{$t('service.update.cnfg.title')}</span></BlockTitle>
  <Block strong style="background-color: var(--f7-theme-color-bg-tint-color)">
    <Button disabled={!f_connected} fill small on:click={clickReset}>{$t('service.update.cnfg.button.title')}</Button>
  </Block>

</Page>

<script>
    import {
      Page,
      Navbar,
      Block,
      BlockTitle,
      Button,
      Col,
      useStore
    } from 'framework7-svelte';
    import {t} from '../../services/i18n.js';
    import { f7 } from 'framework7-svelte';
    import log from '../../js/debug.js';

    let connected = useStore('connected', (value) => connected = value);
    let ver = useStore('ver', (value) => ver = value);
    //let system = useStore('system', (value) => system = value);

    let files;
    let browseInput;
    let nameFile;

   // $: if (!connected) document.location.reload()
    $:  f_connected = connected

    $: if (files) {
        nameFile = files[0].name
    } else nameFile = "Выберите файл..."

    let statusFW = 0
    let statusFS = 0

    function downloadFW() {
      let fEndDownloadFW = false
      let fTestConnection = false
      f7.request({
        url: 'http://cosmoiler.ru/services/',
        method: 'GET',
        async: true,
        cache: false,
        success: (resp, status) => {
          fTestConnection = true
        },
        error: () => {
          f7.dialog.alert("Нет связи с сервером обновлений. Включите интернет и попробуйте снова.", "Cosmoiler")
          fTestConnection = false
        },
        complete: () => {
          if (fTestConnection) {
              f7.request({
                  url: 'http://cosmoiler.ru/services/download',
                  method: 'GET',
                  data: {sn: ver.sn, verfw: ver.fw},
                  async: true,
                  cache: false,
                  xhrFields: {responseType: "blob"},
                  success: function(response, status, xhr) {
                    log("Succes request FW")
                    var url = window.URL || window.webkitURL;
                    const link = document.createElement('a');
                    var blob = new Blob([response])
                    link.href = url.createObjectURL(blob);
                    const fileName = xhr.getResponseHeader('Filename')
                    const downloadFileName = decodeURIComponent(escape(fileName))
                    log(downloadFileName)
                    link.setAttribute('download', downloadFileName);
                    link.click();
                    statusFW = status
                  },
                  error: function(xhr, status) {
                    log("Error connection", status)
                    statusFW = status
                  },
                  complete: function() {
                    fEndDownloadFW = true;
                    log("Complete request FW")
                    f7.request({
                        url: 'http://cosmoiler.ru/services/download',
                        method: 'GET',
                        data: {sn: ver.sn, verfs: ver.fw.slice(-2)},
                        async: true,
                        cache: false,
                        xhrFields: {responseType: "blob"},
                        success: function(response, status, xhr) {
                          log("Succes request FS")
                          var url = window.URL || window.webkitURL;
                          const link = document.createElement('a');
                          var blob = new Blob([response])
                          link.href = url.createObjectURL(blob);
                          const fileName = xhr.getResponseHeader('Filename')
                          const downloadFileName = decodeURIComponent(escape(fileName))
                          log(downloadFileName)
                          link.setAttribute('download', downloadFileName);
                          link.click();
                          statusFS = status
                        },
                        error: function(xhr, status) {
                          statusFS = status
                          log(status)
                        },
                        complete: function() {
                          fEndDownloadFW = true;
                          log("Complete request FS: ", statusFS)
/*                           if ((statusFW == 0) || (statusFS == 0))
                            f7.dialog.alert("Нет связи с сервером обновлений. Включите интернет и попробуйте снова.", "Cosmoiler")
                          else */
                            if ((statusFW != 200) && (statusFS != 200))
                              f7.dialog.alert("Текущая версия последняя", "Cosmoiler")
                        }
                      })
                  }
              })
          }
        }
      })
    }

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
          log(response)
          f7.dialog.close()
          f7.dialog.alert($t('service.update.fw.success'), "Cosmoiler")
        },
        error: function(xhr, status) {
          log(status)
          f7.dialog.close()
          f7.dialog.alert($t('service.update.fw.error'), "Cosmoiler")
        }
      })
    }

    function clickReset() {
      //logger("Button")
      f7.dialog.confirm($t('service.update.cnfg.confirm.text'), "Cosmoiler",
        () => {
          //store.dispatch('cmdReset')
          f7.preloader.show();
          f7.request.get('http://192.168.4.1/clear')//http://192.168.4.1/clear
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

</script>
