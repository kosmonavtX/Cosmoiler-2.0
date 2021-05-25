<Page
  name="settings"
  class={`page`}>

{#if !connected}
    <Navbar title={$t('home.settings')} />
    <BlockTitle class={`block-title-noconnection__text`} >{$t('home.noconnect')}</BlockTitle>
{:else}

    <Navbar title={$t('home.settings')} />

    <Toolbar top tabbar >
      <Link tabLink="#tab-trip" tabLinkActive>{$t('Одометр')}</Link>
      <Link tabLink="#tab-time">{$t('Таймер')}</Link>
      <Link tabLink="#tab-manual">{$t('Вручную')}</Link>
    </Toolbar>

    <Tabs >
      <Tab id="tab-trip" tabActive >
        <List>
          {#each items_odo.slice(0,2) as {link, title, icon, size, footer}}
            <ListItem link={link} title={title} class={`settings-main__list-item`}>
              <div slot='media'><Icon icon={icon} style="font-size: {size}px" /></div>
              <div slot='footer'>{footer}</div>
            </ListItem>
          {/each}
          <ListItem title={items_odo[2].title} link={items_odo[2].link} class={`settings-main__list-item`}>
            <div slot='media'><Icon icon={items_odo[2].icon} style="font-size: {items_odo[2].size}px" /></div>
            <div slot='after'><span>{gnss}</span></div>
          </ListItem>
        </List>
      </Tab>
      <Tab id="tab-time" >
        <List>
          {#each items_timer as {link, title, icon, size, footer}}
            <ListItem link={link} title={title} class={`settings-main__list-item`}>
              <div slot='media'><Icon icon={icon} style="font-size: {size}px" /></div>
              <div slot='footer'>{footer}</div>
            </ListItem>
          {/each}
        </List>
      </Tab>
      <Tab id="tab-manual" >
        <List>
          {#each items_manual as {link, title, icon, size}}
            <ListItem link={link} title={title} class={`settings-main__list-item`}>
              <div slot='media'><Icon icon={icon} style="font-size: {size}px" /></div>
            </ListItem>
          {/each}
        </List>
      </Tab>
    </Tabs>
{/if}

</Page>

<script>
  import {
    Page,
    Navbar,
    List,
    ListItem,
    Toolbar,
    Link,
    Tabs,
    Tab,
    Icon,
    BlockTitle,
    useStore
  } from 'framework7-svelte';
  import {t} from '../services/i18n.js';
/*   import { fade } from 'svelte/transition';
  import Ranges from '../components/range-param.svelte'
  import { onMount } from 'svelte';
  import store from '../js/store.js'; */
  import log from '../js/debug.js'
//import { f7router } from 'framework7-svelte/cjs/shared/f7';

//export let f7router;

  let connected = useStore('connected', (value) => connected = value);
  let odometer = useStore('odometer', (value) => odometer = value);
  let gnssPresent = useStore('gnssPresent', (value) => gnssPresent = value);


  let items_odo = [
    {
      link: '/settings/odometer/presets/',
      title: $t('settings.presets.title'),
      footer: $t("Установка расстояния между подачами масла на цепь."),
      icon: 'icon-preset',
      size: 24
    },
    {
      link: '/settings/pump/',
      title: 'Насос',
      footer: $t("Оптимальная настройка заключается в задании такого объема масла, чтобы при срабатывании насоса из форсунки вытекала одна капля"),
      icon: 'icon-pump', size: 28
    },
    {link: '/settings/odometer/sensor/', title: 'Датчик',  footer: "", icon: 'icon-sensor', size: 28},
  ]

  let items_timer = [
    {
      link: '/settings/timer/presets/',
      title: $t('settings.presets.title'),
      footer: $t("Установка времени между подачами масла на цепь."),
      icon: 'icon-preset',
      size: 24
    },
    {
      link: '/settings/pump/',
      title: 'Насос',
      footer: $t("Оптимальная настройка заключается в задании такого объема масла, чтобы при срабатывании насоса из форсунки вытекала одна капля"),
      icon: 'icon-pump',
      size: 28
    },
  ]

  let items_manual = [
    {link: '/settings/manual/', title: $t('settings.presets.title'), icon: 'icon-preset', size: 24},
  ]

  $: gnss = (odometer.sensor.gnss && gnssPresent.gps) ? "GPS" : $t("settings.sensor.impulse")

  </script>
