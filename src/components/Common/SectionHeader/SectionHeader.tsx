import React from 'react'
import { Box } from '../Box/Box'
import { SectionTitle } from './SectionTitle'

interface ISectionHeaderProps {
  title?: string
  afterTitle?: object
  subtitle?: string
  rightComponent?: object
  style?: React.CSSProperties
}

export const SectionHeader: React.FC<ISectionHeaderProps> = props => (
  <Box className="ni-section-header" style={props.style}>
    {props.title && (
      <SectionTitle after={props.afterTitle} subtitle={props.subtitle}>
        {props.title}
      </SectionTitle>
    )}

    {props.children}

    {props.rightComponent && (
      <Box marginLeft="auto">{props.rightComponent}</Box>
    )}
  </Box>
)
