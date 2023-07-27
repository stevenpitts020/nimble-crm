/* eslint-disable */
// @ts-nocheck

import _ from 'lodash'
import React, {
  CSSProperties,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import Config from '../../../services/Config'
import DataService from '../../../services/DataService'
import {
  Button,
  Col,
  Collapse,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Spin,
  List,
  Avatar,
  TreeSelect,
  Slider,
  Space,
  Table,
  Tabs,
} from 'antd'

const { TabPane } = Tabs
import {
  DeleteOutlined,
  FileSearchOutlined,
  ImportOutlined,
  SaveOutlined,
  SearchOutlined,
} from '@ant-design/icons'
import ReactJson from 'react-json-view'
import { ISearchData, SaveSearchForm } from './SaveSearchForm'
import { AlertMessage } from '../../Common/AlertMessage/AlertMessage'
import { ModalWindow } from '../../Common/ModalWindow/ModalWindow'
import { AlertContext } from '../../../store/AlertProvider'
import { log } from '../../../services'
import { ProfileContext } from '../../../store/ProfileProvider'
import { AddressAutofill } from '@mapbox/search-js-react'

// <ImportMapboxGl>
// !important - do not modify unless you KNOW what you're doing
// @see: https://github.com/mapbox/mapbox-gl-js/issues/10173
// import mapboxgl from 'mapbox-gl'
// import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl'
// import 'mapbox-gl/dist/mapbox-gl.css'
// // eslint-disable-next-line import/no-webpack-loader-syntax
// mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default
// </ ImportMapboxGl>

// const Map = ReactMapboxGl({
//   accessToken: Config.mapboxAccessToken,
//   scrollZoom: false
// });

const { Panel } = Collapse

const NONE = 'none'

interface IOpt {
  field: string
  schema: ISchema
}

interface ISchema {
  type: string
  items?: string[]
  description?: string
}

interface IFilter {
  key: string
  op:
    | 'near'
    | 'is'
    | 'is_not'
    | 'is_like'
    | 'not_like'
    | 'start'
    | 'not_starts'
    | 'exists'
    | 'not_exists'
  input: any
}

const EMPTY_FILTER = { key: '', op: '', input: '', meta: {} } as IFilter

const emptyFilter = () => _.clone(EMPTY_FILTER)

const QUERY_BUILDERS = {
  near: (filter: IFilter) => {
    if (!_.isPlainObject(filter.input)) return QUERY_BUILDERS.exists(filter)
    const miles = _.get(filter, ['input', 'distance'])
    const lat = _.get(filter, ['input', 'place', 'lat'])
    const lon = _.get(filter, ['input', 'place', 'lon'])

    if (!miles) return null
    if (!lat) return null
    if (!lon) return null

    const geo_distance = { distance: `${miles}mi` }
    geo_distance[filter.key] = { lat: _.toNumber(lat), lon: _.toNumber(lon) }

    return { rel: 'filter', rule: { geo_distance } }
  },

  is: (filter: IFilter) => {
    if (filter.input === '') return QUERY_BUILDERS.exists(filter)

    const match_phrase = {}
    match_phrase[filter.key] = filter.input

    return { rel: 'must', rule: { match_phrase } }
  },

  is_not: (filter: IFilter) => {
    return _.merge(QUERY_BUILDERS.is(filter), { rel: 'must_not' })
  },

  is_like: (filter: IFilter) => {
    if (filter.input === '') return QUERY_BUILDERS.exists(filter)

    const match = {}
    match[filter.key] = {
      query: filter.input,
      fuzziness: 2,
      fuzzy_transpositions: true,
    }

    return { rel: 'must', rule: { match } }
  },

  not_like: (filter: IFilter) => {
    return _.merge(QUERY_BUILDERS.is_like(filter), { rel: 'must_not' })
  },

  starts: (filter: IFilter) => {
    if (filter.input === '') return QUERY_BUILDERS.exists(filter)

    const match_phrase_prefix = {}
    match_phrase_prefix[filter.key] = filter.input

    return { rel: 'must', rule: { match_phrase_prefix } }
  },

  not_starts: (filter: IFilter) => {
    return _.merge(QUERY_BUILDERS.starts(filter), { rel: 'must_not' })
  },

  exists: (filter: IFilter) => {
    return { rel: 'must', rule: { exists: { field: filter.key } } }
  },

  not_exists: (filter: IFilter) => {
    return _.merge(QUERY_BUILDERS.exists(filter), { rel: 'must_not' })
  },

  range: (filter: IFilter) => {
    const range = {}
    range[filter.key] = {}
    range[filter.key][filter.op] = _.toNumber(filter.input)
    return { rel: 'must', rule: { range } }
  },

  gt: (filter: IFilter) => {
    return QUERY_BUILDERS.range(_.merge(filter, { op: 'gt' }))
  },

  gte: (filter: IFilter) => {
    return QUERY_BUILDERS.range(_.merge(filter, { op: 'gte' }))
  },

  lt: (filter: IFilter) => {
    return QUERY_BUILDERS.range(_.merge(filter, { op: 'lt' }))
  },

  lte: (filter: IFilter) => {
    return QUERY_BUILDERS.range(_.merge(filter, { op: 'lte' }))
  },
}

function tree(schema) {
  if (!schema || !schema.properties) return []
  return _.map(schema.properties, (child, key) => _tree(null, key, child))
}

function _tree(parent, key, schema) {
  if (!schema) return null

  const term = {
    title: schema.title || _.startCase(key),
    value: parent ? `${parent.value}.${key}` : key,
  }

  if (!schema.properties)
    return {
      ...term,
      selectable: true,
      opt: {
        field: term.value,
        schema: _.isEmpty(schema) ? { type: 'string' } : schema,
      },
    } // leaf

  return {
    ...term,
    selectable: false,
    children: _.map(schema.properties, (child, childKey) =>
      _tree(term, childKey, child)
    ),
  }
}

function schemaKeys(_schema) {
  return _.map(_schemaKeys(null, _schema), (schema, field) => {
    return { field, schema } as IOpt
  })
}

function _schemaKeys(parent, schema) {
  if (!schema || !schema.properties) {
    // there is no schema for this key, or it contains no children
    if (!parent) return {}

    const pair = {}
    pair[parent] = schema || { type: 'string' }
    return pair
  }

  let keys = {}

  _.forEach(schema.properties, (v, k) => {
    const _parent = parent ? parent + '.' + k : k
    keys = _.merge(keys, _schemaKeys(_parent, v))
  })

  return keys
}

interface InputParams {
  style?: CSSProperties
  placeholder?: string
  items?: string[]
}

interface IOperation {
  labelRenderer: (opt: IOpt, filter?: IFilter) => ReactNode
  inputRenderer?: (index: number, opt: IOpt, filter?: IFilter) => ReactNode
}

export const PeopleSearch: React.FC = (props: any) => {
  const { profileState } = useContext(ProfileContext)

  const [meta, setMeta] = useState<any>({})
  const [query, setQuery] = useState<any>({})
  const [people, setPeople] = useState<[]>([])
  const [saving, setSaving] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [deleting, setDeleting] = useState<boolean>(false)
  const [searching, setSearching] = useState<boolean>(false)
  const [taxonomy, setTaxonomy] = useState<IOpt[]>([])
  const [options, setOptions] = useState<IOpt[]>([])
  const [activeSearch, setActiveSearch] = useState<string>(NONE)
  const [searches, setSearches] = useState<any[]>([])
  const [filters, setFilters] = useState<IFilter[]>([emptyFilter()])
  const [saveOpen, setSaveOpen] = useState<boolean>(false)
  const [geoMiles, setGeoMiles] = useState<number>(30)
  const [geoDisplay, setGeoDisplay] = useState<string>()
  const [selectedPerson, setSelectedPerson] = useState<any>()

  const [form] = Form.useForm()

  const { showAlert } = useContext(AlertContext)

  const initialize = async (cb: () => void | null | undefined) => {
    setLoading(true)

    try {
      const [person, _searches] = await Promise.all([
        DataService.personSchema(),
        DataService.searchList(),
      ])

      setSearches(_searches)
      setTaxonomy(tree(person))
      setOptions(schemaKeys(person))
    } catch (err) {
      log.info(err.response, 'PeopleSearch.personSchema')

      showAlert({
        message:
          err?.response?.data?.message ||
          err?.response.statusText ||
          err.message,
        type: 'error',
        timeout: 10000,
      })
    }

    if (cb) cb()
    setLoading(false)
  }

  useEffect(() => {
    initialize()
  }, [])

  const hideSaveForm = () => {
    setSaveOpen(false)
    form.resetFields()
  }

  const showSaveForm = () => {
    updateQuery()
    setSaveOpen(true)
  }

  const saveSearch = async (data: ISearchData) => {
    log.info(data, 'saveSearch')

    setSaving(true)

    try {
      const saved = data.id
        ? await DataService.searchUpdate(data)
        : await DataService.searchCreate(data)

      log.info(saved, 'PeopleSearch.save')

      hideSaveForm()
      setTimeout(
        () =>
          showAlert({
            message: `Successfully Saved "${saved.name}" (${saved.id})`,
            type: 'success',
            timeout: 10000,
          }),
        500
      )
    } catch (err) {
      log.info(err.response, 'PeopleSearch.save')

      showAlert({
        message:
          err?.response?.data?.message ||
          err?.response.statusText ||
          err.message,
        type: 'error',
        timeout: 10000,
      })
    }

    initialize(() => setSaving(false))
  }

  const onSearch = () => {
    updateQuery()
    setSearching(true)
    setPeople([])
  }

  useEffect(() => {
    const _search = async () => {
      try {
        const _people = await DataService.peopleSearch(query)
        setMeta(_.omit(_people, 'hits'))
        setPeople(_.get(_people, 'hits', []))
      } catch (err) {
        log.info(err.response, 'PeopleSearch.search')

        showAlert({
          message:
            err?.response?.data?.message ||
            err?.response.statusText ||
            err.message,
          type: 'error',
          timeout: 10000,
        })
      }

      setSearching(false)
    }

    if (searching && !_.isEmpty(query)) _search()
  }, [query, searching])

  const onFilterKeyChange = index => _key => {
    const _filters = _.cloneDeep(filters)
    _filters[index].key = _key
    setFilters(_filters)
  }

  const onFilterOpChange = index => _op => {
    const _filters = _.cloneDeep(filters)
    _filters[index].op = _op
    setFilters(_filters)
  }

  const onFilterInputChange = index => event => {
    const _input =
      _.isString(event) || _.isNumber(event) ? event : event.target?.value || ''
    const _filters = _.cloneDeep(filters)
    _filters[index].input = _.isString(_input) ? _.trim(_input) : _input
    setFilters(_filters)
  }

  const addFilter = () => setFilters(_.concat(filters, [emptyFilter()]))

  const removeFilter = index => () => {
    const _filters = _.cloneDeep(filters)
    _filters.splice(index, 1)
    setFilters(_filters)
  }

  const updateQuery = () => {
    const bool = _.reduce(
      filters,
      (memo, filter) => {
        const q = QUERY_BUILDERS[filter.op](filter)
        if (q.rel === 'filter') {
          memo.filter = memo.filter || {}
          memo.filter = _.merge(memo.filter, q.rule)
          return memo
        }

        memo[q.rel] = memo[q.rel] || []
        memo[q.rel].push(q.rule)
        return memo
      },
      {}
    )

    setQuery({ query: { bool } })
  }

  const onSearchLoad = search => () => {
    setLoading(true)
    setActiveSearch(search.id)
    setTimeout(() => {
      setPeople([])
      setFilters(search.filters)
      setLoading(false)
      setActiveSearch(NONE)
    }, 500)
  }

  const onSearchDelete = search => async () => {
    setDeleting(true)
    setActiveSearch(search.id)

    try {
      await DataService.searchDelete(search.id)
    } catch (err) {
      log.info(err.response, 'PeopleSearch.delete')

      showAlert({
        message:
          err?.response?.data?.message ||
          err?.response.statusText ||
          err.message,
        type: 'error',
        timeout: 10000,
      })
    }

    initialize(() => {
      setActiveSearch(NONE)
      setDeleting(false)
    })
  }

  const stringInputRenderer = (params?: InputParams) => (
    index: number,
    _opt: IOpt,
    filter: IFilter
  ) => (
    <Input
      disabled={loading}
      style={params?.style || { width: '50%' }}
      onBlur={onFilterInputChange(index)}
      defaultValue={filter.input}
      type={params?.type}
      placeholder={params?.placeholder || ''}
    />
  )

  const enumInputRenderer = (params?: InputParams) => (
    index: number,
    _opt: IOpt,
    filter: IFilter
  ) => (
    <Select
      disabled={loading}
      style={params?.style || { width: '50%' }}
      onChange={onFilterInputChange(index)}
      defaultValue={filter.input}
      options={(_opt?.schema?.items || params?.items || []).map(value => {
        return { label: value, value }
      })}
    />
  )

  const labelRenderer = (defaultLabel: string) => (
    _opt: IOpt,
    filter: IFilter
  ) => _opt?.schema?.description || defaultLabel

  const OPERATIONS = {
    _: {
      exists: {
        labelRenderer: labelRenderer('exists'),
      },

      not_exists: {
        labelRenderer: labelRenderer('does not exist'),
      },
    },

    geo_point: {
      near: {
        labelRenderer: labelRenderer('is within'),
        inputRenderer: (index: number, _opt: IOpt, filter: IFilter) => (
          <Row>
            <Col span={6}>
              <Slider
                disabled={loading}
                tooltip={{ open: true }}
                min={0}
                max={500}
                defaultValue={filter?.input?.distance || geoMiles || 30}
                onAfterChange={distance => {
                  filter.input = {
                    ...(_.isPlainObject(filter.input) ? filter.input : {}),
                    distance,
                  }
                  setGeoMiles(distance)
                }}
              />
            </Col>
            <Col span={2}>
              <Space
                direction="horizontal"
                align="center"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  verticalAlign: 'middle',
                }}
              >
                <span>
                  {filter?.input?.distance || geoMiles || 30} miles of
                </span>
              </Space>
            </Col>
            <Col span={15}>
              <AddressAutofill
                options={{ language: 'en', country: 'US' }}
                accessToken={Config.mapboxAccessToken}
                onRetrieve={geo => {
                  const place = _.get(geo, ['features', '0'])
                  if (!place) return
                  const placeName = _.get(place, ['properties', 'place_name'])
                  const name = placeName
                    ? placeName.replace(', United States', '')
                    : ''
                  const [lon, lat] = _.get(place, ['geometry', 'coordinates'])

                  filter.input = {
                    ...(_.isPlainObject(filter.input) ? filter.input : {}),
                    place: { name, lat, lon },
                  }
                  setGeoDisplay(name)
                }}
              >
                <Input
                  disabled={loading}
                  autoComplete="address-line1"
                  placeholder="place"
                  type="text"
                  defaultValue={filter?.input?.place?.name || geoDisplay}
                />
              </AddressAutofill>
            </Col>
          </Row>
        ),
      },
    },

    string: {
      is: {
        labelRenderer: labelRenderer('is'),
        inputRenderer: stringInputRenderer(),
      },

      is_not: {
        labelRenderer: labelRenderer('is not'),
        inputRenderer: stringInputRenderer(),
      },

      is_like: {
        labelRenderer: labelRenderer('is similar to'),
        inputRenderer: stringInputRenderer(),
      },

      starts: {
        labelRenderer: labelRenderer('starts with'),
        inputRenderer: stringInputRenderer(),
      },

      not_starts: {
        labelRenderer: labelRenderer('does not start with'),
        inputRenderer: stringInputRenderer(),
      },
    },

    enum: {
      is: {
        labelRenderer: labelRenderer('is'),
        inputRenderer: enumInputRenderer(),
      },

      is_not: {
        labelRenderer: labelRenderer('is not'),
        inputRenderer: enumInputRenderer(),
      },

      starts: {
        labelRenderer: labelRenderer('starts with'),
        inputRenderer: stringInputRenderer(),
      },

      not_starts: {
        labelRenderer: labelRenderer('not starts with'),
        inputRenderer: stringInputRenderer(),
      },
    },

    boolean: {
      is: {
        labelRenderer: labelRenderer('is'),
        inputRenderer: enumInputRenderer({ items: ['true', 'false'] }),
      },
    },

    range: {},

    number: {
      equals: {
        labelRenderer: labelRenderer('equals'),
        inputRenderer: stringInputRenderer({ type: 'number' }),
      },

      gt: {
        labelRenderer: labelRenderer('greater than'),
        inputRenderer: stringInputRenderer({ type: 'number' }),
      },

      gte: {
        labelRenderer: labelRenderer('greater than or equal to'),
        inputRenderer: stringInputRenderer({ type: 'number' }),
      },

      lt: {
        labelRenderer: labelRenderer('less than'),
        inputRenderer: stringInputRenderer({ type: 'number' }),
      },

      lte: {
        labelRenderer: labelRenderer('less than or equal to'),
        inputRenderer: stringInputRenderer({ type: 'number' }),
      },
    },
  }

  const renderSearch = search => (
    <List.Item
      key={search.id}
      actions={[
        <span
          key={`${search.id}-id`}
          style={{ color: '#ccc', fontSize: '.9em' }}
        >
          {search.id}
        </span>,
        <Button
          key={`${search.id}-load`}
          type="link"
          disabled={loading}
          onClick={onSearchLoad(search)}
        >
          <Spin spinning={!deleting && loading && search.id === activeSearch}>
            <ImportOutlined /> Load
          </Spin>
        </Button>,
        <Button
          key={`${search.id}-delete`}
          type="link"
          disabled={deleting || search.createdById !== profileState.profile?.id}
          onClick={onSearchDelete(search)}
        >
          <Spin spinning={deleting && search.id === activeSearch}>
            <DeleteOutlined style={{ color: 'red' }} />
          </Spin>
        </Button>,
      ]}
    >
      <List.Item.Meta
        avatar={
          <Avatar
            src={
              <FileSearchOutlined
                style={{
                  fontSize: 26,
                  marginLeft: 4,
                  marginTop: 4,
                  color: '#ccc',
                }}
              />
            }
          />
        }
        title={search.name}
        description={search.description}
      />
    </List.Item>
  )

  const opt = filter => {
    return _.find(
      options,
      _opt => _.get(_opt, 'field') === _.get(filter, 'key')
    ) as IOpt
  }

  const _operations = (filter, type) => {
    return !type
      ? []
      : _.map(
        _.get(OPERATIONS, [type]),
        (_operation: IOperation, value: string) => {
          return {
            label: _operation.labelRenderer(opt(filter), filter),
            value,
          }
        }
      )
  }

  const operations = filter => {
    return _.concat(
      _operations(filter, '_'),
      _operations(filter, opt(filter)?.schema?.type)
    )
  }

  const operation = filter => {
    const type = opt(filter)?.schema?.type
    return (type ? _.get(OPERATIONS, [type, filter.op]) : null) as IOperation
  }

  return (
    <>
      <Divider orientation="left">Saved Searches</Divider>
      <List dataSource={searches} renderItem={renderSearch} />
      <Divider orientation="left" style={{ marginTop: '2em' }}>
        Search Filters
      </Divider>
      <Row gutter={24}>
        <Col span={24}>
          {_.map(filters, (filter, index) => (
            <Row
              key={`${Math.random()}-select`}
              gutter={12}
              style={{ marginTop: 6 }}
            >
              <Col span={6}>
                <TreeSelect
                  showSearch={true}
                  showArrow={true}
                  disabled={loading}
                  style={{ width: '100%' }}
                  value={filter.key}
                  defaultValue={filter.key}
                  onChange={onFilterKeyChange(index)}
                  treeData={taxonomy}
                />
              </Col>
              <Col span={6}>
                <Select
                  disabled={loading}
                  style={{ width: '100%' }}
                  defaultValue={{
                    value: filter.op,
                    label: operation(filter)?.labelRenderer(
                      opt(filter),
                      filter
                    ),
                  }}
                  onChange={onFilterOpChange(index)}
                  options={operations(filter)}
                />
              </Col>
              <Col span={11}>
                {operation(filter)?.inputRenderer(index, opt(filter), filter)}
              </Col>
              <Col span={1}>
                <Button
                  onClick={removeFilter(index)}
                  size="small"
                  type="ghost"
                  shape="circle"
                >
                  X
                </Button>
              </Col>
            </Row>
          ))}
          <Row key="add-filter-button" style={{ marginTop: 12 }} gutter={12}>
            <Col>
              <Button
                disabled={loading}
                type="ghost"
                shape="round"
                onClick={addFilter}
              >
                {' '}
                + Add Filter
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row style={{ marginTop: 48 }} gutter={24}>
        <Col span={2}>
          <Button
            type="default"
            disabled={loading || saving || _.isEmpty(filters)}
            onClick={onSearch}
          >
            <SearchOutlined /> Search
          </Button>{' '}
          <Spin spinning={searching} />
        </Col>
        <Col span={20} />
        <Col span={2}>
          <Button
            disabled={loading || saving || _.isEmpty(filters)}
            onClick={showSaveForm}
            type="link"
          >
            <SaveOutlined /> Save Search
          </Button>
        </Col>
      </Row>

      <Divider style={{ marginTop: 48 }} orientation="left">
        Results
      </Divider>
      <Spin spinning={searching}>
        <ReactJson
          name="API Query"
          collapsed={true}
          src={query}
          displayObjectSize={false}
          displayDataTypes={false}
          quotesOnKeys={false}
        />
        <ReactJson
          name="Search Info"
          collapsed={true}
          src={meta}
          displayObjectSize={false}
          displayDataTypes={false}
          quotesOnKeys={false}
        />
      </Spin>

      <Tabs size="middle" defaultActiveKey="table">
        <TabPane key="table" tab="Table">
          <Table
            columns={[
              {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
              },
              {
                title: 'Age',
                dataIndex: 'age',
                key: 'age',
              },
              {
                title: 'Address',
                dataIndex: 'address',
                key: 'address',
              },
              {
                title: 'City',
                dataIndex: 'city',
                key: 'city',
              },
              {
                title: 'State',
                dataIndex: 'state',
                key: 'state',
              },
            ]}
            dataSource={_.map(people, (person, idx) => {
              const address = _.get(person, ['home', 'address'])
              const street = _.get(address, ['street'])

              return {
                _: person,
                key: person._id || idx,
                name: _.startCase(
                  `${person?.name?.first || 'person'} ${person?.name?.last ||
                  idx}`.toLowerCase()
                ),
                age: _.get(person, ['demographics', 'age']),
                address: street
                  ? `${street.number || ''} ${street.direction ||
                  ''} ${street.name || ''}${street.type || ''}`.replaceAll(
                    /\s+/g,
                    ' '
                  )
                  : null,
                city: address?.city,
                state: address?.state,
              }
            })}
            onRow={(record, rowIndex) => {
              return {
                onClick: event => {
                  setSelectedPerson(record._)
                },
              }
            }}
          />
        </TabPane>
        <TabPane key="map" tab="Map">
          {/*<Map*/}
          {/*  zoom={[12]}*/}
          {/*  style="mapbox://styles/mapbox/streets-v11"*/}
          {/*  center={[-111.9595617, 33.6112203]}*/}
          {/*  containerStyle={{*/}
          {/*    height: '100vh',*/}
          {/*    width: '100vw'*/}
          {/*  }}*/}

          {/*>*/}
          {/*  <Layer type="symbol" id="marker" layout={{*/}
          {/*    "icon-image": 'marker-15',*/}
          {/*    "text-field": "{title}",*/}
          {/*    "icon-size": 5*/}
          {/*  }}>*/}
          {/*    <Feature properties={{title: 'hello'}} coordinates={[-111.9595617, 33.6112203]} />*/}
          {/*    <Feature coordinates={[-111.9595618, 33.6112200]} />*/}
          {/*    <Feature coordinates={[-111.9595619, 33.6112200]} />*/}
          {/*  </Layer>*/}
          {/*</Map>*/}
        </TabPane>
      </Tabs>
      <ModalWindow
        visible={saveOpen}
        afterClose={hideSaveForm}
        onCancel={hideSaveForm}
        introductionTitle={'Save Search'}
        introductionText={'Save your Search'}
      >
        <SaveSearchForm
          form={form}
          onSubmit={saveSearch}
          onCancel={hideSaveForm}
          loading={loading || saving}
          filters={filters}
          query={query}
        />
        <AlertMessage />
      </ModalWindow>

      <ModalWindow
        closable={true}
        visible={!_.isNil(selectedPerson)}
        afterClose={() => setSelectedPerson(null)}
        onCancel={() => setSelectedPerson(null)}
        introductionTitle={selectedPerson?.name?.full || 'Person Details'}
      >
        <div>
          <ReactJson
            name={false}
            src={selectedPerson}
            displayObjectSize={false}
            displayDataTypes={false}
            quotesOnKeys={false}
          />
        </div>
      </ModalWindow>
    </>
  )
}
