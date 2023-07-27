import React from 'react'

import * as am4charts from '@amcharts/amcharts4/charts'
import * as am4core from '@amcharts/amcharts4/core'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'
am4core.useTheme(am4themes_animated)

export interface IPieSlice {
  value: number
}

export class PieSlice extends React.Component<IPieSlice> {
  private chart: am4charts.PieChart | undefined

  public componentDidMount() {
    this.chart = this.init()
  }

  public componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose()
    }
  }

  public render() {
    return <div id="PieSliceDiv" style={{ width: '100%', height: '270px' }} />
  }

  private init() {
    const chart = am4core.create('PieSliceDiv', am4charts.PieChart)

    chart.data = [
      {
        radius: 2.5,
        value: this.props.value.toFixed(2),
      },
      {
        radius: 1,
        value: 100 - this.props.value,
      },
    ]

    // Add label
    chart.innerRadius = am4core.percent(50)
    chart.marginBottom = 0
    chart.marginTop = 0
    chart.paddingBottom = 0
    chart.paddingTop = 0
    chart.minWidth = 250

    const label = chart.seriesContainer.createChild(am4core.Label)
    label.text = Math.round(this.props.value) + '[font-size:28]%[/]'
    label.horizontalCenter = 'middle'
    label.verticalCenter = 'middle'
    label.dx = 10
    label.fontSize = 48
    label.fontWeight = '300'
    label.fill = am4core.color('#56ccf2')

    const labelC = chart.seriesContainer.createChild(am4core.Label)
    labelC.text = 'CONVERSION'
    labelC.horizontalCenter = 'middle'
    labelC.verticalCenter = 'middle'
    labelC.dx = 0
    labelC.dy = 30
    labelC.fontSize = 13
    labelC.fontWeight = '600'
    labelC.fill = am4core.color('#a5b1bd')

    // Add and configure Series
    const pieSeries = chart.series.push(new am4charts.PieSeries())
    pieSeries.marginBottom = 0
    pieSeries.marginTop = 0
    pieSeries.labels.template.disabled = true
    pieSeries.ticks.template.disabled = true
    pieSeries.tooltip!.disabled = true
    pieSeries.strokeWidth = 0

    pieSeries.clickable = false
    pieSeries.hoverable = false

    // pieSeries.properties.scale = 1
    pieSeries.dataFields.value = 'value'
    pieSeries.dataFields.category = 'category'
    pieSeries.dataFields.radiusValue = 'radius'
    pieSeries.slices.template.clickable = false
    pieSeries.colors.list = [am4core.color('#4cc0ec'), am4core.color('#f2f2f2')]

    pieSeries.slices.template.events.on(
      'ready',
      (ev: { target: { dataItem: any } }) => {
        const series = ev.target.dataItem!.component
        // @ts-ignore
        series!.slices.each((item, index) => {
          item.isActive = index === 1 // sets active state
        })
      }
    )

    // hover state
    const hs = pieSeries.slices.template.states.getKey('hover')
    if (hs) {
      hs.properties.scale = 1
      hs.properties.shiftRadius = 0
    }

    // active state
    const as = pieSeries.slices.template.states.getKey('active')
    if (as) {
      as.properties.scale = 1.16
      as.properties.shiftRadius = 0
    }

    return chart
  }
}
