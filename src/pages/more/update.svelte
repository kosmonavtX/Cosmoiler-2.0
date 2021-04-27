<Page
  name="system"
  class={`page`}
  pageContent={true}>

  <Navbar title={$t('home.settings')} backLink="Back" />

  <Block strong>
    <p>1. Обновление ПО</p>
    <input type='file' bind:value={ff} />
    <Button on:click={update}>Обновить ПО</Button>
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
      Button,
      useStore
    } from 'framework7-svelte';
    import {t} from '../../services/i18n.js';
    import { f7 } from 'framework7-svelte';

    let connected = useStore('connected', (value) => connected = value);
    let system = useStore('system', (value) => system = value);

    let ff

    function update() {
      f7.dialog.progress();
      var formData = new FormData();
      formData.append('ppic', ff);
      console.log(formData)
      f7.request.post('192.168.4.1/update', { data: formData, async: false, cache: false,
        contentType: false, enctype: 'multipart/form-data', enctype: 'multipart/form-data', processData: false},
        function (data) {
          f7.dialog.close();
        });
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
