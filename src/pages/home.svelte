<Page
  name="home"
  class={`page`}
  on:pageTabShow={pageTabShow}>

  <!-- Top Navbar -->
  <Navbar sliding={true}>
    <div sliding slot="title" class="navbar-title">
      <span>Cosmoiler</span>
      <span class="navbar-title__ver">v4.0</span>
    </div>
  </Navbar>

  {#if connected}
    <BlockTitle style='background-color: var( --f7-theme-color-bg-color)'>{$t('home.selectmode')}</BlockTitle>
  {:else}
    <BlockTitle style='background-color: var( --f7-theme-color-bg-color)'>{$t('home.noconnect')}</BlockTitle>
  {/if}

{#if !connected}
  <div transition:fade="{{delay: 100, duration: 200}}">
    <List mediaList class={`skeleton-text skeleton-effect-wave`}>
      {#each [1,2] as n}
        <ListItem class={`home-list-item`} >
          <div slot='title' class="home-list-item__title home-list-item__title_up-color">
            <SkeletonBlock tag="div" width="80px" height="20px" borderRadius="8px" />
          </div>
          <div slot="subtitle" class="home-list-item__text home-list-item__text_margin-03rem">
            <SkeletonBlock tag="div" width="195px" height="14px" borderRadius="7px" />
          </div>
          <div slot='text' class="home-list-item__text home-list-item__text_margin-03rem">
            <SkeletonBlock tag="div" width="250px" height="20px" borderRadius="10px" />
          </div>
          <div slot='media'>
            <SkeletonBlock width="36px" height="36px" borderRadius="50%" />
          </div>
          <div slot="after">
            <SkeletonBlock tag="div" width="36px" height="18px" borderRadius="10px" />
          </div>
        </ListItem>
      {/each}
    </List>
  </div>
{:else}
  <div transition:fade="{{delay: 250, duration: 300}}">
    <List mediaList >
        <ModeItem {...items[0]} />
        <ModeItem {...items[1]} />
    </List>
  </div>



<!--   <List mediaList >
       <ListItem on:click={fChecked} class={`list-item`} >
         <div slot='title' class="list-item__title list-item__title_up-color">{$t('home.trip.title').toUpperCase()}</div>
         <div slot="subtitle">
           <div class="list-item__subtitle-text list-item__subtitle-text_color">{$t('home.trip.subtitle')}</div>
           <div >
             {#if gnssPresent}
                <Badge color='blue'>GPS: отлично </Badge>
             {/if}
           </div>
         </div>
         <div slot='text' class="list-item__text list-item__text_margin-03rem">
           <Row noGap>
             <Col>
               <Icon icon="icon-city" size="20px" class={`col-param__logo`}/>
               <span>{$t('home.setting.city', {values: {p: trip.presets[0].trip_m / 1000}})}</span>
             </Col>
             <Col>
               <Icon icon="icon-way" size="20px" class={`col-param__logo`} />
               <span>{$t('home.setting.way', {values: {p: trip.presets[1].trip_m / 1000}})}</span>
             </Col>
             <Col>
               <Icon icon="icon-off-road" size="20px" class={`col-param__logo`} />
               <span>{$t('home.setting.way', {values: {p: trip.presets[2].trip_m / 1000}})}</span>
             </Col>
           </Row>
         </div>
         <div slot="after">
           <Toggle checked={check} name='trip' />
         </div>
         <div slot='media'>
           <Icon icon="icon-route" size={mediaIconSize} />
         </div>
       </ListItem>
      <ListItem on:click={fChecked} class={`list-item`}  >
        <div slot='title' class="list-item__title list-item__title_up-color">{$t('home.time.title').toUpperCase()}</div>
        <div slot="subtitle">
          <span class="list-item__subtitle-text list-item__subtitle-text_color">{$t('home.time.subtitle')}</span>
        </div>

         <div slot='text' class="list-item__text list-item__text_margin-03rem">
           <Row noGap>
             <Col class="col-param">
               <Icon icon="icon-city" size="20px" class="col-param__logo" />
               <span>{time.presets[0].dp_time} {$t('all.seconds')}</span>
             </Col>
             <Col>
               <Icon icon="icon-off-road" size="20px" class="col-param__logo" />
               <span>{time.presets[1].dp_time} {$t('all.seconds')}</span>
             </Col>
           </Row>
         </div>
         <span slot="after"><Toggle checked={fChecked} name='time' /></span>
         <div slot='media'><Icon icon="icon-timer" size={mediaIconSize} /></div>
      </ListItem>
     </List> -->
{/if}

</Page>

<script>
  import {
    f7,
    Page,
    Navbar,
    NavLeft,
    NavTitle,
    NavTitleLarge,
    NavRight,
    Link,
    Toolbar,
    Icon,
    Badge,
    Block,
    BlockTitle,
    List,
    ListItem,
    useStore,
    SkeletonBlock
  } from 'framework7-svelte';

  import {t} from '../services/i18n.js';
  import store from '../js/store';
  import ModeItem from '../components/home-listitem.svelte'
  import { fade } from 'svelte/transition';


  let gnssPresent = useStore('gnssPresent', (value) => gnssPresent = value.gps);
  //let wsStore = useStore('wsStore', (value) => (wsStore = value));
  let connected = useStore('connected', (value) => connected = value);
  let odometer = useStore('odometer', (value) => odometer = value);
  let timer = useStore('timer', (value) => timer = value);
  let mode = useStore('mode', (value) => mode = value);

  let fmodeOdometer
  let fmodeTimer

  function pageTabShow() {
    //console.log('Change Settings = ', store.state.fChngSettings)
    if (store.state.fChngSettings.status) {
      // Если были изменения настроек, то запросить нужный файл
      store.dispatch('requestConfig', store.state.fChngSettings.id);
      store.state.fChngSettings.status = false
      store.state.fChngSettings.id = []
    }
  }

  $: if (connected) {
      console.log('Home -> connected: %s', gnssPresent)
      fmodeOdometer = (mode.m === 1) ? true : false
      fmodeTimer = (mode.m === 2) ? true : false
  }
/*   function onPageInit() {
    console.log('OnPageInit')
    fmodeTrip = (mode.m === 1) ? true : false
    fmodeTime = (mode.m === 2) ? true : false
  } */

/*   let check = false

  function fChecked() {
    check = !check
    console.log(check)
    store.dispatch('requestGNSS')
    //$wsStore = {cmd: "get", param: ["gnss"]}
  } */
/* for style */
 // let mediaIconSize = 36;
/*   $: modeTripToggle = () => {
    return (mode.m === 1) ? true : false
  } */
/*   $: modeTimeToggle = () => {
    return (mode.m === 2) ? true : false
  } */
/*   $: fmodeTrip = (mode.m === 1) ? true : false
  $: fmodeTime = (mode.m === 2) ? true : false */

  $: items = [
    /**
     * ! Одометер
    */
      {
        title: $t("home.trip.title").toUpperCase(),
        subtitle: $t("home.trip.subtitle"),
        titleIcon: "icon-route",
        gpsIcon: "icon-gps",
        gnss: gnssPresent,
        icons: [
          {name: "icon-city", text: $t('home.setting.trip', {values: {p: odometer.presets[0].dst_m / 1000}})},
          {name: "icon-way", text: $t('home.setting.trip', {values: {p: odometer.presets[1].dst_m / 1000}})},
          {name: "icon-off-road", text: $t('home.setting.trip', {values: {p: odometer.presets[2].dst_m / 1000}})},
         /*  {name: "icon-gps", text: ""}, */
        ],
        toggleCheck: fmodeOdometer,
        onSelectModeToggle: (e) => {
          fmodeOdometer = e.detail[0]
          if (fmodeOdometer) {
            fmodeTimer = false
          }

          //store.state.obj = 45
        }
      },
      /**
       * ! Таймер
      */
      {
        title: $t("home.time.title").toUpperCase(),
        subtitle: $t("home.time.subtitle"),
        titleIcon: "icon-timer",
        icons: [
          {name: "icon-city", text: $t('home.setting.time', {values: {p: timer.presets[0].time}})},
         /*  {name: "icon-way", text: $t('home.setting.time', {values: {p: time.presets[1].dp_time}})}, */
          {name: "icon-off-road", text: $t('home.setting.time', {values: {p: timer.presets[1].time}})},
        ],
        toggleCheck: fmodeTimer,
        onSelectModeToggle: (e) => {
          fmodeTimer = e.detail[0]
          if (fmodeTimer) {
            fmodeOdometer = false
          }
        }
      },
    ]

    let tmpMode = {m: undefined, p: undefined};

    $: {
      /**
       * ! Управление переключением режимов
      */
      if (connected) {
        if (!fmodeOdometer && !fmodeTimer) tmpMode.m = 0
        else if (fmodeOdometer) tmpMode.m = 1
        else tmpMode.m = 2
        //console.log('mode = ', tmpMode)
        if (mode.m != tmpMode.m)
          store.dispatch('sendMode', tmpMode)
      }
    }

</script>

<style>

</style>
