import React from 'react'

interface IStack {
  children?: React.ReactNode
  className?: string
  direction?: 'vertical' | 'horizontal'
  spacing?: 'none' | 'xxxl' | 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs' | 'xxs'
  verticalAlign?: 'top' | 'center' | 'bottom'
  horizontalAlign?: 'left' | 'center' | 'right'
  textAlign?: 'left' | 'center' | 'right'
  collapse?: 'sm' | 'md'
  style?: React.CSSProperties
}

// TODO pass this as props? or build from json
const composeStackClassName = (props: IStack) => {
  const className = ['ni-stack']

  if (props.direction) {
    className.push('direction-' + props.direction)
  }
  if (props.collapse) {
    className.push('collapse-' + props.collapse)
  }
  if (props.spacing) {
    className.push('spacing-' + props.spacing)
  }
  if (props.verticalAlign) {
    className.push('u-vertical-align-' + props.verticalAlign)
  }
  if (props.horizontalAlign) {
    className.push('u-horizontal-align-' + props.horizontalAlign)
  }
  if (props.textAlign) {
    className.push('u-align-' + props.textAlign)
  }
  if (props.className) {
    className.push(props.className)
  }
  return className.join(' ')
}

export const Stack: React.FC<IStack> = (props: IStack) => {
  return (
    <div
      data-testid="stack"
      className={composeStackClassName(props)}
      style={props.style}
    >
      {props.children}
    </div>
  )
}
