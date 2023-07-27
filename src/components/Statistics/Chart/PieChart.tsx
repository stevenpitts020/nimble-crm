import React from 'react'

import * as am4charts from '@amcharts/amcharts4/charts'
import * as am4core from '@amcharts/amcharts4/core'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'
am4core.useTheme(am4themes_animated)

export interface IPieChartData {
  category: string
  value: string
}

export interface IPieChart {
  data: IPieChartData[]
}

export class PieChart extends React.Component<IPieChart> {
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
    return <div id="PieChartDiv" style={{ width: '100%', height: '240px' }} />
  }

  private init() {
    const chart = am4core.create('PieChartDiv', am4charts.PieChart)

    chart.data = this.props.data

    // Add label
    chart.innerRadius = am4core.percent(45)
    // let label = chart.seriesContainer.createChild(am4core.Label);
    // label.text = "1995";
    // label.horizontalCenter = "middle";
    // label.verticalCenter = "middle";
    // label.fontSize = 50;

    // Add and configure Series
    const pieSeries = chart.series.push(new am4charts.PieSeries())
    pieSeries.labels.template.disabled = true
    pieSeries.ticks.template.disabled = true
    pieSeries.dataFields.value = 'value'
    pieSeries.dataFields.category = 'category'
    pieSeries.colors.list = [
      am4core.color('#2E9DDC'),
      am4core.color('#56CCF2'),
      am4core.color('#C2CAE8'),
      am4core.color('#53599A'),
      am4core.color('#7D70BA'),
    ]

    // hover state
    const hs = pieSeries.slices.template.states.getKey('hover')
    if (hs) {
      hs.properties.scale = 1.1
      hs.properties.shiftRadius = 0.1
    }

    // active state
    const as = pieSeries.slices.template.states.getKey('active')
    if (as) {
      as.properties.scale = 1
      as.properties.shiftRadius = 0.1
    }

    return chart
  }
}
