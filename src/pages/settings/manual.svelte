<Page
  name="manual"
  class={`page`}
  on:pageBeforeIn={pageBeforeIn}
  on:pageAfterOut={pageAfterOut}>

  <Navbar title={$t('settings.pump.title')} backLink="Back" />

  {#each rangeValues as rangeValue}
      <Ranges {...rangeValue} />
  {/each}
</Page>

<script>
  import {
    Page,
    Navbar,
    useStore
  } from 'framework7-svelte';
  import {t} from '../../services/i18n.js';
  import Ranges from '../../components/range-param.svelte'
  import store from '../../js/store.js';
  import log from '../../js/debug.js'


  let connected = useStore('connected', (value) => connected = value);
  let manual = useStore('manual', (value) => manual = value);

  let tmpManual = manual
  let dpms_rel = Math.trunc(tmpManual.pump.dpms * 100 / tmpManual.pump.dpdp);

  function pageBeforeIn() {
    log('pageBeforeIn', manual)
  }

  function pageAfterOut() {
    log('pageAfterOut', tmpManual);
    /* сохранить настройки */
    store.dispatch('sendManual', tmpManual)
  }

  $: if (!connected) document.location.reload()

  $: rangeValues = [
      {
          title: "Объем масла",
          value: dpms_rel,//Math.trunc(tmpManual.pump.dpms * 100 / tmpManual.pump.dpdp),
          name_value: "%",
          minValue: 5, // 0.1
          maxValue: 90,// 1.1
          stepValue: 5, // 0.05
          // sacaleSubSteps: 1,
          scale: false,
          // frmtScaleLabel: outScaleLabel,
          /*         scaleStep: ,
          sacaleSubSteps: 2, */
          icon: "icon-drop",
          icon2: "icon-dropfill",
          rangeChange: (e)=>{
            dpms_rel = e;
            tmpManual.pump.dpms = tmpManual.pump.dpdp * (e / 100);
            store.dispatch('sendManual', tmpManual);
          }
      },
      {
          title: "Таймер",
          value: tmpManual.pump.dpdp/1000, //Math.round(/10) * 10,
          name_value: "сек",
          minValue: 0.500,
          maxValue: 2.000,
          stepValue: 0.100,
          scale: true,
          /*          scaleStep: 5,
          sacaleSubSteps: 2, */
          icon: "icon-clock",
          /*        icon2: "icon-drop", */
          rangeChange: (e)=>{
              tmpManual.pump.dpdp = Math.trunc(e * 1000)//.toFixed(0);
              store.dispatch('sendManual', tmpManual);
          }
      }
  ]

  $: tmpManual.pump.dpms = tmpManual.pump.dpdp * (dpms_rel / 100);

</script>
