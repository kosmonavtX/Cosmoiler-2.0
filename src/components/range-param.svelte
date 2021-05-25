<BlockTitle class="display-flex justify-content-space-between">
    <span>{title}</span>
    {#if name_value}
      <span style="color: var(--f7-theme-color-change-text)">{value} {name_value}</span>
<!--       <Input class={`settings-main__list-item`}
      type="text"
      placeholder="Введите имя"
      bind:value={value}
    >
    </Input>

    <span style="color: var(--f7-theme-color-change-text)">{name_value}</span> -->
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
<!--       <ListItemCell class="width-auto flex-shrink-0">
        <Stepper small bind:value={value} buttonsOnly min={minValue} max={maxValue} step={stepValue} style="color: var(--f7-theme-color-change-text)"></Stepper>
      </ListItemCell> -->

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
    Input,
    Stepper,
    Toggle
  } from 'framework7-svelte';

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
</script>
