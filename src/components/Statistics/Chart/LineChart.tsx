import React from 'react'

import * as am4charts from '@amcharts/amcharts4/charts'
import * as am4core from '@amcharts/amcharts4/core'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'
import { uuid } from '../../../services/FakerService'

am4core.useTheme(am4themes_animated)

export interface ILineChartData {
  key: string
  label: string
  value: string
}

export interface ILineChart {
  data: ILineChartData[]
  tooltipText?: string
}

export class LineChart extends React.Component<ILineChart> {
  private chart: am4charts.XYChart | undefined
  private id: string = 'LineChartDiv' + uuid()

  public componentDidMount() {
    this.chart = this.init()
  }

  public componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose()
    }
  }

  public render() {
    return <div id={this.id} style={{ width: '100%', height: '320px' }} />
  }

  private init() {
    const chart = am4core.create(this.id, am4charts.XYChart)

    chart.data = this.props.data
    // last item tag
    chart.data[chart.data.length - 1].scale = 0.8
    chart.data[chart.data.length - 1].color = '#2e9ddc'

    chart.paddingLeft = 0
    chart.paddingRight = 0

    const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis())
    categoryAxis.tooltip!.disabled = true
    categoryAxis.renderer.ticks.template.disabled = true
    categoryAxis.renderer.line.opacity = 0.3
    categoryAxis.renderer.grid.template.location = 0
    categoryAxis.renderer.grid.template.disabled = false
    categoryAxis.renderer.grid.template.strokeOpacity = 0.05
    categoryAxis.renderer.grid.template.stroke = am4core.color('#666')
    categoryAxis.renderer.grid.template.strokeWidth = 1

    categoryAxis.renderer.minGridDistance = 50
    categoryAxis.dataFields.category = 'key'
    categoryAxis.startLocation = 0.4
    categoryAxis.endLocation = 0.6
    categoryAxis.renderer.labels.template.fill = am4core.color('#666')
    categoryAxis.renderer.labels.template.opacity = 0.6
    categoryAxis.renderer.labels.template.fontSize = 8
    categoryAxis.renderer.labels.template.dx = -35

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis())
    valueAxis.tooltip!.disabled = true
    valueAxis.renderer.line.opacity = 0
    valueAxis.renderer.ticks.template.disabled = true
    valueAxis.renderer.grid.template.disabled = true
    valueAxis.renderer.grid.template.strokeOpacity = 0.05
    valueAxis.renderer.labels.template.fill = am4core.color('#666')
    valueAxis.renderer.labels.template.opacity = 0.6
    valueAxis.renderer.labels.template.fontSize = 8
    valueAxis.renderer.line.strokeWidth = 0

    const maxvalue = chart.data.reduce((last, current) => {
      return current.value > last ? current.value : last
    }, 0) as number

    valueAxis.max = maxvalue * 1.3

    valueAxis.min = 0

    const strokeGradient = new am4core.LinearGradient()
    strokeGradient.addColor(am4core.color('#2cbfc8'))
    strokeGradient.addColor(am4core.color('#2e9ddc'))

    const fillGradient = new am4core.LinearGradient()
    fillGradient.addColor(am4core.color('#2e9ddc'), 0.3)
    fillGradient.addColor(am4core.color('#2e9ddc'), 0)
    fillGradient.rotation = 90

    // #2cbfc8
    // #2e9ddc
    const lineSeries = chart.series.push(new am4charts.LineSeries())
    lineSeries.dataFields.categoryX = 'key'
    lineSeries.dataFields.valueY = 'value'

    lineSeries.fillOpacity = 0.5
    lineSeries.fill = fillGradient

    lineSeries.stroke = strokeGradient
    lineSeries.strokeWidth = 2.5
    lineSeries.tensionX = 0.8
    lineSeries.tensionY = 0.8

    lineSeries.propertyFields.stroke = 'lineColor'
    lineSeries.propertyFields.fill = 'lineColor'

    lineSeries.tooltipText =
      this.props.tooltipText ||
      '[bold font-size: 20px;]$ {valueY.value}k[/]\n[font-size: 12px; #999]{label}[/]'
    lineSeries.tooltip!.getFillFromObject = false
    lineSeries.tooltip!.autoTextColor = false
    lineSeries.tooltip!.background.fill = am4core.color('#FFFFFF')
    lineSeries.tooltip!.background.cornerRadius = 5
    lineSeries.tooltip!.label.fill = am4core.color('#333333')
    lineSeries.tooltip!.background.stroke = am4core.color('rgba(255,255,255,0)')
    lineSeries.tooltip!.label.textAlign = 'middle'
    lineSeries.tooltip!.background.minWidth = 70
    lineSeries.tooltip!.label.minWidth = 70
    lineSeries.tooltip!.background.minHeight = 35
    lineSeries.tooltip!.label.minHeight = 35
    lineSeries.tooltip!.label.paddingTop = 10
    lineSeries.tooltip!.label.paddingBottom = 10
    lineSeries.tooltip!.pointerOrientation = 'vertical'
    lineSeries.tooltip!.dy = -10

    const tooltipShadow = new am4core.DropShadowFilter()
    tooltipShadow.dx = 0
    tooltipShadow.dy = 5
    tooltipShadow.blur = 8
    tooltipShadow.opacity = 0.18
    lineSeries.tooltip!.background.filters.push(tooltipShadow)

    const shadow = new am4core.DropShadowFilter()
    shadow.dx = 0
    shadow.dy = 15
    shadow.opacity = 0.1
    lineSeries.filters.push(shadow)

    const bullet = lineSeries.bullets.push(new am4charts.CircleBullet())
    bullet.fill = am4core.color('#fff')
    bullet.strokeWidth = 3
    bullet.properties.scale = 0
    bullet.propertyFields.scale = 'scale'
    bullet.propertyFields.fill = 'color'
    bullet.propertyFields.stroke = 'color'

    const bullethover = bullet.states.create('hover')
    bullethover.properties.scale = 0.8

    chart.cursor = new am4charts.XYCursor()
    chart.cursor.behavior = 'none'
    chart.cursor.lineX.opacity = 0
    chart.cursor.lineY.opacity = 0

    // chart.scrollbarX = new am4core.Scrollbar()
    // chart.scrollbarX.parent = chart.bottomAxesContainer

    return chart
  }
}
