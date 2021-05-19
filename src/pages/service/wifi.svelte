<Page
  name="wifi"
  class={`page`}
  pageContent={true}
  on:pageAfterOut={pageAfteOut}>

  <Navbar title={$t('service.wifi.title')} backLink="Back" />

<!--   <Block strong>
    <p>1. Название точки доступа блока</p>
    <p>2. Точка доступа для обновления</p>
    <p>3. Переключатель "WiFi всегда включен" ( system.json: ap:  pwr: true )</p>
  </Block> -->

  <BlockTitle><span>{$t('service.wifi.ap.title')}</span></BlockTitle>
  <List >
    <ListInput
      type="text"
      placeholder="Введите имя"
      bind:value={system.ap.ssid}
      clearButton
    >
      <div slot='label' class="list-input__label list-input__label-text_color">SSID</div>
    </ListInput>
    <ListInput
      type="password"
      placeholder="Введите пароль"
      bind:value={system.ap.psw}
      clearButton
    >
      <div slot='label' class="list-input__label list-input__label-text_color">Пароль</div>
    </ListInput>
    <ListItem>
      <div slot='title' class="list-input__label list-input__label-text_color">WiFi всегда включен:</div>
      <span slot="after">
        <Toggle bind:checked={system.ap.pwr}  />
      </span>
    </ListItem>
  </List>

  <BlockTitle><span>{$t('service.wifi.sta.title')}</span></BlockTitle>
  <List>
    <ListInput
      type="text"
      placeholder="Введите имя"
      bind:value={system.sta.ssid}
    >
      <div slot='label' class="list-input__label list-input__label-text_color">SSID</div>
    </ListInput>
    <ListInput
      type="password"
      placeholder="Введите пароль"
      bind:value={system.sta.psw}>
      <div slot='label' class="list-input__label list-input__label-text_color">Пароль</div>
    </ListInput>
<!--     <ListInput
      type="file"
      placeholder="Введите пароль"
      bind:value={system.sta.psw}>
      <div slot='label' class="list-input__label list-input__label-text_color">Пароль</div>
    </ListInput> -->
  </List>

<!--   <List> -->
<!--     <ListInput
      label="E-mail"
      type="email"
      placeholder="E-mail"
    ></ListInput>

    <ListInput
      label="URL"
      type="url"
      placeholder="URL"
    ></ListInput> -->


<!--     <ListInput
      label="Gender"
      type="select"
      >
      <option>Male</option>
      <option>Female</option>
    </ListInput>


    <ListInput
      label="Range"
      input={false}
    >
      <span slot="input">
        <Range value={50} min={0} max={100} step={1} />
      </span>
    </ListInput>

    <ListInput
      type="textarea"
      label="Textarea"
      placeholder="Bio"
    ></ListInput>
    <ListInput
      type="textarea"
      label="Resizable"
      placeholder="Bio"
      resizable
    ></ListInput>
  </List> -->

</Page>

<script>
    import {
      Page,
      List,
      ListItem,
      ListInput,
      Navbar,
      Block,
      BlockTitle,
      Range,
      Toggle,
      useStore
    } from 'framework7-svelte';
    import {t} from '../../services/i18n.js';
    import store from '../../js/store.js';
    import log from '../../js/debug.js'

    let connected = useStore('connected', (value) => connected = value);
    let system = useStore('system', (value) => system = value);
    let mapSettings = useStore('mapSettings', (value) => mapSettings = value);

/*     let items = [
      {link: '/wifi/', title: $t('more.wifi.title')},
      {link: '/system/', title: $t('more.system.title')},
      {link: '/update/', title: $t('more.update.title')},
      {link: '/about/', title: $t('more.about.title')},
    ] */

    function pageAfteOut() {
      mapSettings.set("ap", system.ap)
      mapSettings.set("sta", system.sta)
      log(mapSettings)
      store.dispatch('sendSystem', system)
    }
  </script>
