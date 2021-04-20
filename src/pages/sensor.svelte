<Page
  name="sensor"
  class={`page`}
  on:pageAfterOut={pageAfterOut}>

  <Navbar title={$t('settings.pump.title')} backLink="Back" />

  <BlockTitle>{$t('settings.sensor.selectsensor')}</BlockTitle>

  <List>
    {#if gnssPresent.gps}
      <ListItem
        radio
        name="sensor"
        value="gps"
        title={$t('settings.sensor.gnss')}
        checked={fGPS}
        on:change={() => {
           odometer.sensor.gnss = true
        }}
        class={`sensor__list-item`}>
      </ListItem>
    {/if}

    <ListItem
      radio
      name="sensor"
      value="imp"
      title={$t('settings.sensor.impulse')}
      checked={fIMP}
      on:change={() => {
         odometer.sensor.gnss = false
      }}
      class={`sensor__list-item`}>
    </ListItem>
  </List>

<!--   Настройки импульсного режима -->
  {#if fIMP}
    <List noHairlinesMd >
      <!-- Импульсов на оборот -->
      <ListInput
        label={$t('settings.sensor.imprev')}
        type="number"
        required
        bind:value={odometer.sensor.imp}
        clearButton
        on:inputClear={clearImp}
        class={`sensor__list-item`}>
      </ListInput>
      <!-- Ширина -->
      <ListInput
        label={$t('settings.sensor.wheel.width')}
        type="number"
        placeholder={`[${$t('all.mm')}]`}
        bind:value={odometer.wheel.w}
        class={`sensor__list-item`}>
      </ListInput>
      <!-- Профиль -->
      <ListInput
        label={$t('settings.sensor.wheel.height')}
        type="select"
        bind:value={odometer.wheel.h}
        class={`sensor__list-item`}>
          {#each height as value}
            <option value={value}>{`${value}`}</option>
          {/each}
      </ListInput>
      <!-- Диаметр -->
      <ListInput
        label={$t('settings.sensor.wheel.rimdia')}
        type="select"
        bind:value={odometer.wheel.d}
        class={`sensor__list-item`}>
          {#each dia as value}
            <option value={value}>{`${value}"`}</option>
          {/each}
      </ListInput>
    </List>
  {/if}
</Page>

<script>
    import {
      Page,
      Navbar,
      List,
      ListInput,
      ListItem,
      BlockTitle,
      useStore
    } from 'framework7-svelte';
    import {t} from '../services/i18n.js';
    import store from '../js/store.js';

    const height = [22, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 90, 100] // профиль шины
    const dia = [16, 17, 18, 19, 21]  // диаметр

    let connected = useStore('connected', (value) => connected = value);
    let gnssPresent = useStore('gnssPresent', (value) => gnssPresent = value);
    let odometer = useStore('odometer', (value) => odometer = value);
    let telemetry = useStore('telemetry', (value) => telemetry = value)

    let interval

    $: fGPS = (odometer.sensor.gnss && gnssPresent.gps) ? true : false
    $: fIMP = (!odometer.sensor.gnss || !gnssPresent.gps) ? true : false
    $: if (!connected) document.location.reload()

    function clearImp() {
      odometer.sensor.imp = 0
      store.dispatch('modeWork', store.state.OILER_MANUAL)
      interval = setInterval(() => {
        store.dispatch('requestTelemetry')
        odometer.sensor.imp = telemetry.sp
        //trip = trip
        console.log('clearImp ', odometer)
      }, 1500);
    }

    function pageAfterOut () {
      console.log('pageAfterOut', odometer);
      clearInterval(interval)
      store.dispatch('modeWork', store.state.OILER_AUTO)
      if (odometer.sensor.imp == 0) odometer.sensor.imp = 16
      store.dispatch('calcDistance', odometer)
      store.dispatch('sendDistance', odometer)
    }

/*     function onChangeRadioGPS(e) {
      trip.sensor.gnss = true
    }

    function onChangeRadioIMP(e) {
      trip.sensor.gnss = false
    } */

</script>
