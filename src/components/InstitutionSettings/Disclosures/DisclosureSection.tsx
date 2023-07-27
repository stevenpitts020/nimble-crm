import React from 'react'
import { Typography, Row, Col, Input } from 'antd'
import {
  CloseSquareOutlined,
  DownCircleOutlined,
  UpCircleOutlined,
} from '@ant-design/icons'
import { Editor } from '@tinymce/tinymce-react'

import { Box } from '../../index'

const { Title } = Typography

function DisclosureSection(props: any) {
  const {
    index,
    name,
    body,
    onUpdateSectionName,
    onUpdateDisclosure,
    onDeleteSection,
    onMoveSectionUp,
    onMoveSectionDown,
  } = props

  const handleNameOnBlur = (e: any) =>
    onUpdateSectionName(e.target.value, index)

  const handleTextOnBlur = (e: any, editor: any) =>
    onUpdateDisclosure(editor.getContent(), index)

  const handleDelete = () => onDeleteSection(index)

  const onUp = () => onMoveSectionUp(index)

  const onDown = () => onMoveSectionDown(index)

  return (
    <Box className="shadow-small disclosure-section" marginBottom="xl">
      <Row
        style={{ display: 'flex', justifyContent: 'left', marginBottom: '1em' }}
      >
        <UpCircleOutlined style={{ fontSize: '2em' }} onClick={onUp} />
      </Row>
      <Row style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Title level={5}>Section Name</Title>
        <CloseSquareOutlined onClick={handleDelete} />
      </Row>
      <Row style={{ marginBottom: '1rem' }} gutter={16}>
        <Col span={16}>
          <Input
            key={JSON.stringify(name)}
            defaultValue={name}
            onBlur={handleNameOnBlur}
          />
        </Col>
      </Row>
      <Editor
        apiKey="26m8cpybqra3ykmysf6os45jtq53jucghnmq7ujg4livpqg5"
        initialValue={body}
        init={{
          height: 300,
          menubar: false,
          branding: false,
          content_style:
            'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        }}
        onBlur={handleTextOnBlur}
      />
      <Row
        style={{ display: 'flex', justifyContent: 'left', marginTop: '1em' }}
      >
        <DownCircleOutlined style={{ fontSize: '2em' }} onClick={onDown} />
      </Row>
    </Box>
  )
}

export default DisclosureSection
