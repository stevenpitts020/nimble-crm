import React from 'react'

export interface IMiniPieChart {
  value: number | string
}

export class MiniPieChart extends React.Component<IMiniPieChart> {
  public render() {
    return (
      <div
        style={{
          display: 'inline-block',
          height: '30px',
          margin: '0px 15px',
          verticalAlign: 'bottom',
          width: '30px',
        }}
      >
        <svg height="100%" width="30px" viewBox="0 0 20 20">
          <circle r="10" cx="10" cy="10" fill="#EEE" />
          <circle
            r="5"
            cx="10"
            cy="10"
            fill="transparent"
            stroke="#56ccf2"
            strokeWidth="10"
            strokeDasharray={`calc(${this.props.value} * 31.4 / 100) 31.4`}
            transform="rotate(-90) translate(-20)"
          />
        </svg>
      </div>
    )
  }
}
