<Page
  name="pump"
  class={`page`}
  on:pageBeforeIn={pageBeforeIn}
  on:pageAfterOut={pageAfterOut}
  >
    <Navbar title={$t('settings.pump.title')} backLink="Back" />

    <Block>
      <BlockHeader>Настройка насоса под вязкость залитого масла</BlockHeader>
      <p>
        Оптимальная настройка заключается в
        задании такого объема масла, чтобы при срабатывании насоса из форсунки вытекала одна капля.
      </p>
    </Block>


    <List>
        <ListItem
          radio
          name="std"
          value="std"
          title={$t('Штатный насос')}
          checked={fStd}
          on:change={() => {
            tmpPump.usr = false
            //mapSettings.set("sensor", tmpOdometer.sensor);
            //log(mapSettings)
          }}
          class={`sensor__list-item`}>
        </ListItem>

{#if false} <!-- TODO Сделать настройки пользовательского насоса (версия 4.1) -->
      <ListItem
        radio
        name="user"
        value="usr"
        title={$t('Пользовательский насос')}
        checked={fUsr}
        on:change={() => {
          tmpPump.usr = true
          //mapSettings.set("sensor", tmpOdometer.sensor);
          //log(mapSettings)
        }}
        class={`sensor__list-item`}>
      </ListItem>
{/if}
    </List>


    {#if !tmpPump.usr}
      {#each rangeValues[0] as rangeValue}
          <Ranges {...rangeValue} />
      {/each}
    {:else}
      {#each rangeValues[1] as rangeValue}
      <Ranges {...rangeValue} />
      {/each}
    {/if}

</Page>

  <script>
    import {
      Block,
      BlockHeader,
      Page,
      Navbar,
      List,
      ListItem,
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
    if (ver.hw[0] == 'A') T = 500 // для версии [0HW: Ax] период меньше, чтобы dpms был от 5 мс (1%) до 450 мс (90%)
    if (ver.hw[0] == 'C') T = 300 // для версии [0HW: Ax] период меньше, чтобы dpms был от 5 мс (1%) до 450 мс (90%)
    let tmpPump = pump
    let fToggle = false
    let fOnOffPump = false

    $: if (!connected) document.location.reload()
    $: fStd = (!tmpPump.usr)? true : false
    $: fUsr = (tmpPump.usr)? true : false

    $: rangeValues = [
      [{
        title: "Объем масла",
        value: tmpPump.dpms * 100 / T,
       // name_value: "%",
        minValue: (ver.hw[0] == 'C')? 2 : 1,
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
      [{
        title: "Время вкл.",
        value: tmpPump.dpms * 100 / T,
       // name_value: "%",
        minValue: (ver.hw[0] == 'C')? 2 : 1,
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
      },
      {
        title: "Время выкл.",
        value: tmpPump.dpms * 100 / T,
       // name_value: "%",
        minValue: (ver.hw[0] == 'C')? 2 : 1,
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

    $: store.dispatch('ctrlPump', [fToggle, 0, {dpms: tmpPump.dpms, dpdp: 2000}])

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

  </script>
