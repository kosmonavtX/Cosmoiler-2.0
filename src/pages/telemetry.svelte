<Page
  name="telemetry"
  class={`page`}
  on:pageTabShow={pageTabShow}
  on:pageTabHide={pageTabHide}>

  <Navbar title={$t('home.telemetry')} />
  <!-- <Button on:click={() => { store.state.connect =  !store.state.connect}}>Connect = {store.state.connect}</Button> -->

{#if !connected}
<!--   <div transition:fade="{{delay: 250, duration: 30}}"> -->
  <div in:fade="{{delay: 50, duration: 300}}" out:fly="{{duration: 300}}">
    <BlockTitle class={`block-title-noconnection__text`} >{$t('home.noconnect')}</BlockTitle>
  </div>
  {/if}
{#if connected}
<!--   <CardTelemetry {...dataCardTele[telemetry.params[3].m]}  /> -->
<div in:fade="{{delay: 50, duration: 300}}" out:fly="{{duration: 300}}">
    <CardTelemetry {...dataCardTele[md]}  />
  </div>
{/if}


</Page>

<script>
  import {
    Page,
    Navbar,
    BlockTitle,
    useStore
  } from 'framework7-svelte';
  import {t} from '../services/i18n.js';
  import CardTelemetry from '../components/tele-card.svelte'
  import store from '../js/store';
  import { fade, fly } from 'svelte/transition';
  import log from '../js/debug.js'

  let telemetry = useStore('telemetry', (value) => telemetry = value)
  let odometer = useStore('odometer', (value) => odometer = value)
  let timer = useStore('timer', (value) => timer = value)
  let gnssPresent = useStore('gnssPresent', (value) => gnssPresent = value)
  let connected = useStore('connected', (value) => connected = value);
  //let m = useStore('telecard', (value) => m = value);

  //console.log('params', odometer)
 // log("M = ", m)

  const MAXSPEED = 250
  const iconsPreset = ["icon-city", "icon-way", "icon-off-road"]
  const nameParams = {
    ODOMETER: 0,
    TIMER: 1,
    PUMP: 2,
    MODE: 3,
    GPS: 4,
    VOLTAGE: 5
  }
/* let  icons = [
      {icon: iconsPreset[params.preset], value: "xxx"},
      {icon: "icon-pump", value: params.non}
    ] */
/*   if (trip.trip.sensor.gnss)
      icons.push({icon: "icon-gps", value: params.sat})
    else
      icons.push({icon: "icon-sensor", value: params.imp}) */

 // gnssPresent = false;

  let valueTimer = (data) => {
    //console.log('timer = ',data)
   // let myDate
    //if (data.v != 0)
    let  myDate = new Date(0, 0, 0, 0, 0, 0, data.v);
    //else
    //  myDate = new Date(0, 0, 0, 0, 0, 0, timer.presets[telemetry.params[3].p].time);
    return myDate.toTimeString().replace(/.*(\d{2}:\d{2}).*/, "$1");
  }
  //console.log('timer = ',valueTimer(params.time), params.time)

  let remainsTrip = (odometer, gnssPresent, params) => {
    //console.log(trip)
    return params.dst
    if (!odometer.sensor.gnss || !gnssPresent) {
      let imp = params.imp;
      let sensor = odometer.sensor.imp;
      let lwhl = odometer.wheel.l;
      return Number(((imp * lwhl) / sensor) / 1000).toFixed(0);
    }
    else {
      return params.dst;
    }
  }
//$:  console.log('remainsTrip = ', remainsTrip(trip, gnssPresent, params))

  let voltage = (data) => {
    //let tmp = (data.v) / 1024;
/*     let tmp = (data.v) / 4095;
    if (tmp < 0) tmp = 0;
    tmp = tmp / (data.k / 100000);
    tmp = 0.838 * tmp + 0.354; */
    let k = (data.R1 + data.R2) / data.R2;
    let tmp = (data.max * data.v * k)/data.r
    return Number(tmp).toFixed(1);
  }

  let voltAlarm = (data) => {
    if (data <= 11.3) return true
/*     if (data > 11.3 && data <= 11.9) return "yellow" */
    if (data > 11.9 && data <= 14.8) return false
    if (data > 14.8) return true
  }

  let iconOdometerSensor = () => {
    if (odometer.sensor.gnss) {
      if (!telemetry.params[nameParams.GPS].fix)
        return {
          icon: "icon-clock",
          value: timer.presets[indexPreset(telemetry)].time + $t("all.seconds")
        }
      return {
          icon: "icon-gps",
          value: telemetry.params[nameParams.GPS].sat
      }
    }
    return {
      icon: "icon-sensor",
      value: "" //telemetry.params[nameParams.ODOMETER].imp
    }
  }

  let indexDataCardTele = (odometer, telemetry) => {
    md = telemetry.params[nameParams.MODE].m
    if (md == 1) // Режим "Одометер"
      if (odometer.sensor.gnss) { // сенсор GPS?
        if (!telemetry.params[nameParams.GPS].fix) md =  5 // TimerGPS
      }
    log("md = ", md)
    return md
  }

  let indexPreset = (telemetry) => {
/*     var pr = telemetry.params[nameParams.MODE].p - 1
    if (pr < 0) pr = 0
    if (pr > 2) pr = 2 */
    return telemetry.params[nameParams.MODE].p
  }

  log(telemetry)
  log(odometer)
  log(timer)

$:  md = indexDataCardTele(odometer, telemetry) // (!telemetry.params[nameParams.GPS].fix && telemetry.params[nameParams.MODE].m == 1) ? 5 : telemetry.params[nameParams.MODE].m

//$:  preset = indexPreset(telemetry)

$:  dataCardTele = [
    { //#0
      title: $t('telemetry.off.title').toUpperCase(), // 0
      gauge: [],
      icons: [
        (gnssPresent.gps) ? {icon: "icon-gps", value: telemetry.params[nameParams.GPS].sat} : null,
        {
          icon: "icon-accum",
          value: voltage(telemetry.params[nameParams.VOLTAGE]) + $t("all.voltage"),
          alarm: voltAlarm(voltage(telemetry.params[nameParams.VOLTAGE]))
        }
      ]
    },
    { //#1
      title: $t('telemetry.odo.title').toUpperCase(), // 1
      gauge: [
        {
          value: telemetry.params[nameParams.ODOMETER].spd/MAXSPEED,
          valueText: (telemetry.params[nameParams.ODOMETER].spd).toFixed(0),
          labelText: (telemetry.params[nameParams.ODOMETER].avgsp).toFixed(0),
          text: $t("all.speed"),
          units: $t("all.kmh") },
        {
          value: remainsTrip(odometer, gnssPresent.gps, telemetry.params[nameParams.ODOMETER])/odometer.presets[indexPreset(telemetry)].dst_m,
          valueText: (remainsTrip(odometer, gnssPresent.gps, telemetry.params[nameParams.ODOMETER])/1000).toFixed(1),
          labelText: (telemetry.params[nameParams.ODOMETER].v / 1000).toFixed(1),
          text: $t("all.distance"),
          units: $t("all.km") }
      ],
      icons: [
        { // 1-я иконка
          icon: iconsPreset[indexPreset(telemetry)],
          value: (odometer.presets[indexPreset(telemetry)].dst_m/1000).toFixed() + $t("all.km")
        },
        { // 2-я иконка
          icon: "icon-pump", // насос
          value: telemetry.params[nameParams.PUMP].v
        },
        // 3-я иконка
        iconOdometerSensor(), // часы спутник сенсор
        { // 4-я иконка
          icon: "icon-accum", // аккумулятор
          value: voltage(telemetry.params[nameParams.VOLTAGE]) + $t("all.voltage"),
          alarm: voltAlarm(voltage(telemetry.params[nameParams.VOLTAGE]))
        }
      ]
    },
/*     {
      title: "СКОРОСТЬ",
      gauge: [
        {
          value: telemetry.params[nameParams.ODOMETER].spd/MAXSPEED,
          valueText: (telemetry.params[nameParams.ODOMETER].spd).toFixed(0),
          labelText: (telemetry.params[nameParams.ODOMETER].avgsp).toFixed(0),
          text: $t("all.speed"),
          units: $t("all.kmh") },
      ],
      icons: [

      ]
    }, */
    { //#2
      title: $t('telemetry.tmr.title').toUpperCase(), // 2
      gauge: [
        {
          value: telemetry.params[nameParams.TIMER].v/(timer.presets[indexPreset(telemetry)].time*1000),
          valueText: valueTimer(telemetry.params[nameParams.TIMER]),
          labelText: "",
          text: "",
          units: "" }
      ],
      icons: [
        {icon: iconsPreset[indexPreset(telemetry)], value: timer.presets[indexPreset(telemetry)].time + $t("all.seconds")},
        {icon: "icon-pump", value: telemetry.params[nameParams.PUMP].v},
        {
          icon: "icon-accum",
          value: voltage(telemetry.params[nameParams.VOLTAGE]) + $t("all.voltage"),
          alarm: voltAlarm(voltage(telemetry.params[nameParams.VOLTAGE]))
        }
      ]
    },
    {},{},
    { //#5
      title: $t('telemetry.tmr2.title'), // 5
      gauge: [
        {
          value: telemetry.params[nameParams.TIMER].v/(timer.presets[indexPreset(telemetry)].time*1000),
          valueText: valueTimer(telemetry.params[nameParams.TIMER]),
          labelText: "",
          text: "",
          units: "" }
      ],
      icons: [
        {icon: iconsPreset[indexPreset(telemetry)], value: timer.presets[indexPreset(telemetry)].time + $t("all.seconds")},
        {icon: "icon-pump", value: telemetry.params[nameParams.PUMP].v},
        (gnssPresent.gps) ? {icon: "icon-gps", value: telemetry.params[nameParams.GPS].sat} : null,
        {
          icon: "icon-accum",
          value: voltage(telemetry.params[nameParams.VOLTAGE]) + $t("all.voltage"),
          alarm: voltAlarm(voltage(telemetry.params[nameParams.VOLTAGE])),
        }
      ]
    },

]


    $: {
      if (connected) store.dispatch('requestTelemetryStart')
    }

 // let interval;

  function pageTabShow() {
    store.dispatch('requestTelemetryStart')
/*     interval = setInterval(() => {
                      store.dispatch('requestTelemetry')
                    }, 330); */
  }
  function pageTabHide() {
   // store.dispatch('requestTelemetryStop')
    //clearInterval(interval)
  }

/*     icons = []
    if (gnssPresent) icons. */
/* $:  timeTele = {
      title: "ТАЙМЕР",
      gauge: [
        {value: 0.5, valueText: "100", labelText: "0", text: "Speed, km/h" }
      ],
      icons: [
        ...icons,
        {icon: "icon-accum", value: params.voltage}
      ]
} */
  //console.log(tripTele[0].icons[2].view)
/*   const products = useStore('products');
  const productId = f7route.params.id;
  let currentProduct;
  products.forEach(function (product) {
    if (product.id === productId) {
      currentProduct = product;
    }
  }); */
</script>
