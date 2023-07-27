import React from 'react'

interface IDivider {
  children?: React.ReactNode
  className?: string
  direction?: 'vertical' | 'horizontal'
  spacing?: 'none' | 'xxxl' | 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs' | 'xxs'
  style?: React.CSSProperties
  size?: '2' | '3'
}

const composeStackClassName = (props: IDivider) => {
  const className = ['ni-divider']

  if (props.direction) {
    className.push('direction-' + props.direction)
  }
  if (props.spacing) {
    className.push('spacing-' + props.spacing)
  }
  if (props.size) {
    className.push('size-' + props.size)
  }
  if (props.className) {
    className.push(props.className)
  }
  return className.join(' ')
}

export const Divider: React.FC<IDivider> = (props: IDivider) => {
  return (
    <div
      data-testid="divider"
      className={composeStackClassName(props)}
      style={props.style}
    >
      {props.children}
    </div>
  )
}
