
<ListItem class={`home-list-item`} >
    <div slot='title' class="home-list-item__title home-list-item__title_up-color">
      {title}
    </div>
    <div slot="subtitle">
      <div class="home-list-item__subtitle-text home-list-item__subtitle-text_color">{subtitle}</div>
      <div >
        {#if gnss}
        <div transition:fade="{{delay: 500, duration: 600}}">
          <!-- <Icon icon={gpsIcon} size=20 class={`home-media__icon2`}/> -->
          <!-- <Badge class={`home-list-item__badge_color home-media__text-icon2`}>Модуль GPS активен</Badge> -->
          <!-- <span class="home-media__text-icon2">Модуль GPS активен</span> -->
        </div>
      {/if}
           <!-- <Badge color='green'>GPS</Badge> -->
          <!--  <Icon icon="icon-gps" size="26px" class={`card-footer-tele__icon`}/> -->
        <!-- <Chip text="активен" media="GPS" mediaBgColor="blue"  ></Chip> -->
      </div>
    </div>
    <div slot='text' class="home-list-item__text home-list-item__text_margin-1rem">
      <Row noGap>
        {#each icons as {name, text}}
        <Col>
          <Icon icon={name} size="20px" class={`col-param__logo`}/>
          <span>{text}</span>
        </Col>
        {/each}
      </Row>
    </div>
    <div slot="after">
      <Toggle checked={toggleCheck} on:toggleChange={onSelectModeToggle} />
    </div>
    <div slot='media'>
      {#if gnss}
        <div >
          <Icon icon={gpsIcon} size=25 class={`home-media__icon2`}/>
        </div>
      {/if}
      <div><Icon icon={titleIcon} size=36 /></div>
    </div>
</ListItem>

<script>
    import {
        Icon,
        ListItem,
        Row,
        Col,
        Toggle,
    } from 'framework7-svelte';
    import { fade } from 'svelte/transition';


    export let gnss = false
    export let title = ""
    export let subtitle = ""
    export let titleIcon = undefined
    export let gpsIcon = undefined
    export let icons = undefined
    export let toggleCheck = false
    export let onSelectModeToggle = undefined

    let visbl = true

/*     setInterval(() => {
      visbl = !visbl
      console.log(visbl)
    }, 1000) */


</script>
