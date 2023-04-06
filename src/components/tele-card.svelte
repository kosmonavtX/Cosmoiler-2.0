{#if title != undefined}
<!-- <div transition:fade="{{delay: 100, duration: 200}}"> -->
<Card class='elevation-3' >
    <CardHeader class={`card-header-tele`} >
      <span>{title}</span>
    </CardHeader>
    {#if gauge.length != 0}
    <CardContent padding={true}>

      <Row>
<!--         {#each gauge as {value, valueText, labelText, text}}
            <Col class="text-align-center">
                <Gauge
                    type="semicircle"
                    value={value}
                    valueText={valueText}
                    valueFontSize="34"
                    valueTextColor=var(--f7-theme-color-subtitle-text)
                    borderColor=var(--f7-theme-color)
                    labelText={labelText}
                    labelFontSize = "18"
                    labelTextColor=var(--f7-theme-color-change-text) />
                <span style="color: #888888" >{text}</span>
            </Col>
        {/each} -->
        {#each gauge as {value, valueText, labelText, text, units}}
        <Col class="text-align-center">
            <span style="color: #888888" >{text}</span>
            <Gauge
                type="semicircle"
                value={value}
                valueText={valueText}
                valueFontSize="34"
                valueTextColor=var(--f7-theme-color-subtitle-text)
                borderColor=var(--f7-theme-color)
                labelText={labelText}
                labelFontSize = "18"
                labelTextColor=var(--f7-theme-color-change-text) />
            <span style="color: #888888" >{units}</span>
        </Col>
        {/each}
      </Row>

    </CardContent>
    {/if}
    <CardFooter class="card-footer-tele">
        {#each icons as icon}
        {#if icon}
            <div class="card-footer-tele__icon-text">
                {#if icon.alarm}
                    <Icon icon={icon.icon} class={`card-footer-tele__icon`} style='color: red;'/>
<!--                     {#if visbl}
                        <div transition:fade="{{delay: 500, duration: 700}}">
                            <Icon icon={icon.icon} class={`card-footer-tele__icon`} style='color: red;'/>
                        </div>
                    {/if} -->
                {:else}
                    <Icon icon={icon.icon} class={`card-footer-tele__icon`} />
                {/if}
                <!-- <Icon icon={icon.icon} size=var(--card-footer-icon-size) class={`card-footer-tele__icon`}/> -->
                <span class="card-footer-tele__text">{icon.value}</span>
            </div>
        {/if}
        {/each}
    </CardFooter>
</Card>
<!-- </div> -->
{/if}

<script>
    import {
        Card,
        CardHeader,
        CardContent,
        CardFooter,
        Gauge,
        Row,
        Col,
        Icon
    } from 'framework7-svelte';

    export let title = undefined
    export let gauge = undefined
    export let icons = undefined

/*     let visbl = true

    setInterval(() => {
      visbl = !visbl
    }, 1000) */

</script>
