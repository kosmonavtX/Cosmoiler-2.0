<BlockTitle class="display-flex justify-content-space-between">
    <span>{title}</span>
    {#if name_value}
      <span style="color: var(--f7-theme-color-change-text)">{value} {name_value}</span>
    {/if}
  </BlockTitle>
  <List simpleList class='elevation-0'>
    <ListItem style="background-color: var(--f7-theme-color-bg-tint-color)">
      <ListItemCell class="width-auto flex-shrink-0">
        <Icon icon={icon} style="font-size: 25px" />
      </ListItemCell>
      <ListItemCell class="flex-shrink-3">
        <Range class="range__color !range__margin-bottom"
        min={minValue}
        max={maxValue}
        label={true}
        color=range__color
        step={stepValue}
        value={value}
        scale={scale}
        scaleSteps={scaleStep}
        scaleSubSteps={scaleSubSteps}
        formatScaleLabel={frmtScaleLabel}
        onRangeChange={rangeChange}
        />
      </ListItemCell>
  <!--     formatScaleLabel={(e)=>{return Math.round(e/10)*10}} -->
  {#if icon2}
          <ListItemCell class="width-auto flex-shrink-0">
            <Icon icon={icon2} style="font-size: 25px" />
      </ListItemCell>
      {/if}
      {#if toggle}
        <ListItemCell class="width-auto flex-shrink-0">
          <Toggle checked={toggleCheck} on:toggleChange={onCtrlToggle} />
        </ListItemCell>
      {/if}
    </ListItem>
  </List>

  <script>
    import {
    List,
    ListItem,
    ListItemCell,
    BlockTitle,
    Range,
    Icon,
    Toggle
  } from 'framework7-svelte';

 // export let rangeValue = {
  export let title = ""
  export let value = 0
  export let  name_value = ""
  export let view_value = true
  export let  icon = undefined
  export let minValue = 0
  export let  maxValue = 10
  export let  stepValue = 1
  export let  scaleStep = undefined
  export let  scaleSubSteps = undefined
  export let frmtScaleLabel = undefined
  export let rangeChange = undefined
  export let scale = true
  export let icon2 = undefined

  export let toggle = false
  export let toggleCheck = undefined
  export let onCtrlToggle = undefined
 /*  let value_current;


  $: {
      console.log('val_current')
      value_current = value
    } */
  /*   function outScaleLabel(value) {
    return Math.round(value/10) * 10
  } */

/*   let check = false

  function onCtrlToggle(e) {
    check = !check
      console.log('ctrlPump', e.detail[0])

    } */

  </script>
