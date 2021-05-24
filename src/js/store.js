
import { createStore } from 'framework7/lite';
import websocketStore from './websocket.js';
import log from './debug.js'

let testURI = 'ws://db39b18be10d.ngrok.io'
let URI = testURI

function getUrlVar() {
   // debug("document.location.host")
    var urlVar = window.location.search; // получаем параметры из урла
    var arrayVar = []; // массив для хранения переменных
    var valueAndKey = []; // массив для временного хранения значения и имени переменной
    var resultArray = []; // массив для хранения переменных
    arrayVar = (urlVar.substr(1)).split('&'); // разбираем урл на параметры
    if (arrayVar[0] == "") return false; // если нет переменных в урле
    for (var i = 0; i < arrayVar.length; i++) { // перебираем все переменные из урла
        valueAndKey = arrayVar[i].split('='); // пишем в массив имя переменной и ее значение
        resultArray[valueAndKey[0]] = valueAndKey[1]; // пишем в итоговый массив имя переменной и ее значение
    }
    return resultArray; // возвращаем результат
}

/**
 * @param ws - задается url адрес вебсокета.
 * Примеры: 1. localhost:port/?ws=192.168.4.1/ws - для доступа к @Cosmoiler
 *          2. localhost:port/?ws=2506d4fb70a8.ngrok.io - для доступа к тестовому серверу ngrok.io
 */
function uri() {
    if (document.location.host.indexOf('localhost') + 1) {
        /*store.state.connect = true;*/
        if (!getUrlVar()['ws'])
            return '192.168.4.1/ws'
        else
            return getUrlVar()['ws']
    } else if (document.location.host === "")
        return '192.168.4.1/ws'
    else
        return document.location.host
}

const wsStore = websocketStore('ws://' + uri(), {}, [],
  {
    debug: false,
    reconnectionDelayGrowFactor: 1,
    maxReconnectionDelay: 6000,
    minReconnectionDelay: 3000,
    connectionTimeout: 2000,
  })

const store = createStore({
  state: {
    wsStore: wsStore,//websocketStore('ws://' + uri(), {"initial": 0}, [], {debug: true}),
    connect: false,
    locale: window.navigator.userLanguage || window.navigator.language,
    /**
     * ! Флаг изменения настроек
     * status {false, true}: true - настройки были изменены, false - не было измененений
     * id:
     * settings: имя ключа в объекте (массив объектов: ключ:значение)
     *
     */
    fChngSettings: {status: false, id: []},
    /**
     * ! Данные настроек */
    mapSettings: new Map(),

    gnssPresent: false,
    mode: {
      id: "/mode.json",
      m: 0,
      p: 0
    },
    odometer: {
      id: "/trip.json",
      smart: { predict: 5, avgsp: 80, maxsp: 150 },
      sensor: { gnss: true, imp: 16, hdop: 5000 },
      presets: [
          { dst_m: 4000, num: 2, imp_m: 0, n: 5, cycles: 0 },
          { dst_m: 7000, num: 5, imp_m: 0, n: 10, cycles: 0 },
          { dst_m: 3000, num: 1, imp_m: 0, n: 3, cycles: 0 }
      ],
      wheel: { d: 17, w: 150, h: 70, l: 2016 }
    },
    timer: {
      id: "/time.json",
      smart: { trail: true, predict: 600 },
      presets: [
          { time: 120, num: 2, cycles: 0 },
          { time: 0, num: 0, cycles: 0 },
          { time: 60, num: 1, cycles: 0 }
      ]
    },
    manual: {
      id: "/manual.json",
      pump: { dpms: 500, dpdp: 800 }
    },
    pump: {
      id: "/pump.json",
      dpms: null, dpdp: null, period: 2000,
      usr: false // пользовательский насос
    },
    system: {
      id: "/system.json",
      pn: "",
      ap: {ssid: "Cosmoiler-NNNN", psw: "", pwr: true},
      sta: {ssid: "", psw: ""},
      bright: 255,
      gps: false
    },
   /*  pn: { pn: null, ssid: "Cosmoiler_", psw: null }, */
    ver: {
      id: "/ver.json",
      fw: "   ", hw: "   "
    },
    telemetry: {
      id: "telemetry",
      params: [
        { // 0 - odometer
          sp: 0,
          imp: 0,
          v: 0,     // Одометр
          dst: 0,   // Оставшееся расстояние до вкл насоса [м]
          spd: 0,   // Скорость
          maxsp: 0, // Максимальная скорость
          avgsp: 0  // Средняя скорость
        },
        { // 1 - timer
          v: 110000  // Таймер, [мс]
        },
        { // 2 - pump
          v: 0,      // Количество включений насоса
        },
        { // 3 - mode
          m: 0, p: 0
        },
        { // 4 - gps
          fix: false,   // 3D Fix GPS
          sat: 0,       // Количество спутников
          lat: 0.000000,// Широта
          lon: 0.000000 // Долгота
        },
        { // 5 - voltage
          v: 0,      // Напряжение бортовое
          k: 5303   // Коэфф корректировка значений с АЦП = 0.053030303...
        },
      ]
    },
    versw: "v4.0",

    OILER_SETTINGS: 2,
    OILER_MANUAL: 1,
    OILER_AUTO: 0,

  },
  getters: {
    gnssPresent:  ({state}) => state.system,
    connected:    ({state}) => state.connect,
    odometer:     ({state}) => state.odometer,
    timer:        ({state}) => state.timer,
    manual:       ({state}) => state.manual,
    pump:         ({state}) => state.pump,
    telemetry:    ({state}) => state.telemetry,
    mode:         ({state}) => state.mode,
    system:       ({state}) => state.system,
    ver:          ({state}) => state.ver,
    chngSettings: ({state}) => state.fChngSettings,
    mapSettings:  ({state}) => state.mapSettings,
  },
  actions: {
    init({state}) {
      wsStore.subscribe((value) => {
        log('[wsStore init]=> ', value)

        if (value) {
          //console.log('wsStore value', value)
          //state.connect = value.connect
         // state.connect = true //debug.enabled('test') ? true : value.connect
          delete value.connect
          //let obj = value.data

          if (value.id == '/mode.json')
            state.mode = value
          else if (value.id == '/trip.json')
            state.odometer = value
          else if (value.id == '/time.json')
            state.timer = value
          else if (value.id == '/manual.json')
            state.manual = value
          else if (value.id == '/pump.json')
            state.pump = value
          else if (value.id == '/system.json') {
            state.system = value
            // Если модуль GPS в блоке управления остуствует
            if (!state.system.gps) state.odometer.sensor.gnss = false
          }
          else if (value.id == '/ver.json') {
            state.ver = value
            if (state.ver.hw[0] == 'B' || state.ver.hw[0] == 'A') state.pump.period = 3000
            else if (state.ver.hw[0] == 'C') state.pump.period = 2000
          }
          else if (value.id == 'telemetry')
            state.telemetry = value

          log('Store state', state)
      }
    })
    },
    requestGNSS({state}) {
      wsStore.set({cmd: "get", param: ["gnss"]})
      log('requestGNSS')
    },
    requestTelemetry({state}) {
      wsStore.set({cmd: "telemetry"})
      //console.log('requestTelemetry')
    },
    requestConfig ({state}, settings) {
      wsStore.set({cmd: "get", param: settings})
    },
  // TODO: проверить правильность заполнения поля imp_m
    calcDistance({state}, _trip) {
      log("_trip", _trip)
      state.odometer.wheel.d = Number(_trip.wheel.d)
      state.odometer.wheel.h = Number(_trip.wheel.h)
      state.odometer.wheel.w = Number(_trip.wheel.w)
      state.odometer.sensor.imp = Number(_trip.sensor.imp)
      let dm = _trip.wheel.d * 25.4;
      let hm = _trip.wheel.h * _trip.wheel.w / 100;
      let Len = (dm + 2 * hm) * 3.14159;
      state.odometer.wheel.l = Math.round(Len);
      for (let i = 0; i <= 2; i++) {
          let a = _trip.sensor.imp * _trip.presets[i].dst_m / (_trip.wheel.l / 1000);
          state.odometer.presets[i].imp_m = parseInt(a.toFixed(), 10);
      }
      state.odometer = state.odometer
    },
    sendDistance({state}, data) {
      state.odometer = data
      state.odometer = state.odometer
      wsStore.set({cmd: "post", param: [state.odometer.id, Object.fromEntries(state.mapSettings)]}) // отправляем в БУ
      state.mapSettings.clear()
                                                        // Данная запись прдотвращает попадание в массив повторяющихся значений id
      state.fChngSettings = { status: true, id: [...new Set([...state.fChngSettings.id, state.odometer.id])]}
      log('Change Settings = ', state.fChngSettings)
    },
    sendTime({state}, data) {
      state.timer = data
      state.timer = state.timer
      wsStore.set({cmd: "post", param: [state.timer.id, Object.fromEntries(state.mapSettings)]})
      state.mapSettings.clear()
      state.fChngSettings = { status: true, id: [...new Set([...state.fChngSettings.id, state.timer.id])]}
      log("send Time = ", state.timer)
    },
    sendManual({state}, data) {
      state.manual = data
      state.manual = state.manual
      wsStore.set({cmd: "post", param: [state.manual.id, state.manual]})
      state.fChngSettings = { status: true, id: [...new Set([...state.fChngSettings.id, state.manual.id])]}
      log("send Pump = ", state.manual)
    },
    sendPump({state}, data) {
      //console.log("sendPump: ", prop)
      state.pump = data
      state.pump = state.pump
      wsStore.set({cmd: "post", param: [state.pump.id, {dpms: data.dpms}]}) // отправляем в БУ только свойство dpms
      state.fChngSettings = { status: true, id: [...new Set([...state.fChngSettings.id, state.pump.id])]}
      log("send Pump = ", state.pump)
    },
    sendMode({state}, data) {
        state.mode.m = data.m
        state.mode = state.mode
        wsStore.set({cmd: "post", param: [state.mode.id, {m: data.m}]}) // отправляем в БУ только свойство m
        log("send Mode = ", state.mode)
     // }
    },
    sendSystem({state}, data) {
      state.system = data
      state.system = state.system
      wsStore.set({cmd: "post", param: [state.system.id, Object.fromEntries(state.mapSettings)]}) // TODO проверить!
      state.mapSettings.clear()
      state.fChngSettings = { status: true, id: [...new Set([...state.fChngSettings.id, state.system.id])]}
      log("send System = ", state.system)
    },
    modeWork({state}, mode) {
      state.wsStore.set({cmd: "work", param: mode})
    },
    ctrlPump({state}, settings) {
      state.wsStore.set({cmd: "pump", param: settings})
    },
    ctrlBright({state}, data) {
      state.wsStore.set({cmd: "bright", param: data})
    },
    cmdUpdate({state}) {
      state.wsStore.set({cmd: "update"})
    },
    cmdReset({state}) {
      state.wsStore.set({cmd: "resetCnfg"})
    }
  },
})

export default store;
