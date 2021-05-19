<Page
  name="pump"
  class={`page`}
  on:pageBeforeIn={pageBeforeIn}
  on:pageAfterOut={pageAfterOut}
  >
    <Navbar title={$t('settings.pump.title')} backLink="Back" />

    {#each rangeValues[0] as rangeValue}
        <Ranges {...rangeValue} />
    {/each}

    <Block>
      <BlockHeader>Настройка насоса под вязкость залитого масла</BlockHeader>
      <p>
        Оптимальная настройка заключается в
        задании такого объема масла, чтобы при срабатывании насоса из форсунки вытекала одна капля.
      </p>
    </Block>
  </Page>

  <script>
    import {
      Block,
      BlockHeader,
      Page,
      Navbar,
      useStore
    } from 'framework7-svelte';
    import {t} from '../../services/i18n.js';
    import Ranges from '../../components/range-param.svelte'
    import store from '../../js/store.js';
    import log from '../../js/debug'

    let connected = useStore('connected', (value) => connected = value);
    let pump = useStore('pump', (value) => pump = value);
    let ver = useStore('ver', (value) => ver = value);

    //console.log('connect:', connected)
/* TODO: максимальный объем выдаваемый насосом 2 мл/мин для KAMOER */

    let T = pump.period // используется для режима настройки - пауза между каплями (фиксированное)
    if (ver.hw[0] == 'A') T = 500 // для версии HW: Ax период меньше, чтобы dpms был от 5 мс (1%) до 450 мс (90%)
    let tmpPump = pump
    let fToggle = false
    let fOnOffPump = false

   // log(tmpPump);
/*     let prx = undefined;

    tmpPump = new Proxy(pump, {
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
      [{
        title: "Объем масла",
        value: tmpPump.dpms * 100 / T,
       // name_value: "%",
        minValue: 1,
        maxValue: 90,
        stepValue: 1,
        scale: false,
        icon: "icon-drop",
        icon2: "icon-dropfill",
        rangeChange: (e)=>{
          tmpPump.dpms = T * e/100
          //log(tmpPump.dpms)
        },
        toggle: true,
        toggleCheck: fOnOffPump,
        onCtrlToggle: (e) => {
          log(e.detail[0])
          fToggle = e.detail[0]
        }
      }],
    ]

    $: {
      //store.wsStore = {cmd: "pump", param: [fToggle, tmpPump.dpms, T, 0]}
      store.dispatch('ctrlPump', [fToggle, 0, {dpms: tmpPump.dpms, dpdp: 2000}])
     // store.ctrlPump()
     // console.log('ctrlPump ', [fToggle, tmpPump.dpms, T, 0])
    }

    function pageBeforeIn() {
    //log('pageBeforeIn', pump)
      /* включить режим настройки вязкости */
      store.dispatch('modeWork', store.state.OILER_SETTINGS)
    }

    function pageAfterOut() {
     // log('pageAfterOut', tmpPump);
      fOnOffPump = false
      /* Отключить режим управления насосом */
      store.dispatch('ctrlPump', [false, 0, {dpms: tmpPump.dpms, dpdp: 800}])
      /* включить автоматический режим работы смазчика */
      store.dispatch('modeWork', store.state.OILER_AUTO)
      /* сохранить настройки */
      store.dispatch('sendPump', tmpPump)
    }
/*     $: {
        console.log('dpms: ', pump.dpms)
    } */
  </script>
