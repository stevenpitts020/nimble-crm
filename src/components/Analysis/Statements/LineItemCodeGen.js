/**
 * Generator for `LineItems.tsx`.
 * see package.json[scripts][generate-canonical-line-items]
 */

const _ = require('lodash');
const CANON = require('./CANON');

function printTree(key, obj, first = true, last = true, idx = 0) {
  if (!obj) return '';

  let acc = (first && key != null ? '{\n' : '') + _.repeat('  ', idx);

  if (key != null) acc += key + '?: ';

  if (_.isEmpty(obj.children)) return acc + 'LineItem[]' + (last ? '' : ',') + '\n';

  const childKeys = _.keys(obj.children);

  for (let i = 0; i < childKeys.length; i++) {
    const childKey = childKeys[i];
    acc += printTree(childKey, obj.children[childKey], i === 0, i === childKeys.length - 1, idx + 1);
  }

  return (key == null ? 'export interface LineItems ' : '') + acc + _.repeat('  ', idx) + '}' + (last ? '' : ',') + '\n';
}

console.log(
  'import { ReactNode } from \'react\'\n\n' +
  'export interface LineItem {\n' +
  '  name: ReactNode\n' +
  '  values: number[]\n' +
  '}\n\n' +
  `${printTree(null, CANON)}`
);