<Page
  name="trippresets"
  class={`page`}
  on:pageTabHide={() => {}}
  on:pageBeforeIn={() => {
    log('pageBeforeIn', odometer)
  }}
  on:pageAfterOut={pageAfteOut} >

  <Navbar title={$t('settings.presets.title')} backLink="Back" />

  <Toolbar top tabbar >
    <Link tabLink="#tab-city" tabLinkActive>{$t('settings.presets.city')}</Link>
    <Link tabLink="#tab-way">{$t('settings.presets.way')}</Link>
    <Link tabLink="#tab-rain">{$t('settings.presets.user')}</Link>
  </Toolbar>
  <Tabs >
<!-- ГОРОД -->
    <Tab id="tab-city" tabActive>
      {#each rangeValues[0] as rangeValue}
        <Ranges {...rangeValue} />
      {/each}
    </Tab>
<!-- ТРАССА -->
    <Tab id="tab-way">
      {#each rangeValues[1] as rangeValue}
        <Ranges {...rangeValue} />
      {/each}
    </Tab>
<!-- ДОЖДЬ ПЕСОК -->
    <Tab id="tab-rain">
      {#each rangeValues[2] as rangeValue}
        <Ranges {...rangeValue} />
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
//import { object_without_properties } from 'svelte/internal';

  let connected = useStore('connected', (value) => connected = value);
  let odometer = useStore('odometer', (value) => odometer = value);
  //let fChngSettings = useStore('chngSettings', (value) => fChngSettings = value);
  let mapSettings = useStore('mapSettings', (value) => mapSettings = value);
 // let chngSettings = useStore('chngSettings', (value) => chngSettings = value)

  let tmpOdometer = odometer

/*   tmpTrip = new Proxy(tmpTrip, {
      set: (target, prop, value) => {
        console.log("PROXY obj PUMP ===> ", target, prop, value)
        //target[prop] = value
       // prx = target[prop]
       // prx[prop] = value
        prx = {...{[prop]: value}}
        console.log("PROXY obj PUMP prx ===> ", prx)
        return Reflect.set(target, prop, value);
      }
    }) */

  $: if (!connected) document.location.reload()

  $: rangeValues = [
      /* ГОРОД */
      [{
        title: $t('all.distance'),
        value: tmpOdometer.presets[0].dst_m/1000,
        name_value: $t('all.km'),
        minValue: 2,
        maxValue: 20,
        stepValue: 1,
        scaleStep: 6,
        sacaleSubSteps: 2,
        icon: "icon-route",
        rangeChange: (e)=>{
          tmpOdometer.presets[0].dst_m = e * 1000
          let arr = mapSettings.get('presets')
          mapSettings.set("presets", [tmpOdometer.presets[0], (arr)?arr[1]:null, (arr)?arr[2]:null]);
          log(mapSettings)
        }
      },
      {
        title: $t('all.count'),
        value: tmpOdometer.presets[0].num,
        minValue: 1,
        maxValue: 11,
        stepValue: 1,
        scaleStep: 5,
        scaleSubSteps: 2,
        icon: "icon-drop",
        rangeChange: (e)=>{
          tmpOdometer.presets[0].num = e
          let arr = mapSettings.get('presets')
          mapSettings.set("presets", [tmpOdometer.presets[0], (arr)?arr[1]:null, (arr)?arr[2]:null]);
          log(mapSettings)
        }
      }],
      /* ТРАССА */
      [{
        title: $t('all.distance'),
        value: tmpOdometer.presets[1].dst_m/1000,
        name_value: $t('all.km'),
        minValue: 2,
        maxValue: 20,
        stepValue: 1,
        scaleStep: 6,
        sacaleSubSteps: 2,
        icon: "icon-route",
        rangeChange: (e)=>{
          tmpOdometer.presets[1].dst_m = e * 1000
          let arr = mapSettings.get('presets')
          mapSettings.set("presets", [(arr)?arr[0]:null, tmpOdometer.presets[1], (arr)?arr[2]:null]);
          log(mapSettings)
        }
      },
      {
        title:  $t('all.count'),
        value: tmpOdometer.presets[1].num,
        minValue: 1,
        maxValue: 11,
        stepValue: 1,
        scaleStep: 5,
        scaleSubSteps: 2,
        icon: "icon-drop",
        rangeChange: (e)=>{
          tmpOdometer.presets[1].num = e
          let arr = mapSettings.get('presets')
          mapSettings.set("presets", [(arr)?arr[0]:null, tmpOdometer.presets[1], (arr)?arr[2]:null]);
          log(mapSettings)
        }
      },
      {
        title: $t('all.maxspeed'),
        value: tmpOdometer.smart.maxsp,
        name_value: $t('all.kmh'),
        minValue: 100,
        maxValue: 200,
        stepValue: 10,
        scaleStep: 5,
        scaleSubSteps: 2,
        icon: "icon-speed-1",
        rangeChange: (e)=>{
          tmpOdometer.smart.maxsp = e
          mapSettings.set("smart", tmpOdometer.smart);
          log(mapSettings)
        }
      }],
      /* ОФФРОАД */
      [{
        title: $t('all.distance'),
        value: tmpOdometer.presets[2].dst_m/1000,
        name_value: $t('all.km'),
        minValue: 2,
        maxValue: 10,
        stepValue: 1,
        scaleStep: 4,
        sacaleSubSteps: 2,
        icon: "icon-route",
        rangeChange: (e)=>{
          tmpOdometer.presets[2].dst_m = e * 1000
          let arr = mapSettings.get('presets')
          mapSettings.set("presets", [(arr)?arr[0]:null, (arr)?arr[1]:null, tmpOdometer.presets[2]]);
          log(mapSettings)
        }
      },
      {
        title:  $t('all.count'),
        value: tmpOdometer.presets[2].num,
        minValue: 1,
        maxValue: 11,
        stepValue: 1,
        scaleStep: 5,
        scaleSubSteps: 2,
        icon: "icon-drop",
        rangeChange: (e)=>{
          tmpOdometer.presets[2].num = e
          let arr = mapSettings.get('presets')
          mapSettings.set("presets", [(arr)?arr[0]:null, (arr)?arr[1]:null, tmpOdometer.presets[2]]);
          log(mapSettings)
        }
      },
      {
        title: $t('all.count.cycles'),
        value: tmpOdometer.presets[2].cycles,
        minValue: 0,
        maxValue: 10,
        stepValue: 1,
        scaleStep: 5,
        scaleSubSteps: 2,
        icon: "icon-repeat",
        rangeChange: (e)=>{
          tmpOdometer.presets[2].cycles = e
          let arr = mapSettings.get('presets')
          mapSettings.set("presets", [(arr)?arr[0]:null, (arr)?arr[1]:null, tmpOdometer.presets[2]]);
          log(mapSettings)
        }
      }]
    ]

  function pageAfteOut() {
    //console.log('pageAfterOut', tmpOdometer);
    store.dispatch('calcDistance', tmpOdometer)
    store.dispatch('sendDistance', tmpOdometer)
  }

</script>
