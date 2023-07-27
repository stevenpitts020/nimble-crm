import React from 'react'

import * as am4charts from '@amcharts/amcharts4/charts'
import * as am4core from '@amcharts/amcharts4/core'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'
am4core.useTheme(am4themes_animated)

export interface IAquisitionChartData {
  key: string
  label: string
  plat_plus: number
  gold_plus: number
  silver_plus: number
  plat_minus: number
  gold_minus: number
  silver_minus: number
}

export interface IAquisitionChart {
  data: IAquisitionChartData[]
}

export class AquisitionChart extends React.Component<IAquisitionChart> {
  private chart: am4charts.XYChart | undefined

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
      <div id="AquisitionChartDiv" style={{ width: '100%', height: '320px' }} />
    )
  }

  private init() {
    const chart = am4core.create('AquisitionChartDiv', am4charts.XYChart)

    chart.data = this.props.data
    // last item tag
    // chart.data[chart.data.length - 1].scale = .8
    // chart.data[chart.data.length - 1].color = '#2e9ddc'

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
    valueAxis.max = 100
    valueAxis.min = -50

    const strokeGradient = new am4core.LinearGradient()
    strokeGradient.addColor(am4core.color('#2cbfc8'))
    strokeGradient.addColor(am4core.color('#2e9ddc'))

    function drawLinePair(prefix: string, color: string) {
      const lineSeriesPlus = chart.series.push(new am4charts.LineSeries())
      lineSeriesPlus.dataFields.categoryX = 'key'
      lineSeriesPlus.dataFields.valueY = `${prefix}_plus`
      lineSeriesPlus.stroke = am4core.color(color)
      lineSeriesPlus.strokeWidth = 1.5
      lineSeriesPlus.tensionX = 1
      lineSeriesPlus.tensionY = 1
      lineSeriesPlus.propertyFields.stroke = 'lineColor'
      lineSeriesPlus.propertyFields.fill = 'lineColor'

      const lineSeriesMinus = chart.series.push(new am4charts.LineSeries())
      lineSeriesMinus.dataFields.categoryX = 'key'
      lineSeriesMinus.dataFields.valueY = `${prefix}_minus`
      lineSeriesMinus.stroke = am4core.color(color)
      lineSeriesMinus.strokeWidth = 1.5
      lineSeriesMinus.tensionX = 1
      lineSeriesMinus.tensionY = 1
      lineSeriesMinus.propertyFields.stroke = 'lineColor'
      lineSeriesMinus.propertyFields.fill = 'lineColor'
      lineSeriesMinus.strokeDasharray = '10 8'

      const bulletPlus = lineSeriesPlus.bullets.push(
        new am4charts.CircleBullet()
      )
      bulletPlus.fill = am4core.color('#fff')
      bulletPlus.strokeWidth = 3
      bulletPlus.properties.scale = 0
      bulletPlus.propertyFields.scale = 'scale'
      bulletPlus.propertyFields.fill = 'color'
      bulletPlus.propertyFields.stroke = 'color'

      const bulletPlusHover = bulletPlus.states.create('hover')
      bulletPlusHover.properties.scale = 0.8

      const bulletMinus = lineSeriesMinus.bullets.push(
        new am4charts.CircleBullet()
      )
      bulletMinus.fill = am4core.color('#fff')
      bulletMinus.strokeWidth = 3
      bulletMinus.properties.scale = 0
      bulletMinus.propertyFields.scale = 'scale'
      bulletMinus.propertyFields.fill = 'color'
      bulletMinus.propertyFields.stroke = 'color'

      const bulletMinusHover = bulletMinus.states.create('hover')
      bulletMinusHover.properties.scale = 0.8
    }

    drawLinePair('plat', '#2795d3')
    drawLinePair('gold', '#fdc761')
    drawLinePair('silver', '#a5b1bd')

    const lineSeries = chart.series.getIndex(2)
    if (lineSeries) {
      lineSeries.tooltipHTML = `<div style="min-width: 200px; padding: 12px 12px">
      <small style="font-size:14px; color: #000;"><b>{label}</b></small>
      <table style="font-size:14px; width:130px; color: #999;">
        <tr>
          <td width="90px" style="padding: 3px 12px; padding-left:0;"> <span style="color: #2795d3;font-size:13px; font-weight:bolder">&#79;</span> &nbsp;&nbsp;Platinum</td>
          <td width="90px" style="padding: 3px 12px; color: #62DB85">{plat_plus}</td>
          <td width="90px" style="padding: 3px 12px; color: #F97A7A; text-align:right;">{plat_minus}</td>
        </tr>
        <tr>
          <td width="90px" style="padding: 3px 12px;padding-left:0;"> <span style="color: #fdc761;font-size:13px; font-weight:bolder">&#79;</span> &nbsp;&nbsp;Gold</td>
          <td width="90px" style="padding: 3px 12px; color: #62DB85">{gold_plus}</td>
          <td width="90px" style="padding: 3px 12px; color: #F97A7A; text-align:right;">{gold_minus}</td>
        </tr>
        <tr>
          <td width="90px" style="padding: 3px 12px;padding-left:0;"> <span style="color: #a5b1bd;font-size:13px; font-weight:bolder">&#79;</span> &nbsp;&nbsp;Silver</td>
          <td width="90px" style="padding: 3px 12px; color: #62DB85">{silver_plus}</td>
          <td width="90px" style="padding: 3px 12px; color: #F97A7A; text-align:right;">{silver_minus}</td>
        </tr>
      </table>
      </div>`

      lineSeries.tooltip!.getFillFromObject = false
      lineSeries.tooltip!.autoTextColor = false
      lineSeries.tooltip!.background.fill = am4core.color('#FFFFFF')
      lineSeries.tooltip!.background.cornerRadius = 5
      lineSeries.tooltip!.label.fill = am4core.color('#333333')
      lineSeries.tooltip!.background.stroke = am4core.color(
        'rgba(255,255,255,0)'
      )
      lineSeries.tooltip!.label.textAlign = 'start'
      // lineSeries.tooltip!.background.minWidth = 70
      // lineSeries.tooltip!.label.minWidth = 70
      // lineSeries.tooltip!.background.minHeight = 35
      // lineSeries.tooltip!.label.minHeight = 35
      // lineSeries.tooltip!.label.paddingTop = 10
      // lineSeries.tooltip!.label.paddingBottom = 10
      lineSeries.tooltip!.pointerOrientation = 'vertical'
      lineSeries.tooltip!.dy = -20

      const tooltipShadow = new am4core.DropShadowFilter()
      tooltipShadow.dx = 0
      tooltipShadow.dy = 5
      tooltipShadow.blur = 8
      tooltipShadow.opacity = 0.18
      lineSeries.tooltip!.background.filters.push(tooltipShadow)
    }

    chart.cursor = new am4charts.XYCursor()
    chart.cursor.behavior = 'none'
    chart.cursor.lineX.opacity = 0
    chart.cursor.lineY.opacity = 0

    // chart.scrollbarX = new am4core.Scrollbar()
    // chart.scrollbarX.parent = chart.bottomAxesContainer

    return chart
  }
}
