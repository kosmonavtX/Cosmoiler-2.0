<Page
  name="system"
  class={`page`}
  pageContent={true}
  on:pageBeforeIn={pageBeforeIn}
  on:pageAfterOut={pageAfteOut} >

  <Navbar title={$t('service.system.title')} backLink="Back" />

{#if connected}
  <BlockTitle ><span>{$t('service.system.pumping.title')}</span></BlockTitle>
  <List >
    <ListItem style="background-color: var(--f7-theme-color-bg-tint-color)">
      <ListItemCell class="width-auto flex-shrink-0 list-input__label list-input__label-text_color">{$t('service.system.pumping.text_toggle')}</ListItemCell>
      <ListItemCell class="width-auto flex-shrink-4"><Toggle bind:checked={ctrlpump}  /></ListItemCell>
    </ListItem>
  </List>

<!-- Управление яркостью светодиода -->
  {#each rangeValues[0] as rangeValue}
    <Ranges {...rangeValue} />
  {/each}
{/if}

<!-- Диагностика -->
  <BlockTitle ><span>{$t('service.system.diag.title')}</span></BlockTitle>
  <List accordionList>
    <ListItem accordionItem class={`settings-main__list-item`}>
      <div slot='title' class={`list-input__label list-input__label-text_color`}>
        <span>{$t('service.system.diag.acord.title1')}</span>
      </div>
      <AccordionContent>
        <Block>
          <p><b>1. Частое мигание светодиода. Название точки доступа блока "Cosmoiler_NA" или только цифры</b></p>
          <p>а) выполните пп. 1-5 раздела "Обратная связь";</p>
          <p>б) настройте в смартфоне точку доступа с именем <b>сosmoiler</b> и паролем <b>12345678</b>;</p>
          <p>в) выполните команду id;</p>
          <p>г) если частое миагание светодиода сохраняется, см. "Руководство по эксплуатации", либо свяжитесь с разработчиками.</p>
          <p><b>2. Отсутствует Wi-Fi блока (не является неисправностью, см. "Руководство по эксплуатации").</b></p>
          <p>Выключите и включите зажигание. В течение 60 сек подключитесь к блоку.
            Возможно включение Wi-Fi с помощью кнопки управления без выключения зажигания:
            сделайте 4 коротких нажатия на кнопку.</p>
        </Block>
      </AccordionContent>
    </ListItem>
    <ListItem accordionItem class={`settings-main__list-item`}>
      <div slot='title' class={`list-input__label list-input__label-text_color`}>
        <span>{$t('service.system.diag.acord.title2')}</span>
      </div>
      <AccordionContent>
        <Block>
          <p>1. Установите приложение Mobile Telnet (MT) через Google Play.</p>
          <p>2. В меню MT выберите Telnet Settings и установите следующие значения: Remote Host Name or IP - 192.168.4.1, Telnet Port - 23.</p>
          <p>3. Подключитесь к точке доступа Wi-Fi блока управления.</p>
          <p>4. В меню MT выберите Connect.</p>
          <p>5. Нажмите кнопку 4 раза. Пауза между нажатиями не должна быть более 10 секунд.</p>
          <p>5. Введите пароль 123 и нажмите Send</p>
          <p>6. В MT скопируте текст и отправьте, указав серийный номер Вашего смазчика в теме письма, на e-mail: cosmoiler@gmail.com</p>
        </Block>
      </AccordionContent>
    </ListItem>
  </List>

</Page>

<script>
    import {
      Page,
      Button,
      Block,
      List,
      ListItem,
      ListItemCell,
      Navbar,
      BlockTitle,
      Toggle,
      AccordionContent,
      useStore
    } from 'framework7-svelte';
    import {t} from '../../services/i18n.js';
    import Ranges from '../../components/range-param.svelte'
    import { f7 } from 'framework7-svelte';
    import store from '../../js/store.js';
    import log from '../../js/debug.js';


    let connected = useStore('connected', (value) => connected = value);
    let system = useStore('system', (value) => system = value);
    let mapSettings = useStore('mapSettings', (value) => mapSettings = value);

    let tmpSystem = system
    let ctrlpump = false

    $: rangeValues = [
      [{
        title: "Яркость светодиода",
        value: tmpSystem.bright * 100 / 255,
       // name_value: "%",
        minValue: 1,
        maxValue: 100,
        stepValue: 1,
        scale: false,
        icon: "icon-light",
        icon2: "icon-light-fill",
        rangeChange: (e)=>{
          tmpSystem.bright = Math.trunc(e * 255 / 100)
          store.dispatch('ctrlBright', tmpSystem.bright)
          //log(tmpPump.dpms)
        },
        toggle: false,
      }],
    ]

$:  store.dispatch('ctrlPump', [ctrlpump, 0, {dpms: 1000, dpdp: 100}])
/*     function signIn() {
    f7.dialog.alert(`Username: <br>Password: `, () => {
      f7.loginScreen.close();
    });
  } */
    function pageBeforeIn() {
    //log('pageBeforeIn', pump)
      /* включить режим настройки вязкости */
      store.dispatch('modeWork', store.state.OILER_SETTINGS)
    }

    function pageAfteOut() {
      //console.log('pageAfterOut', tmpOdometer);
      mapSettings.set("bright", tmpSystem.bright)
      /* включить автоматический режим работы смазчика */
      store.dispatch('modeWork', store.state.OILER_AUTO)
      store.dispatch('sendSystem', tmpSystem)
    }

</script>
