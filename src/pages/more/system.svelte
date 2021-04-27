<Page
  name="system"
  class={`page`}
  pageContent={true}
  on:pageAfterOut={pageAfteOut} >

  <Navbar title={$t('home.settings')} backLink="Back" />

  <BlockTitle >
    <span>Прокачка</span>
  </BlockTitle>
  <List >
    <ListItem>
      <ListItemCell class="width-auto flex-shrink-0 list-input__label-text_color">Заполнение системы маслом:</ListItemCell>
      <!-- <ListItemCell class="width-auto flex-shrink-4"><Toggle bind:checked={false}  /></ListItemCell> -->
      <!-- <div slot='title' class="list-input__label-text_color">Прокачка системы</div> -->
<!--       <span slot="after">
        <Toggle bind:checked={system.ap.pwr}  />
      </span> -->
    </ListItem>
  </List>

  <BlockTitle >
    <span>Заводские настройки</span>
  </BlockTitle>
  <Block>
  <Button fill small on:click={clickB}>Сброс</Button>
</Block>

  {#if false}
  <List mediaList class='elevation-0'>
    <ListItem>
      <ListItemCell class="width-auto flex-shrink-0 list-input__label-text_color"><Icon icon="icon-info-circled" style="font-size: 28px; color: orange" /></ListItemCell>
      <ListItemCell class="width-auto flex-shrink-3 list-input__label-text_color"><Button fill small on:click={() => log("Button")}>
        Сброс
      </Button></ListItemCell>
      <!-- <ListItemCell class="width-auto flex-shrink-0 list-input__label-text_color">Заполнение системы маслом:</ListItemCell> -->

<!--       <div slot='title' class="list-input__label-text_color">Внимание! Сброс приведет к установлению заводских настроек</div> -->
<!--       <div slot='text' class="list-input__label-text_color">      <Button fill small onClick={() => log("Button")}>
        Сброс
      </Button></div> -->
      <!-- <img slot="media" src="static/img/icon.png" width="32" /> -->
<!--       <div slot='media'>
        <Icon icon="icon-info-circled" style="font-size: 28px; color: orange" />
      </div> -->

    </ListItem>
  </List>
  <List mediaList class='elevation-0'>
    <ListItem>
      <div slot='media'>
        <Icon icon="icon-info-circled" style="font-size: 28px; color: orange" />
      </div>
      <div slot='after'>
        <Button fill small on:click={clickB}>Сброс</Button>
      </div>
      <!-- <ListItemCell class="width-auto flex-shrink-0 list-input__label-text_color">Заполнение системы маслом:</ListItemCell> -->

<!--       <div slot='title' class="list-input__label-text_color">Внимание! Сброс приведет к установлению заводских настроек</div> -->
<!--       <div slot='text' class="list-input__label-text_color">      <Button fill small onClick={() => log("Button")}>
        Сброс
      </Button></div> -->
      <!-- <img slot="media" src="static/img/icon.png" width="32" /> -->


    </ListItem>
  </List>

  <BlockTitle>Preloader Button</BlockTitle>
  <Block strong><Icon icon="icon-info-circled" style="font-size: 28px; color: orange" />
    <Button fill preloader >Сброс</Button>
  </Block>
{/if}
<!--   <Block strong inset class="display-flex">
    <img src="static/img/icon.png" width="32" />
    <p>dsfsdgsg</p>
  </Block> -->

  {#each rangeValues[0] as rangeValue}
    <Ranges {...rangeValue} />
  {/each}

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
      Icon,
      useStore
    } from 'framework7-svelte';
    import {t} from '../../services/i18n.js';
    import Ranges from '../../components/range-param.svelte'
    import { f7 } from 'framework7-svelte';
    import store from '../../js/store.js';
    import log from '../../js/debug.js';

    let connected = useStore('connected', (value) => connected = value);
    let system = useStore('system', (value) => system = value);

    let tmpSystem = system

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
        //icon2: "icon-dropfill",
        rangeChange: (e)=>{
          tmpSystem.bright = Math.trunc(e * 255 / 100)
          store.dispatch('ctrlBright', tmpSystem.bright)
          //log(tmpPump.dpms)
        },
        toggle: false,
      }],
    ]

/*     function signIn() {
    f7.dialog.alert(`Username: <br>Password: `, () => {
      f7.loginScreen.close();
    });
  } */

    function clickB() {
      log("Button")
      f7.dialog.confirm('Все текущие настройки будут заменены заводскими. Вы уверены?', "Cosmoiler",
        () => {
          f7.preloader.show();
          f7.request.get('192.168.4.1/status')
          .then((res) => {
              f7.preloader.hide()
              log('192.168.4.1/status', res.data)
          })
          .catch((err) => {
            log(err)
          })
        })
    }

    function pageAfteOut() {
      //console.log('pageAfterOut', tmpOdometer);
      store.dispatch('sendSystem', tmpSystem)
    }

</script>
