import React from 'react'

import * as am4charts from '@amcharts/amcharts4/charts'
import * as am4core from '@amcharts/amcharts4/core'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'
am4core.useTheme(am4themes_animated)

export interface ICardLineChartData {
  key: string
  label: string
  value: string
}

export interface ICardLineChart {
  data: ICardLineChartData[]
}

export class CardLineChart extends React.Component<ICardLineChart> {
  private chart: am4charts.XYChart | undefined
  private randID: string = Math.round(Math.random() * 9999).toString()

  public componentDidMount() {
    this.chart = this.init()
  }

  public componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose()
    }
  }

  public render() {
    return (
      <div
        id={'CardLineChart' + this.randID}
        style={{ width: '100%', height: '135px' }}
      />
    )
  }

  private init() {
    const chart = am4core.create(
      'CardLineChart' + this.randID,
      am4charts.XYChart
    )

    chart.data = this.props.data

    chart.paddingLeft = 0
    chart.paddingRight = 0

    const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis())
    categoryAxis.tooltip!.disabled = true
    categoryAxis.renderer.ticks.template.disabled = true
    categoryAxis.renderer.grid.template.disabled = true
    categoryAxis.renderer.labels.template.disabled = true
    categoryAxis.dataFields.category = 'key'

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis())
    valueAxis.tooltip!.disabled = true
    valueAxis.renderer.line.disabled = true
    valueAxis.renderer.ticks.template.disabled = true
    valueAxis.renderer.grid.template.disabled = true
    valueAxis.renderer.labels.template.disabled = true
    valueAxis.renderer.line.strokeWidth = 0
    valueAxis.max = 60
    valueAxis.min = 0

    const fillGradient = new am4core.LinearGradient()
    fillGradient.addColor(am4core.color('#FFFFFF'), 0.6)
    fillGradient.addColor(am4core.color('#FFFFFF'), 0.2)
    fillGradient.rotation = 90

    const lineSeries = chart.series.push(new am4charts.LineSeries())
    lineSeries.dataFields.categoryX = 'key'
    lineSeries.dataFields.valueY = 'value'

    lineSeries.fillOpacity = 0.5
    lineSeries.fill = fillGradient

    lineSeries.stroke = am4core.color('#FFFFFF')
    lineSeries.strokeWidth = 0
    lineSeries.tensionX = 0.8
    lineSeries.tensionY = 0.8

    lineSeries.propertyFields.stroke = 'lineColor'
    lineSeries.propertyFields.fill = 'lineColor'

    lineSeries.tooltip!.disabled = true

    return chart
  }
}
