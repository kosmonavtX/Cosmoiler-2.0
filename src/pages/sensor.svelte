<Page
  name="sensor"
  class={`page`}
  on:pageAfterOut={pageAfterOut}>

  <Navbar title={$t('settings.pump.title')} backLink="Back" />

  <BlockTitle>{$t('settings.sensor.selectsensor')}</BlockTitle>
  <List>
    {#if gnssPresent}
      <ListItem
        radio
        name="sensor"
        value="gps"
        title={$t('settings.sensor.gnss')}
        checked={fGPS}
        on:change={() => {
           trip.sensor.gnss = true
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
         trip.sensor.gnss = false
      }}
      class={`sensor__list-item`}>
    </ListItem>
  </List>

  {#if fIMP}
    <List noHairlinesMd >
      <ListInput
        label={$t('settings.sensor.imprev')}
        type="number"
        required
        bind:value={trip.sensor.imp}
        clearButton
        on:inputClear={clearImp}
        class={`sensor__list-item`}>
      </ListInput>

      <ListInput
        label={$t('settings.sensor.wheel.width')}
        type="number"
        placeholder={`[${$t('all.mm')}]`}
        bind:value={trip.wheel.width}
        class={`sensor__list-item`}>
      </ListInput>

      <ListInput
        label={$t('settings.sensor.wheel.height')}
        type="select"
        bind:value={trip.wheel.height}
        class={`sensor__list-item`}>

          {#each height as value}
            <option value={value}>{`${value}`}</option>
          {/each}
      </ListInput>
      <ListInput
        label={$t('settings.sensor.wheel.rimdia')}
        type="select"
        bind:value={trip.wheel.dia}
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
      ListItemCell,
      BlockTitle,
      useStore
    } from 'framework7-svelte';
    import {t} from '../services/i18n.js';
    import store from '../js/store.js';

    const height = [22, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 90, 100]
    const dia = [16, 17, 18, 19, 21]

    let connected = useStore('connected', (value) => connected = value);
    let gnssPresent = useStore('gnssPresent', (value) => gnssPresent = value);
    let trip = useStore('trip', (value) => trip = value);
    let params = useStore('params', (value) => params = value)

    let interval

    $: fGPS = (trip.sensor.gnss && gnssPresent) ? true : false
    $: fIMP = (!trip.sensor.gnss || !gnssPresent) ? true : false

    function clearImp() {
      trip.sensor.imp = 0
      store.dispatch('modeWork', store.state.OILER_MANUAL)
      interval = setInterval(() => {
        store.dispatch('requestTelemetry')
        trip.sensor.imp = params.sp
        //trip = trip
        console.log('clearImp ', trip)
      }, 1500);
    }

    function pageAfterOut () {
      console.log('pageAfterOut', trip);
      clearInterval(interval)
      store.dispatch('modeWork', store.state.OILER_AUTO)
      if (trip.sensor.imp == 0) trip.sensor.imp = 16
      store.dispatch('calcTrip', trip)
      store.dispatch('sendTrip', trip)
    }

/*     function onChangeRadioGPS(e) {
      trip.sensor.gnss = true
    }

    function onChangeRadioIMP(e) {
      trip.sensor.gnss = false
    } */

</script>
