<Page
  name="timepresets"
  class={`page`}
  on:pageTabHide={() => {}}
  on:pageAfterOut={pageAfteOut}
  on:pageBeforeIn={() => {
    log('pageBeforeIn', timer)
  }}
  >
  <Navbar title={$t('settings.presets.title')} backLink="Back" />

  <Toolbar top tabbar >
    <Link tabLink="#tab-city-time" tabLinkActive>{$t('settings.presets.city')}</Link>
    <Link tabLink="#tab-rain">{$t('settings.presets.user')}</Link>
  </Toolbar>
  <Tabs >

<!-- ГОРОД -->
    <Tab id="tab-city-time" tabActive>
      {#each rangeValues[0] as rangeValue}
        <Ranges {...rangeValue} />
      {/each}
    </Tab>

<!-- ДОЖДЬ ПЕСОК -->
    <Tab id="tab-rain">
      {#each rangeValues[1] as rangeValue}
        <Ranges {...rangeValue}/>
      {/each}
    </Tab>
  </Tabs>
</Page>
<script>
  import {
    Page,
    Navbar,
    Toolbar,
    Link,
    Tabs,
    Tab,
    useStore
  } from 'framework7-svelte';
  import {t} from '../../services/i18n.js';
  import Ranges from '../../components/range-param.svelte'
  import store from '../../js/store.js';
  import {log} from '../../js/debug.js'

  let connected = useStore('connected', (value) => connected = value);
  let timer = useStore('timer', (value) => timer = value);
  let mapSettings = useStore('mapSettings', (value) => mapSettings = value);

  let tmpTimer = timer;

  function pageAfteOut() {
    log('pageAfterOut', tmpTimer);
    store.dispatch('sendTime', tmpTimer)
  }

  $: if (!connected) document.location.reload()

  $: rangeValues = [
    [{
      title: "Таймер",
      value: tmpTimer.presets[0].time,
      name_value: "сек",
      minValue: 10,
      maxValue: 600,
      stepValue: 10,
      scaleStep: 3,
      sacaleSubSteps: 2,
      icon: "icon-clock",
      frmtScaleLabel: outScaleLabel,
      rangeChange: (e)=>{
        tmpTimer.presets[0].time = e
        let arr = mapSettings.get('presets')
        mapSettings.set("presets", [tmpTimer.presets[0], (arr)?arr[1]:null]);
      log(mapSettings)
      }
    },
    {
      title: "Количество",
      value: tmpTimer.presets[0].num,
      minValue: 0,
      maxValue: 10,
      stepValue: 1,
      scaleStep: 5,
      scaleSubSteps: 2,
      icon: "icon-drop",
      rangeChange: (e)=>{
        tmpTimer.presets[0].num = e
        let arr = mapSettings.get('presets')
        mapSettings.set("presets", [tmpTimer.presets[0], (arr)?arr[1]:null]);
      log(mapSettings)
      }
    }],
    [{
      title: "Таймер",
      value: tmpTimer.presets[1].time,
      name_value: "сек",
      minValue: 10,
      maxValue: 600,
      stepValue: 10,
      scaleStep: 3,
      sacaleSubSteps: 2,
      icon: "icon-clock",
      frmtScaleLabel: outScaleLabel,
      rangeChange: (e)=>{
        tmpTimer.presets[1].time = e
        let arr = mapSettings.get('presets')
        mapSettings.set("presets", [(arr)?arr[0]:null, tmpTimer.presets[1]]);
      log(mapSettings)
      }
    },
    {
      title: "Количество",
      value: tmpTimer.presets[1].num,
      minValue: 0,
      maxValue: 10,
      stepValue: 1,
      scaleStep: 5,
      scaleSubSteps: 2,
      icon: "icon-drop",
      rangeChange: (e)=>{
        tmpTimer.presets[1].num = e
        let arr = mapSettings.get('presets')
        mapSettings.set("presets", [(arr)?arr[0]:null, tmpTimer.presets[1]]);
      log(mapSettings)
      }
    },
    {
      title: "Количество циклов",
      value: tmpTimer.presets[1].cycles,
      minValue: 0,
      maxValue: 10,
      stepValue: 1,
      scaleStep: 5,
      scaleSubSteps: 2,
      icon: "icon-repeat",
      rangeChange: (e)=>{
        tmpTimer.presets[1].cycles = e
        let arr = mapSettings.get('presets')
        mapSettings.set("presets", [(arr)?arr[0]:null, tmpTimer.presets[1]]);
      log(mapSettings)
      }
    }]
  ]


/*   $: {
    time.presets = presets;
    console.log('presets: ', time)
  } */

/*   let onTimerChange = [
    value => {
      console.log(value);
      presets[0].dp_time = value
    },
    value => {
      console.log(value);
      presets[1].dp_time = value
    }];

  let onDropsChange = [
    value => {
      console.log(value);
      presets[0].dp_num = value
    },
    value => {
      console.log(value);
      presets[1].dp_num = value
    }]; */
/*     function changeTimer(e) {
      presets[0].dp_time = e
      console.log(e)
    } */

  function outScaleLabel(e) {
    return Math.round(e/10) * 10
  }
</script>
