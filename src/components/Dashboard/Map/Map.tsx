import React, { ReactElement } from 'react'
import { Map as LeafletMap, Marker, TileLayer, Popup } from 'react-leaflet'

import { divIcon } from 'leaflet'

export interface IMap {
  data: object[]
  options?: object
}

export class Map extends React.Component<IMap> {
  public createIcon(color: string) {
    return divIcon({
      className: 'ni-map-label ',
      html: `<svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="8" cy="8" r="8" fill="${color}" />
    </svg>`,
    })
  }

  public getMarkers(): ReactElement[] {
    return this.props.data.map((row: any) => {
      return (
        <Marker
          key={row.key}
          position={[row.lat, row.lon]}
          icon={this.createIcon(row.color)}
        >
          <Popup>
            <div>{row.Branch}</div>
            <p>ROE: {row.ROE}</p>
            <p>Rate: {row.Rate}</p>
            <p>Volume: {row.Volume}</p>
          </Popup>
        </Marker>
      )
    })
  }

  public render() {
    return (
      <div className="ni-map">
        <LeafletMap
          center={[40, -76]}
          zoom={6}
          maxZoom={10}
          attributionControl={true}
          zoomControl={true}
          doubleClickZoom={true}
          scrollWheelZoom={true}
          dragging={true}
          animate={true}
          easeLinearity={0.35}
        >
          <TileLayer
            attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a>"
            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          />
          {this.getMarkers()}
        </LeafletMap>
      </div>
    )
  }
}
