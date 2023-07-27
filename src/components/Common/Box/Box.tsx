import React from 'react'

interface IBox {
  row?: 'flexbox' | 'flex-center' | 'main-sidebar'
  col?: 'main' | 'sidebar' | 'sidebar-slim' | 'flex'
  children?: React.ReactNode
  className?: string
  margin?: 'none'
  marginLeft?: 'none' | 'auto' | 'xl' | 'lg' | 'md' | 'sm' | 'xs'
  marginRight?: 'none' | 'auto' | 'xl' | 'lg' | 'md' | 'sm' | 'xs'
  marginTop?: 'none' | 'xl' | 'lg' | 'md' | 'sm' | 'xs'
  marginBottom?: 'none' | 'xl' | 'lg' | 'md' | 'sm' | 'xs'
  textAlign?: 'left' | 'center' | 'right'
  justify?: 'center' | 'space-around' | 'space-between'
  theme?: 'light'
  size?: 'small'
  shadow?: 'small'
  style?: React.CSSProperties
}

// TODO pass this as props? or build from json
const boxClassName = (props: IBox) => {
  const className = ['ni-box']

  if (props.theme) {
    className.push('theme-' + props.theme)
  }

  if (props.size) {
    className.push('size-' + props.size)
  }

  if (props.shadow) {
    className.push('shadow-' + props.shadow)
  }

  if (props.col) {
    className.push('ni-col-' + props.col)
  }

  if (props.row) {
    className.push('ni-row-' + props.row)
  }

  if (props.marginBottom) {
    className.push('u-margin-bottom-' + props.marginBottom)
  }

  if (props.marginTop) {
    className.push('u-margin-top-' + props.marginTop)
  }

  if (props.marginLeft) {
    className.push('u-margin-left-' + props.marginLeft)
  }

  if (props.marginRight) {
    className.push('u-margin-right-' + props.marginRight)
  }

  if (props.margin) {
    className.push('u-margin-' + props.margin)
  }

  if (props.textAlign) {
    className.push('u-align-' + props.textAlign)
  }

  if (props.justify) {
    className.push('u-justify-' + props.justify)
  }

  if (props.className) {
    className.push(props.className)
  }

  return className.join(' ')
}

export const Box: React.FC<IBox> = (props: IBox) => {
  return (
    <div data-testid="box" className={boxClassName(props)} style={props.style}>
      {props.children}
    </div>
  )
}
