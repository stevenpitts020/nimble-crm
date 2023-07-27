/* eslint-disable */
// @ts-nocheck

import _ from 'lodash'
import React, { ReactNode, useContext, useEffect, useState } from 'react'
import { Alert, Button, Card, Col, Dropdown, Form, Input, List, Menu, Row, Space, Spin, Typography } from "antd";
import { AlertMessage } from "../../Common/AlertMessage/AlertMessage";
import { ModalWindow } from "../../Common/ModalWindow/ModalWindow";
import { DocumentRequestForm } from "./DocumentRequestForm";
import { ProfileContext } from "../../../store/ProfileProvider";
import { IDocumentRequest } from "../../../store";
import { log } from "../../../services";
import { AlertContext } from "../../../store/AlertProvider";
import WorkflowService from "../../../services/WorkflowService";
import { Divider } from "../../Common/Divider/Divider";
import { BarChartOutlined, CheckCircleOutlined, DeleteOutlined, DownOutlined, EllipsisOutlined, MoreOutlined, PlayCircleOutlined } from "@ant-design/icons";
import Select from "react-select";
import { Box } from "../../Common/Box/Box";

export interface IActivity {
  id: string,
  title: string
}

export interface ITrigger {
  id: string,
  title: string
}

const TRIGGER_OPTS = [
  { value: 'mr', label: <><PlayCircleOutlined /> Manual Run</> },
  { value: 'np', label: 'New Prospect' },
  { value: 'co', label: 'Onboarding Completed' },
  { value: 'ex', label: 'Stale Financial Document' }
];

export const WorkflowBuilder: React.FC<any> = (props: any) => {
  const [loadingTriggers, setLoadingTriggers] = useState<boolean>(false)
  const [triggers, setTriggers] = useState<ITrigger[]>([])

  const [loadingActivities, setLoadingActivities] = useState<boolean>(false)
  const [activities, setActivities] = useState<IActivity[]>([])

  const [showIntakeSource, setShowIntakeSource] = useState<boolean>(false)

  useEffect(() => {
    setLoadingTriggers(true)
    setLoadingActivities(true)

    setTimeout(() => {
      setTriggers([{ id: 'mr', title: 'Manual Run' }])
      setLoadingTriggers(false)
    }, 600)

    setTimeout(() => {
      setActivities([
        { id: '1', title: 'Request Tax Form' },
        { id: '2', title: 'Sign Loan Agreement' },
        { id: '3', title: 'Request Approval' }
      ])
      setLoadingActivities(false)
    }, 1000)
  }, [])

  const onDelete = node => () => {
    const _activities = []
    activities.forEach(activity => {
      if (activity.id !== node.id) _activities.push(activity)
    })
    setActivities(_activities)
  }

  const nodeMenu = node => (
    <Menu>
      <Menu.Item key='delete' icon={<DeleteOutlined />} onClick={onDelete(node)}>Delete</Menu.Item>
    </Menu>
  );

  const addActivity = () => {
    const _activities = _.cloneDeep(activities);
    _activities.push({ id: `${Math.random()}`, title: '' })
    setActivities(_activities)
  }

  const renderActivityForm = activity => {
    return <Form>
      <Input name='blah' />
    </Form>
  }

  const renderTitle = node => {
    return <Input size='large' placeholder='Activity Name' defaultValue={node?.title || ''} style={{ margin: 0 }} />
  }

  const renderNode = node => {
    if (!node || _.isEmpty(node) || node.type === 'new') return (<Button
      style={{ marginTop: '.8em' }}
      className="referral-button"
      hidden={false}
      disabled={false}
      loading={false}
      type="ghost"
      shape="circle"
      size='large'
      onClick={addActivity}
    >+</Button>)

    return {
      activity: () => <>
        <Row gutter={0}>
          <Col span={23}>
            <Card
              key={node?.id}
              className={`wkfl-${node?.type || 'section'}`}
            >
              <Row>
                <Col span={23}>
                  <Box className='wkfl-node-title'>{node?.type || 'section'}</Box>
                </Col>
                <Col span={1}>
                  <Dropdown overlay={nodeMenu(node)} trigger={['click']} placement="bottomLeft"><MoreOutlined /></Dropdown>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  {renderTitle(node)}
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Alert
                    type='info'
                    className='wkfl-completion-alert'
                    message={<><CheckCircleOutlined /> {_.random(0, 15, false)} incomplete tasks</>}
                  />
                </Col>
              </Row>


              {renderActivityForm(node)}
            </Card>
          </Col>
          <Col span={1}>
            <div style={{ marginTop: '1em' }}>......</div>
          </Col>
        </Row>
      </>,
      edge: () => <>...</>
    }[node.type]()
  }

  return (
    <Row gutter={0}>
      <Col span={3}>
        <Row gutter={0}>
          <Col span={22}>
            <Card loading={loadingTriggers} style={{ width: '100%', minHeight: 350 }}>
              <Row style={{ fontSize: '1.2em' }}>
                <Col style={{ textAlign: 'center' }} span={24}>How will this automation be started?</Col>
              </Row>
              <Row>
                <Col span={24}><Select
                  isMulti={true}
                  style={{ marginTop: '.8em' }}
                  defaultValue={_.map(triggers, trigger => {
                    return _.find(TRIGGER_OPTS, opt => opt.value === trigger.id)
                  })}
                  options={TRIGGER_OPTS} />
                </Col>
              </Row>
              <Alert
                type="info"
                showIcon={true}
                style={{ fontSize: '.8em', lineHeight: '1em', marginTop: '1em', marginBottom: '2em' }}
                message="Anyone with access to this project can add tasks manually"
              />

              <Button type='ghost' style={{ width: '100%' }} onClick={() => setShowIntakeSource(true)}>+ intake source</Button>
              <ModalWindow visible={showIntakeSource} introductionText='Intake Source' closable={true} onCancel={() => setShowIntakeSource(false)}>
                <Box textAlign='center'>
                  <EllipsisOutlined style={{ fontSize: '2em' }} />
                </Box>
                <Box textAlign='center'>
                  <EllipsisOutlined style={{ fontSize: '2em' }} />
                </Box>
                <Box textAlign='center'>
                  <EllipsisOutlined style={{ fontSize: '2em' }} />
                </Box>
                <Box textAlign='center'>
                  <EllipsisOutlined style={{ fontSize: '2em' }} />
                </Box>
              </ModalWindow>


              {/*<Box style={{ color: '#a5b1bd' }}>*/}
              {/*  Input Files:*/}
              {/*</Box>*/}
              {/*<List bordered={false}>*/}
              {/*  <List.Item>*/}
              {/*    <Button><BarChartOutlined /> NimbleFi Automation Chart</Button>*/}
              {/*  </List.Item>*/}
              {/*  <List.Item>*/}
              {/*    <Button type='ghost' style={{ width: '100%' }}>+ intake source</Button>*/}
              {/*  </List.Item>*/}
              {/*</List>*/}


            </Card>
          </Col>
          <Col span={2}>
            <div style={{ marginTop: '1em' }}>........</div>
          </Col>
        </Row>
      </Col>
      <Col span={21}>
        <List
          loading={loadingActivities}
          grid={{ gutter: 0, column: 6 }}
          dataSource={_.reduce(activities, (acc, activity, idx) => {
            acc.push({ idx, type: 'activity', ...activity })
            // acc.push({ type: 'edge' })

            if (idx == activities.length - 1) acc.push({ type: 'new' })
            return acc
          }, [])}
          renderItem={node => (<List.Item>{renderNode(node)}</List.Item>)}
        />
      </Col>
    </Row>
  )
}
