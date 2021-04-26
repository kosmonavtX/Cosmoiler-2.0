<Page
  name="system"
  class={`page`}
  pageContent={true}>

  <Navbar title={$t('home.settings')} backLink="Back" />

  <Block strong>
    <p>1. Яркость светодиода</p>
    <p>2. Восстановление заводских настроек</p>
    <p>3. Прокачка</p>
  </Block>

  <List >
    <ListItem>
      <div slot='title' class="list-input__label-text_color">Прокачка системы</div>
      <span slot="after">
        <Toggle bind:checked={system.ap.pwr}  /> <!-- on:toggleChange={() => log(system.ap.pwr)} -->
      </span>
    </ListItem>
  </List>


  {#each rangeValues[0] as rangeValue}
    <Ranges {...rangeValue} />
  {/each}

</Page>

<script>
    import {
      Page,
      List,
      ListItem,
      Navbar,
      Block,
      BlockTitle,
      Toggle,
      useStore
    } from 'framework7-svelte';
    import {t} from '../../services/i18n.js';
    import Ranges from '../../components/range-param.svelte'

    let connected = useStore('connected', (value) => connected = value);
    let system = useStore('system', (value) => system = value);

    $: rangeValues = [
      [{
        title: "Яркость светодиода",
        value: 50,
       // name_value: "%",
        minValue: 1,
        maxValue: 100,
        stepValue: 10,
        scale: false,
        icon: "icon-drop",
        icon2: "icon-dropfill",
        rangeChange: (e)=>{
          system.bright = e
          //log(tmpPump.dpms)
        },
        toggle: false,
      }],
    ]

</script>
