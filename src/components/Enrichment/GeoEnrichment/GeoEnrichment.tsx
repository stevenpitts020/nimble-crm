/* eslint-disable */
// @ts-nocheck

/**
 * date range (research date picker components one-off days, etc)
 * type of vehicle
 * age of vehicle
 * industry
 * persona (amazon prime member, etc)
 *
 * Name: lock-icon
 * Address: <>
 * Cell Phone: <>
 * Email: <>
 *
 * Filter:
 * Own/Rent Vehicle
 * Own/Rent Home
 * Estimated Net Worth
 * Estimated Income
 * Age Group: Boomer, Mill
 */

import React, { ReactNode, useEffect, useState } from 'react'
import _ from 'lodash'
import { GMap, IMarker } from '../../GMap/GMap'
import { EnvironmentFilled, UnlockOutlined } from '@ant-design/icons'
import {
  Button,
  Col,
  Divider,
  Drawer,
  Popover,
  Row,
  Space,
  Typography,
} from 'antd'
import Select from 'react-select'
import { SingleValue } from 'react-select/dist/declarations/src/types'
import {
  uniqueNamesGenerator,
  Config,
  names,
  animals,
} from 'unique-names-generator'

const first: Config = { dictionaries: [names] }
const street: Config = { dictionaries: [animals] }

const lastInitial = () =>
  _.sample([
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'Y',
  ])
const { Text } = Typography

const K_SIZE = 40

interface ILeadDatum {
  name?: string
  value: ReactNode | ReactNode[]
}

interface ILead {
  info: ILead[]
  filters: ILeadDatum[]
}

const Marker = (props: ILead) => (
  <EnvironmentFilled
    style={{
      position: 'absolute',
      width: K_SIZE,
      height: K_SIZE,
      left: -K_SIZE / 2,
      top: -K_SIZE / 2,
      fontSize: K_SIZE,
    }}
  />
)

const filters = {
  location: [
    {
      value: 'pWoodRiver',
      label: 'Pilot TC (Wood River)',
      center: {
        lat: 40.76014601102798,
        lng: -98.58681896939896,
      },
      num: 500,
    },
    {
      value: 'fjGretna',
      label: 'FlyingJ TC (Gretna)',
      center: {
        lat: 41.09173414226571,
        lng: -96.25468288736948,
      },
      num: 1000,
    },
  ],

  income: [
    {
      label: 'Any',
      value: 'any',
      pct: 1,
    },
    {
      label: '< $25,000',
      value: 'lower',
      pct: 0.3,
    },
    {
      label: '$25,000 - $80,000',
      value: 'middle',
      pct: 0.5,
    },
    {
      label: '$80,000 - $200,000',
      value: 'upper-middle',
      pct: 0.2,
    },
    {
      label: '> $200,000',
      value: 'upper',
      pct: 0.05,
    },
  ],

  industry: [
    {
      label: 'Any',
      value: 'any',
      pct: 1,
    },
    {
      label: 'Telecommunication',
      value: 'tel',
      pct: 0.2,
    },
    {
      label: 'Automobile Manufacturing',
      value: 'auto',
      pct: 0.2,
    },
    {
      label: 'Oil and Gas E&P',
      value: 'oil',
      pct: 0.2,
    },
    {
      label: 'Food Industry',
      value: 'food',
      pct: 0.2,
    },
    {
      label: 'Information Technology',
      value: 'it',
      pct: 0.2,
    },
  ],

  employment_status: [
    {
      label: 'Any',
      value: 'any',
      pct: 1,
    },
    {
      label: 'Employed',
      value: 'work',
      pct: 0.9,
    },
    {
      label: 'Unemployed',
      value: 'nowork',
      pct: 0.1,
    },
    {
      label: 'Self-Employed',
      value: 'self',
      pct: 0.1,
    },
  ],

  vehicle: [
    {
      label: 'Any',
      value: 'any',
      pct: 1,
    },
    {
      label: 'Passenger Car',
      value: 'car',
      pct: 0.7,
    },
    {
      label: 'SUV',
      value: 'suv',
      pct: 0.5,
    },
    {
      label: 'Motorcycle',
      value: 'moto',
      pct: 0.3,
    },
    {
      label: 'Truck',
      value: 'truck',
      pct: 0.6,
    },
    {
      label: 'Bus',
      value: 'bus',
      pct: 0.05,
    },
    {
      label: 'Trailer',
      value: 'trailer',
      pct: 0.2,
    },
  ],
}

export const GeoEnrichment: React.FC = (props: any) => {
  const [markers, setMarkers] = useState<IMarker[]>()

  const [lead, setLead] = useState<ILead>(null)

  const [matches, setMatches] = useState<number>(0)

  const [_filters, _setFilters] = useState(
    _.reduce(
      filters,
      (acc, filter, key) => {
        acc[key] = filters[key][0]
        return acc
      },
      {}
    )
  )

  const [showDetails, setShowDetails] = useState<boolean>(false)

  const [showPurchase, setShowPurchase] = useState<boolean>(false)

  const onCloseDetails = () => setShowDetails(false)

  const onShowPurchase = () => setShowPurchase(true)

  const onClosePurchase = () => setShowPurchase(false)

  const onShowDetails = (marker: IMarker) => {
    setLead(marker?.children?.props)
    setShowDetails(true)
  }

  const doFilter = () => {
    let num = Math.ceil(
      _filters.location.num *
        _.reduce(_filters, (pct, f) => (!f.pct ? pct : pct * f.pct), 1)
    )
    num = Math.round(num * _.random(1, 1.08))

    setMatches(num)

    return _.range(0, num).map(idx => {
      const name = uniqueNamesGenerator(first)

      return {
        id: `device_${idx}`,
        lat:
          _filters.location.center.lat +
          _.random(0.0, 0.0006) * (Math.random() > 0.5 ? -1 : 1),
        lng:
          _filters.location.center.lng +
          _.random(0.0, 0.0006) * (Math.random() > 0.5 ? -1 : 1),
        component: (
          <Marker
            info={[
              { name: 'Name', value: `${name} ${lastInitial()}` },
              {
                name: 'Mailing Address',
                value: `${_.repeat('x', _.random(4, 7))} ${_.sample(
                  'N',
                  'S',
                  'E',
                  'W'
                )} ${_.capitalize(uniqueNamesGenerator(street))} ${_.sample([
                  'St',
                  'Ave',
                  'Rd',
                  'Ln',
                  'Pl',
                  'Pkwy',
                ])}`,
              },
              { name: 'Proximity To Home', value: `${_.random(2, 40)} Miles` },
              {
                name: 'Email Address',
                value:
                  name.toLowerCase() +
                  _.sample(['-', '_', '']) +
                  _.random(2, 99) +
                  '@...',
              },
              { name: 'Cell Phone', value: `xxx-xxx-${_.random(1000, 9999)}` },
              { name: 'Amazon Prime', value: _.sample(['Yes', 'No']) },
              { name: 'Costco', value: _.sample(['Yes', 'No']) },
              { name: `Sam's Club`, value: _.sample(['Yes', 'No']) },
            ]}
            filters={_.reduce(
              filters,
              (acc, filterList, key) => {
                if (key === 'location') return acc

                const sub = _.sample(filterList.slice(0))

                acc.push({
                  name: _.startCase(key),
                  value: sub.label,
                })

                return acc
              },
              []
            )}
          />
        ),
      }
    })
  }

  useEffect(() => setMarkers(doFilter()), [_filters])

  const onFilterChange = filter => (selected: SingleValue) => {
    const clone = _.cloneDeep(_filters)
    clone[filter] = _.find(filters[filter], { value: selected.value })
    _setFilters(clone)
  }

  return (
    <>
      <Row gutter={[20, 20]}>
        <Col span={4}>
          <Divider orientation="left">Total: {matches}</Divider>
          {_.map(filters, (filter, key) => (
            <p>
              <Text>{_.startCase(key)}</Text>
              <Select
                key={`${key}-select`}
                options={filters[key]}
                defaultValue={_filters[key]}
                onChange={onFilterChange(key)}
              />
            </p>
          ))}
        </Col>
        <Col span={20}>
          <GMap
            markerSize={K_SIZE}
            defaultZoom={19}
            height="70vh"
            center={_filters.location.center}
            defaultCenter={filters.location[0].center}
            markers={markers}
            onClickMarker={onShowDetails}
          />
          <Drawer
            title="Personal Info"
            width={520}
            closable={false}
            onClose={onCloseDetails}
            visible={showDetails}
            extra={
              <Space>
                <Button onClick={onShowPurchase} type="default">
                  <UnlockOutlined /> Unlock
                </Button>
              </Space>
            }
          >
            <div className="personal-info">
              {lead &&
                _.map(lead.info, datum => (
                  <Row
                    key={`${lead.id}-${_.snakeCase(datum.name)}`}
                    gutter={[20, 20]}
                  >
                    <Col span={11} style={{ textAlign: 'right' }}>
                      <Text strong={true}>{datum.name}</Text>:
                    </Col>
                    <Col span={1} />
                    <Col span={12} style={{ textAlign: 'left' }}>
                      {datum.value}
                    </Col>
                  </Row>
                ))}
              {lead &&
                _.map(lead.filters, datum => (
                  <Row
                    key={`${lead.id}-${_.snakeCase(datum.name)}`}
                    gutter={[20, 20]}
                  >
                    <Col span={11} style={{ textAlign: 'right' }}>
                      <Text strong={true}>{datum.name}</Text>:
                    </Col>
                    <Col span={1} />
                    <Col span={12} style={{ textAlign: 'left' }}>
                      {datum.value}
                    </Col>
                  </Row>
                ))}
            </div>
            <Drawer
              title="Purchase"
              width={320}
              closable={false}
              onClose={onClosePurchase}
              visible={showPurchase}
            >
              ... ways to purchase or otherwise unlock data ...
            </Drawer>
          </Drawer>
        </Col>
      </Row>
    </>
  )
}
