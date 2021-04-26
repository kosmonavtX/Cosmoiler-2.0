<Page
  name="settings"
  class={`page`}
  pageContent={true}
  on:pageTabShow={() => {console.log('Page Settings Show')}}
>
  <Navbar title={$t('home.settings')} />

  <!-- <Block strong style='background-color: var( --f7-theme-color-bg-color)'>{$t('home.selectmode')}</Block> -->


  <Toolbar top tabbar >
    <Link tabLink="#tab-trip" tabLinkActive>Одометр</Link>
    <Link tabLink="#tab-time">Таймер</Link>
    <Link tabLink="#tab-manual">Вручную</Link>
   <!--  <Link tabLink="#tab-4">Насос</Link> -->
<!--     <Link tabLink="#tab-4">Прокачка</Link> -->
  </Toolbar>

  <Tabs >
    <Tab id="tab-trip" tabActive on:tabShow={()=>{log('Tab Trip Show')}}>
      <List>
        {#each items_odo.slice(0,2) as {link, title, icon, size}}
          <ListItem link={link} title={title} class={`settings-main__list-item`}>
          <div slot='media'>
            <Icon icon={icon} style="font-size: {size}px" />
          </div>
          </ListItem>
        {/each}
        <ListItem title={items_odo[2].title} link={items_odo[2].link} class={`settings-main__list-item`}>
          <div slot='media'>
            <Icon icon={items_odo[2].icon} style="font-size: {items_odo[2].size}px" />
          </div>
          <div slot='after'>
            <span>{gnss}</span>
          </div>
        </ListItem>
      </List>
<!--       <BlockTitle>Brightness</BlockTitle>
      <List simpleList>
        <ListItem>
          <ListItemCell class="width-auto flex-shrink-0">
            <Icon ios="f7:sun_min" aurora="f7:sun_min" md="material:brightness_low" />
          </ListItemCell>
          <ListItemCell class="flex-shrink-3">
            <Range min={0} max={100} step={1} value={50} label={true} color="orange" />
          </ListItemCell>
          <ListItemCell class="width-auto flex-shrink-0">
            <Icon ios="f7:sun_max_fill" aurora="f7:sun_max_fill" md="material:brightness_high" />
          </ListItemCell>
        </ListItem>
      </List>

      <List simpleList>
        <ListItem>
          <ListItemRow >
            <Icon ios="f7:sun_min" aurora="f7:sun_min" md="material:brightness_low" />
          </ListItemRow>
          <ListItemRow >
            <Range min={0} max={100} step={1} value={50} label={true} color="orange" />
          </ListItemRow>
          <ListItemRow >
            <Icon ios="f7:sun_max_fill" aurora="f7:sun_max_fill" md="material:brightness_high" />
          </ListItemRow>
        </ListItem>
      </List> -->
<!--       <List>
        <ListItem divider title="Расстояние"></ListItem>
        <ListItem>
          <div slot="title">
            <Range
            min={0}
            max={100}
            label={true}
            step={5}
            value={25}
            scale={true}
            scaleSteps={5}
            scaleSubSteps={4} />
          </div>
        </ListItem>
        <ListItem divider title="Капли"></ListItem>
        <ListItem title="Item 3" after="шт" />
      </List> -->
<!--       <BlockTitle medium>Трасса</BlockTitle>
      <Block><p></p></Block> -->
    </Tab>
    <Tab id="tab-time">
      <List>
        {#each items_timer as {link, title, icon, size}}
          <ListItem link={link} title={title} class={`settings-main__list-item`}>
          <div slot='media'>
            <Icon icon={icon} style="font-size: {size}px" />
          </div>
          </ListItem>
        {/each}
      </List>
    </Tab>
    <Tab id="tab-manual">
      <List>
        {#each items_manual as {link, title, icon, size}}
          <ListItem link={link} title={title} class={`settings-main__list-item`}>
          <div slot='media'>
            <Icon icon={icon} style="font-size: {size}px" />
          </div>
          </ListItem>
        {/each}
      </List>
    </Tab>
<!--     <Tab id="tab-4" class="page-content">
      <Block>
        <p>Здесь будут настройки для насоса</p>
      </Block>
    </Tab> -->
  </Tabs>
</Page>

<script>
  import {
    Page,
    Navbar,
    List,
    ListItem,
    Toolbar,
    Link,
    Tabs,
    Tab,
    Icon,
    useStore
  } from 'framework7-svelte';
  import {t} from '../services/i18n.js';
  //import {manual} from '../store/store.js'
  import Ranges from '../components/range-param.svelte'
  import { onMount } from 'svelte';
  import store from '../js/store.js';
  import log from '../js/debug.js'
//import { f7router } from 'framework7-svelte/cjs/shared/f7';

//export let f7router;

  let connected = useStore('connected', (value) => connected = value);
  let odometer = useStore('odometer', (value) => odometer = value);
  let gnssPresent = useStore('gnssPresent', (value) => gnssPresent = value);


  let items_odo = [
    {link: '/settings/odometer/presets/', title: $t('settings.presets.title'), icon: 'icon-preset', size: 24},
    {link: '/settings/pump/', title: 'Насос', icon: 'icon-pump', size: 28},
    {link: '/settings/odometer/sensor/', title: 'Датчик', icon: 'icon-sensor', size: 28},
  ]

  let items_timer = [
    {link: '/settings/timer/presets/', title: $t('settings.presets.title'), icon: 'icon-preset', size: 24},
    {link: '/settings/pump/', title: 'Насос', icon: 'icon-pump', size: 28},
  ]

  let items_manual = [
    {link: '/settings/manual/', title: $t('settings.presets.title'), icon: 'icon-preset', size: 24},
  ]

/*   function tabShowManual(){
    console.log(trip)
  } */
/*   $: {
    console.log('pump dpms =', manual.pump.dpms);
    console.log('pump dpdp =', manual.pump.dpdp);
    console.log('pump dpms_rel =', dpms_rel);
  } */
  //$: if (!connected) document.location.reload()

  $: gnss = (odometer.sensor.gnss && gnssPresent.gps) ? "GPS" : $t("settings.sensor.impulse")
/*   onMount(() => {
    console.log(f7route)
  }) */
/*   $: console.log(trip)
  $: console.log(gnss) */

  $: if (connected) {
    //console.log(f7.views.main.router.navigate({path: '/'}))
    //console.log(f7.views.main)
    //f7router.navigate({path: '/'})
   // f7.views.main.router.refreshPage()
    //console.log()
    //window.location.reload()
  }

//   let dpms_rel = manual.pump.dpms * 100 / manual.pump.dpdp;

//   $: rangeValuesManual = [
//     {
//         title: "Объем масла",
//         value: manual.pump.dpms * 100 / manual.pump.dpdp,
//         name_value: "%",
//         minValue: 1, // 0.1
//         maxValue: 100,// 1.1
//         stepValue: 5, // 0.05
//        // sacaleSubSteps: 1,
//         scale: false,
//        // frmtScaleLabel: outScaleLabel,
// /*         scaleStep: ,
//         sacaleSubSteps: 2, */
//         icon: "icon-drop",
//         icon2: "icon-dropfill",
//         rangeChange: (e)=>{dpms_rel = e}
//     },
//     {
//         title: "Таймер",
//         value: (manual.pump.dpdp/1000).toFixed(1), //Math.round(/10) * 10,
//         name_value: "сек",
//         minValue: 0.500,
//         maxValue: 2.000,
//         stepValue: 0.100,
//         scale: true,
// /*          scaleStep: 5,
//         sacaleSubSteps: 2, */
//         icon: "icon-clock",
//  /*        icon2: "icon-drop", */
//         rangeChange: (e)=>{
//           manual.pump.dpdp = (e * 1000).toFixed(0);
//         }
//     }
//   ]

/*   $: manual.pump.dpms = manual.pump.dpdp * (dpms_rel / 100); */

/*   function outScaleLabel(e) {
    console.log(e)
    return Math.round(e*10)/10
  } */
  </script>
