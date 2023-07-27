/* eslint-disable */
// @ts-nocheck

import React, { ReactNode, useEffect, useState } from 'react'
import _ from 'lodash'
import GoogleMapReact, { Coords } from 'google-map-react'
import { Property } from 'csstype'

export interface IMarker extends Coords {
  id: string
  text: string
  component: React.ReactNode
}

interface IGMapProps {
  markerSize: number
  zoom?: number
  defaultZoom?: number
  center?: Coords
  defaultCenter?: Coords
  height?: Property.Height
  width?: Property.Width
  markers?: IMarker[]
  onClickMarker?: (marker: IMarker) => void
}

const defaults = {
  dims: {
    height: '100vh',
    width: '100%',
  },

  center: {
    lat: 33.4941704,
    lng: -111.9260519,
  },

  zoom: 13,
}

const Marker = (
  props: Coords & {
    id: string
    hover: boolean
    children: ReactNode
  }
) => {
  const [hover, setHover] = useState<boolean>(false)

  useEffect(() => setHover(props.hover), [props.hover])

  return (
    <div className={`maps-marker ${hover ? 'maps-hover' : ''}`}>
      {props.children}
    </div>
  )
}

export const GMap: React.FC<IGMapProps> = (props: IGMapProps) => {
  const [dims, setDims] = useState<{
    height: Property.Height
    width: Property.Width
  }>({
    width: props.width || defaults.dims.width,
    height: props.height || defaults.dims.height,
  })

  const defaultZoom = _.clone(props.defaultZoom || defaults.zoom)

  const [zoom, setZoom] = useState<number>(defaultZoom)

  const defaultCenter = _.cloneDeep(props.defaultCenter || defaults.center)

  const [center, setCenter] = useState<Coords>(defaultCenter)

  const [markers, setMarkers] = useState<IMarker[]>(props.markers || [])

  const [hoverKey, setHoverKey] = useState<string>()

  useEffect(() => setZoom(props.zoom), [props.zoom])

  useEffect(() => setCenter(props.center), [props.center])

  useEffect(() => {
    setDims({
      width: props.width || defaults.dims.width,
      height: props.height || defaults.dims.height,
    })
  }, [props.height, props.width])

  useEffect(() => setMarkers(props.markers || []), [props.markers])

  const _onBoundsChange = (_center: Coords, _zoom: number) => {
    setCenter(_center)
    setZoom(_zoom)
  }

  const _onChildClick = (key: string, marker: any) => {
    setCenter({ lat: marker.lat, lng: marker.lng })
    setZoom(20)
    if (props.onClickMarker) props.onClickMarker(marker)
  }

  const _onChildMouseEnter = (key: string, marker: any) => {
    setHoverKey(key)
  }

  const _onChildMouseLeave = (key: string, marker: any) => {
    setHoverKey(null)
  }

  return (
    // Important! Always set the container height explicitly
    <div className="gmap" style={{ height: dims.height, width: dims.width }}>
      <GoogleMapReact
        // bootstrapURLKeys={{ key: '' }}
        zoom={zoom}
        defaultZoom={defaultZoom}
        center={center}
        defaultCenter={defaultCenter}
        hoverDistance={props.markerSize / 2}
        onBoundsChange={_onBoundsChange}
        onChildClick={_onChildClick}
        onChildMouseEnter={_onChildMouseEnter}
        onChildMouseLeave={_onChildMouseLeave}
      >
        {markers.map(marker => (
          <Marker {...marker} key={marker.id} hover={hoverKey === marker.id}>
            {marker.component}
          </Marker>
        ))}
      </GoogleMapReact>
    </div>
  )
}
