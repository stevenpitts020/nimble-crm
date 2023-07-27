import React from 'react'
import { Typography, Row, Col, Input } from 'antd'
import {
  CloseSquareOutlined,
  DownCircleOutlined,
  UpCircleOutlined,
} from '@ant-design/icons'

import { Box } from '../../index'
import { IComplianceQuestion } from '../../../store'

const { Title } = Typography

interface IComplianceQuestionProps {
  index: number
  question: IComplianceQuestion
  onRemove: (index: number) => void
  onMoveUp: (index: number) => void
  onMoveDown: (index: number) => void
  onUpdateText: (text: string, index: number) => void
  onUpdateScore: (score: object, index: number) => void
}

function ComplianceQuestion(props: IComplianceQuestionProps) {
  const handleTextOnBlur = (e: any) =>
    props.onUpdateText(e.target.value, props.index)

  const handleDelete = () => props.onRemove(props.index)

  const onUp = () => props.onMoveUp(props.index)

  const onDown = () => props.onMoveDown(props.index)

  return (
    <Box className="shadow-small disclosure-section" marginBottom="xl">
      <Row
        style={{ display: 'flex', justifyContent: 'left', marginBottom: '1em' }}
      >
        <UpCircleOutlined style={{ fontSize: '2em' }} onClick={onUp} />
      </Row>
      <Row style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Title level={5}>Question</Title>
        <CloseSquareOutlined onClick={handleDelete} />
      </Row>
      <Row style={{ marginBottom: '1rem' }} gutter={16}>
        <Col span={16}>
          <Input
            key={JSON.stringify(props.question.text)}
            defaultValue={props.question.text}
            onBlur={handleTextOnBlur}
          />
        </Col>
      </Row>
      <Row
        style={{ display: 'flex', justifyContent: 'left', marginTop: '1em' }}
      >
        <DownCircleOutlined style={{ fontSize: '2em' }} onClick={onDown} />
      </Row>
    </Box>
  )
}

export default ComplianceQuestion
