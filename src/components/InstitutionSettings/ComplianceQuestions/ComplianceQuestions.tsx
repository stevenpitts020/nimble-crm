import React, { useState } from 'react'
import { Card, Typography, Button } from 'antd'
import { PlusCircleFilled } from '@ant-design/icons'
import _ from 'lodash'

import InstitutionService from '../../../services/InstitutionService'
import {
  IComplianceQuestions,
  ISetComplianceQuestions,
  IComplianceQuestion,
} from '../../../store'
import ComplianceQuestion from './ComplianceQuestion'

const { Title } = Typography

const EMPTY_QUESTIONS: IComplianceQuestions = {
  count: 0,
  data: [],
  thresholds: [],
}

interface IComplianceQuestionsProps {
  institutionId: string
  questions?: IComplianceQuestions
}

function ComplianceQuestions(props: IComplianceQuestionsProps) {
  const [questions, setQuestions] = useState<IComplianceQuestions>(
    !props.questions || _.isEmpty(props.questions)
      ? EMPTY_QUESTIONS
      : props.questions
  )

  const copy = (): ISetComplianceQuestions => {
    if (!questions.data) setQuestions(_.merge(questions, { data: [] }))
    if (_.isNil(questions.count))
      setQuestions(_.merge(questions, { count: questions.data?.length || 0 }))
    if (!questions.thresholds)
      setQuestions(_.merge(questions, { thresholds: [] }))

    return _.cloneDeep(questions) as ISetComplianceQuestions
  }

  const update = (_questions: IComplianceQuestions) => {
    InstitutionService.update({
      id: props.institutionId,
      questions: _questions,
    }).then(i => {
      setQuestions(i.questions || EMPTY_QUESTIONS)
    })
  }

  function onUpdateText(text: string, index: number) {
    const _questions = copy()

    _.set(_questions, `data[${index}].text`, text)

    update(_questions)
  }

  function onUpdateScore(score: object, index: number) {
    const _questions = copy()

    _.set(_questions, `data[${index}].score`, score)

    update(_questions)
  }

  function onAdd() {
    const _questions = copy()

    _questions.data.push({
      text: '',
      type: 'string',
      subtype: 'enum',
      enum: ['yes', 'no'],
      required: true,
    })

    update(_questions)
  }

  function onRemove(index: number) {
    const _questions = copy()

    _questions.data.splice(index, 1)

    update(_questions)
  }

  function onMoveUp(fromIdx: number) {
    if (fromIdx <= 0) return // can't move above the first position
    if (!questions.count) return // no disclosures
    if (questions.count < 2) return // moving a single disclosure is a no-op

    move(fromIdx, fromIdx - 1)
  }

  function onMoveDown(fromIdx: number) {
    if (!questions.count) return // no disclosures
    if (fromIdx + 1 >= questions.count) return // can't move past the last position

    move(fromIdx, fromIdx + 1)
  }

  function move(fromIdx: number, toIdx: number) {
    const _questions = copy()

    const atIdx = _questions.data[toIdx]

    _questions.data[toIdx] = _questions.data[fromIdx]
    _questions.data[fromIdx] = atIdx

    update(_questions)
  }

  return (
    <Card bordered={false}>
      <Title level={2}>Compliance Questions</Title>
      {questions?.data?.map((question: IComplianceQuestion, index: number) => (
        <ComplianceQuestion
          key={index}
          index={index}
          onRemove={onRemove}
          question={question}
          onMoveUp={onMoveUp}
          onMoveDown={onMoveDown}
          onUpdateText={onUpdateText}
          onUpdateScore={onUpdateScore}
        />
      ))}
      <Button
        icon={<PlusCircleFilled style={{ fontSize: '15px', color: 'gray' }} />}
        style={{ color: 'black', backgroundColor: '#f8f9fa' }}
        onClick={onAdd}
      >
        Add Question
      </Button>
    </Card>
  )
}

export default ComplianceQuestions
