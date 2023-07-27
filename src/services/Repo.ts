import _ from 'lodash'

const DEFAULT_STORAGE_DELEGATE: Storage = localStorage

function _key(key: string | object): string {
  return _.isString(key) ? key : JSON.stringify(key)
}

function _fromJson(item: any) {
  if (_.isNil(item)) return null
  if (!_.isString(item)) return item

  try {
    return JSON.parse(item)
  } catch (_) {
    // if Repo was bypassed, do not fail when recalling storage items
  }

  return item
}

function _setItem(key: string, item: any, into: Storage): any {
  if (_.isNil(item)) return _removeItem(key, into)

  into.setItem(key, JSON.stringify(item))
  return item
}

function _getItem(key: string, from: Storage): any {
  return _fromJson(from.getItem(key))
}

function _removeItem(key: string, from: Storage): any {
  const item = _getItem(key, from)
  if (!_.isNil(item)) from.removeItem(key)
  return item
}

const Repo = {
  setItem: (key: string | object, item: any, into?: Storage): any => {
    return _setItem(_key(key), item, into || DEFAULT_STORAGE_DELEGATE)
  },

  getItem: (key: string | object, from?: Storage): any => {
    return _getItem(_key(key), from || DEFAULT_STORAGE_DELEGATE)
  },

  removeItem: (key: string | object, from?: Storage): any => {
    return _removeItem(_key(key), from || DEFAULT_STORAGE_DELEGATE)
  },

  clear: (store?: Storage): void => (store || DEFAULT_STORAGE_DELEGATE).clear(),
}

export default Repo
