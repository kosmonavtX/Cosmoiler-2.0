<Page
  name="system"
  class={`page`}
  pageContent={true}>

  <Navbar title={$t('home.settings')} backLink="Back" />

  <BlockTitle >
    <span>Прокачка</span>
  </BlockTitle>
  <List >
    <ListItem>
      <ListItemCell class="width-auto flex-shrink-0 list-input__label-text_color">Заполнение системы маслом:</ListItemCell>
      <ListItemCell class="width-auto flex-shrink-4"><Toggle bind:checked={system.ap.pwr}  /></ListItemCell>
      <!-- <div slot='title' class="list-input__label-text_color">Прокачка системы</div> -->
<!--       <span slot="after">
        <Toggle bind:checked={system.ap.pwr}  />
      </span> -->
    </ListItem>
  </List>

  <BlockTitle >
    <span>Заводские настройки</span>
  </BlockTitle>

  <List mediaList class='elevation-0'>
    <ListItem>
      <ListItemCell class="width-auto flex-shrink-0 list-input__label-text_color"><Icon icon="icon-info-circled" style="font-size: 28px; color: orange" /></ListItemCell>
      <ListItemCell class="width-auto flex-shrink-3 list-input__label-text_color"><Button fill small onClick={() => log("Button")}>
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
        <Button fill small click={clickB}>Сброс</Button>
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
      List,
      ListItem,
      ListItemCell,
      Navbar,
      Block,
      BlockTitle,
      Toggle,
      Icon,
      useStore
    } from 'framework7-svelte';
    import {t} from '../../services/i18n.js';
    import Ranges from '../../components/range-param.svelte'
    import log from '../../js/debug.js';

    let connected = useStore('connected', (value) => connected = value);
    let system = useStore('system', (value) => system = value);

    $: rangeValues = [
      [{
        title: "Яркость светодиода",
        value: 50,
       // name_value: "%",
        minValue: 1,
        maxValue: 100,
        stepValue: 10,
        scale: false,
        icon: "icon-light",
        icon2: "icon-dropfill",
        rangeChange: (e)=>{
          system.bright = e
          //log(tmpPump.dpms)
        },
        toggle: false,
      }],
    ]

    function signIn() {
    f7.dialog.alert(`Username: <br>Password: `, () => {
      f7.loginScreen.close();
    });
  }

  function clickB() {
    log("Button")
    f7.dialog.confirm('Are you sure that your name is ', () => { f7.dialog.alert('Ok, your name is ');})
  }

</script>
