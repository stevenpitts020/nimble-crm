import React from 'react'
import { Typography } from 'antd'

interface IHero {
  children?: React.ReactNode
  className?: string
  title?: string
  subTitle?: string
  rounded?: 'top'
  theme?: 'light' | 'dark'
  style?: React.CSSProperties
}

const generateClassName = (props: IHero) => {
  const className = ['ni-hero']

  if (props.theme) {
    className.push('theme-' + props.theme)
  }

  if (props.rounded) {
    className.push('rounded-' + props.rounded)
  }

  if (props.className) {
    className.push(props.className)
  }

  return className.join(' ')
}

export const Hero: React.FC<IHero> = (props: IHero) => {
  const { Title, Text } = Typography
  return (
    <div className={generateClassName(props)} style={props.style}>
      {props.children}
      {props.title && <Title level={2}>{props.title}</Title>}
      {props.subTitle && <Text>{props.subTitle}</Text>}
    </div>
  )
}
Hero.defaultProps = {
  theme: 'light',
}
