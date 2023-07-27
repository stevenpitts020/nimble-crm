import React, { useState } from 'react'
import { Card, Typography, Button } from 'antd'
import { PlusCircleFilled } from '@ant-design/icons'
import _ from 'lodash'

import InstitutionService from '../../../services/InstitutionService'
import DisclosureSection from './DisclosureSection'

const { Title } = Typography

function Disclosures(props: any) {
  const { institutionDisclosures, id } = props

  const [disclosures, setDisclosures] = useState(
    !institutionDisclosures || _.isEmpty(institutionDisclosures)
      ? { count: 0, data: [] }
      : institutionDisclosures
  )

  const update = (_disclosures: any) =>
    InstitutionService.update({
      id,
      disclosures: _disclosures,
    }).then(i =>
      setDisclosures(
        _.get(i, 'disclosures', {
          count: 0,
          data: [],
        })
      )
    )

  function onUpdateText(text: string, index: number) {
    const _disclosures = _.cloneDeep(disclosures)

    _.set(_disclosures, `data[${index}].text`, text)

    update(_disclosures)
  }

  function onAddSection() {
    const _disclosures = _.cloneDeep(disclosures)

    _disclosures.data.push({
      text: '',
      name: `Disclosure ${_disclosures?.data?.length + 1}`,
    })

    update(_disclosures)
  }

  function onDeleteSection(index: number) {
    const _disclosures = _.cloneDeep(disclosures)

    _disclosures.data.splice(index, 1)

    update(_disclosures)
  }

  function onUpdateSectionName(name: string, index: number) {
    const _disclosures = _.cloneDeep(disclosures)

    _.set(_disclosures, `data[${index}].name`, name)

    update(_disclosures)
  }

  function onMoveUp(fromIdx: number) {
    if (fromIdx <= 0) return // can't move above the first position
    if (!disclosures.count) return // no disclosures
    if (disclosures.count < 2) return // moving a single disclosure is a no-op

    move(fromIdx, fromIdx - 1)
  }

  function onMoveDown(fromIdx: number) {
    if (!disclosures.count) return // no disclosures
    if (fromIdx + 1 >= disclosures.count) return // can't move past the last position

    move(fromIdx, fromIdx + 1)
  }

  function move(fromIdx: number, toIdx: number) {
    const _disclosures = _.cloneDeep(disclosures)

    const atIdx = _disclosures.data[toIdx]

    _disclosures.data[toIdx] = _disclosures.data[fromIdx]
    _disclosures.data[fromIdx] = atIdx

    update(_disclosures)
  }

  return (
    <Card bordered={false}>
      <Title level={2}>Disclosures</Title>
      {disclosures?.data?.map((section: any, index: number) => (
        <DisclosureSection
          key={index}
          index={index}
          name={section.name}
          body={section.text}
          onMoveSectionUp={onMoveUp}
          onMoveSectionDown={onMoveDown}
          onUpdateSectionName={onUpdateSectionName}
          onUpdateDisclosure={onUpdateText}
          onDeleteSection={onDeleteSection}
        />
      ))}
      <Button
        icon={<PlusCircleFilled style={{ fontSize: '15px', color: 'gray' }} />}
        style={{ color: 'black', backgroundColor: '#f8f9fa' }}
        onClick={onAddSection}
      >
        Add Section
      </Button>
    </Card>
  )
}

export default Disclosures
