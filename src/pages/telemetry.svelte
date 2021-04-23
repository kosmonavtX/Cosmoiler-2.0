<Page
  name="telemetry"
  class={`page`}
  on:pageTabShow={pageTabShow}
  on:pageTabHide={pageTabHide}>

  <Navbar title="Телеметрия" />

  <!-- <Card > -->
<!--     <CardHeader >
      <span>ОДОМЕТР</span>
    </CardHeader> -->
<!--     <CardContent padding={true}>
      <Row>
        <Col class="text-align-center">

          <Gauge
            type="semicircle"
            value={0.6}
            valueText="100"
            valueFontSize = "34"
            valueTextColor=var(--f7-theme-color-subtitle-text)

            borderColor=var(--f7-theme-color)
            labelText={`${params.avgspeed}`}
            labelFontSize = "18"
            labelTextColor=var(--f7-theme-color-change-text) />
            <span style="color: #888888" >Скорость, км/ч</span>
        </Col> -->
<!--         <Col class="text-align-center">
          <Gauge
            type="semicircle"
            value={params.trip/2}
            valueText={`${tripValueText}`}
            valueFontSize = "34"
            valueTextColor=var(--f7-theme-color)
            borderColor=var(--f7-theme-color)
            labelText = {`${params.odo}`}
            labelFontSize = "18"
            labelTextColor=var(--f7-theme-color-change-text) />
             <span style="color: #888888">Расстояние, км</span>
        </Col> -->
<!--       </Row>
    </CardContent>
    <CardFooter class="card-footer-tele"> -->
<!--       <div class="card-footer-tele__logo-text">
        <Icon icon="icon-route" size=var(--card-footer-icon-size) class={`col-param__logo`}/>
      </div> -->
<!--       <div class="card-footer-tele__logo-text">
        <Icon icon="icon-city" size=var(--card-footer-icon-size) class={`col-param__logo`}/>
        <span class="card-footer__text_margin-top">4 km</span>
      </div>
      <div class="card-footer-tele__logo-text">
        <Icon icon="icon-pump" size=var(--card-footer-icon-size) class={`col-param__logo`} />
        <span class="card-footer__text_margin-top">1246</span>
      </div>
      <div class="card-footer-tele__logo-text">
        <Icon icon="icon-gps" size=var(--card-footer-icon-size) class={`col-param__logo`} />
        <span class="card-footer__text_margin-top">10</span>
      </div>
      <div class="card-footer-tele__logo-text">
        <Icon icon="icon-accum" size=var(--card-footer-icon-size) class={`col-param__logo`} />
        <span class="card-footer__text_margin-top">12.5 V</span>
      </div>
    </CardFooter>
  </Card> -->

<!--   <Card >
    <CardHeader >
      <span>ТАЙМЕР</span>
    </CardHeader>
    <CardContent padding={true}>
      <Row>
        <Col class="text-align-center">
          <div>
          <Gauge
            type="semicircle"
            value={0.6}
            valueText="02:00"
            valueFontSize = "34"
            valueTextColor=var(--f7-theme-color-subtitle-text)

            borderColor=var(--f7-theme-color)
 />
          </div>
        </Col>
      </Row>
    </CardContent>
    <CardFooter class="card-footer-tele">
      <div class="card-footer-tele__text-color">
        <Icon icon="icon-city" size="24px" class={`col-param__logo`}/>
        <span>{$t('home.setting.city', {values: {p: time.time.presets[0].dp_time}})}</span>
      </div>
      <div class="card-footer-tele__text-color">
        <Icon icon="icon-pump" size="24px" class={`col-param__logo`} />
        <span>{params.non}</span>
      </div>
      <div class="card-footer-tele__text-color">
        <Icon icon="icon-gps" size="24px" class={`col-param__logo`} />
        <span>{params.sat}</span>
      </div>
      <div class="card-footer-tele__text-color">
        <Icon icon="icon-accum" size="22px" class={`col-param__logo`} />
        <span>{params.voltage}</span>
      </div>
    </CardFooter>
  </Card> -->

<!--   <Card >
    <CardHeader >
      <span>ВЫКЛЮЧЕНО</span>
    </CardHeader>
    <CardFooter class="card-footer-tele">
      <div class="card-footer-tele__text-color">
        <Icon icon="icon-gps" size="24px" class={`col-param__logo`} />
        <span>{params.sat}</span>
      </div>
      <div class="card-footer-tele__text-color">
        <Icon icon="icon-accum" size="22px" class={`col-param__logo`} />
        <span>{params.voltage}</span>
      </div>
    </CardFooter>
  </Card> -->

  <CardTelemetry {...dataCardTele[telemetry.params[3].m]}  />

<!--   <CardTelemetry {...dataCardTele[1]} />
  <CardTelemetry {...dataCardTele[2]} />
  <CardTelemetry {...dataCardTele[5]} /> -->

</Page>

<script>
  import {
    Page,
    Navbar,
    useStore
  } from 'framework7-svelte';
  import {t} from '../services/i18n.js';
  import CardTelemetry from '../components/tele-card.svelte'
  import store from '../js/store';
  import { fade } from 'svelte/transition';
  import log from '../js/debug.js'

  let telemetry = useStore('telemetry', (value) => telemetry = value)
  let odometer = useStore('odometer', (value) => odometer = value)
  let timer = useStore('timer', (value) => timer = value)
  let gnssPresent = useStore('gnssPresent', (value) => gnssPresent = value)

  //console.log('params', odometer)

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
    let tmp = (data.v) / 1024;
    if (tmp < 0) tmp = 0;
    tmp = tmp / (data.k / 100000);
    tmp = 0.838 * tmp + 0.354;
    return Number(tmp).toFixed(1);
  }

  let voltAlarm = (data) => {
    if (data <= 11.3) return true
/*     if (data > 11.3 && data <= 11.9) return "yellow" */
    if (data > 11.9 && data <= 14.8) return false
    if (data > 14.8) return true
  }

$:  dataCardTele = [
    /** Выключено (mode = 0) */
    {
      title: "ВЫКЛЮЧЕНО",
      gauge: [],
      icons: [
        (gnssPresent.gps) ? {icon: "icon-gps", value: telemetry.params[nameParams.GPS].sat} : null,
        {icon: "icon-accum", value: voltage(telemetry.params[nameParams.VOLTAGE]) + $t("all.voltage")}
      ]
    },
    {
      title: "ОДОМЕТР",
      gauge: [
        {
          value: telemetry.params[nameParams.ODOMETER].spd/MAXSPEED,
          valueText: (telemetry.params[nameParams.ODOMETER].spd).toFixed(0),
          labelText: (telemetry.params[nameParams.ODOMETER].avgsp).toFixed(0),
          text: $t("all.speed"),
          units: $t("all.kmh") },
        {
          value: remainsTrip(odometer, gnssPresent.gps, telemetry.params[nameParams.ODOMETER])/odometer.presets[telemetry.params[nameParams.MODE].p].dst_m,
          valueText: (remainsTrip(odometer, gnssPresent.gps, telemetry.params[nameParams.ODOMETER])/1000).toFixed(1),
          labelText: (telemetry.params[nameParams.ODOMETER].v / 1000).toFixed(1),
          text: $t("all.distance"),
          units: $t("all.km") }
      ],
      icons: [
        {
          icon: iconsPreset[telemetry.params[nameParams.MODE].p],
          value: (odometer.presets[telemetry.params[nameParams.MODE].p].dst_m/1000).toFixed() + $t("all.km")
        },
        {
          icon: "icon-pump",
          value: telemetry.params[nameParams.PUMP].v
        },
        (odometer.sensor.gnss) ?
          {icon: "icon-gps", value: telemetry.params[nameParams.GPS].sat} :
          {icon: "icon-sensor", value: telemetry.params[nameParams.ODOMETER].imp},
        {
          icon: "icon-accum",
          value: voltage(telemetry.params[nameParams.VOLTAGE]) + $t("all.voltage")
        }
      ]
    },
    {
      title: "ТАЙМЕР",
      gauge: [
        {
          value: telemetry.params[nameParams.TIMER].v/(timer.presets[telemetry.params[nameParams.MODE].p].time*1000),
          valueText: valueTimer(telemetry.params[nameParams.TIMER]),
          labelText: "",
          text: "",
          units: "" }
      ],
      icons: [
        {icon: iconsPreset[telemetry.params[nameParams.MODE].p], value: timer.presets[telemetry.params[nameParams.MODE].p].time + $t("all.seconds")},
        {icon: "icon-pump", value: telemetry.params[nameParams.PUMP].v},
        {icon: "icon-accum", value: voltage(telemetry.params[nameParams.VOLTAGE]) + $t("all.voltage")}
      ]
    },
    {},{},
    {
      title: "ТАЙМЕР (поиск спутников)",
      gauge: [
        {
          value: telemetry.params[nameParams.TIMER].v/(timer.presets[telemetry.params[nameParams.MODE].p].time*1000),
          valueText: valueTimer(telemetry.params[nameParams.TIMER]),
          labelText: "",
          text: "",
          units: "" }
      ],
      icons: [
        {icon: iconsPreset[telemetry.params[nameParams.MODE].p], value: timer.presets[telemetry.params[nameParams.MODE].p].time + $t("all.seconds")},
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


//$:  console.log('Data Telemetry', dataCardTele)

  let interval;

  function pageTabShow() {
    store.dispatch('requestTelemetry')
    interval = setInterval(() => {
                      store.dispatch('requestTelemetry')
                    }, 1000);
  }
  function pageTabHide() {
    clearInterval(interval)
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
