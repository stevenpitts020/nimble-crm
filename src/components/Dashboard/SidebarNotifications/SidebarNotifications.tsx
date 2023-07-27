import React from 'react'
import moment from 'moment'
import { Button, Typography, Calendar, Radio, List } from 'antd'

const { Title } = Typography
const { Text } = Typography

interface ISidebarNotifications {
  style?: React.CSSProperties
}

// TODO pass proper data
export const SidebarNotifications: React.FC<ISidebarNotifications> = (
  props: ISidebarNotifications
) => {
  const data = [
    {
      title: 'Meeting with Bob Smith',
      time: '2.30pm',
    },
    {
      title: 'Meeting with Barbara Linx',
      time: '5.30pm',
    },
    {
      title: 'First Quarter Review Meetings',
      time: '2.30pm',
    },
    {
      title: 'Coffee with John',
      time: '2.30pm',
    },
  ]

  const dataTodo = [
    {
      title: 'Review site notes',
      value: 1,
    },
    {
      title: 'Meeting with Barbara Linx',
      value: 2,
    },
  ]

  const dataAnnouncements = [
    {
      title:
        'Increase your checking account for Midwest region 0.25% to remain competitive',
      actions: [],
    },
    {
      title: 'Take advantage of Mortgage rates today buy a block for 0.4%',
      actions: ['Projected Impact', 'Review Action'],
    },
    {
      title: 'Efficiency ratios are increasing. Find out why!',
      actions: [],
    },
  ]

  const listItem = (item: any) => {
    return (
      <List.Item>
        <List.Item.Meta
          title={<a href="/clients">{item.title}</a>}
          description={item.time}
        />
      </List.Item>
    )
  }

  const listItemTodo = (item: any) => {
    return (
      <List.Item>
        <Radio value={item.value}>
          <Text className="ant-list-item-meta-title">{item.title}</Text>
        </Radio>
      </List.Item>
    )
  }

  const listItemAnnouncements = (item: any) => {
    return (
      <List.Item>
        <Text>{item.title}</Text>
        {item.actions.length > 0 && <AnnouncementActions />}
      </List.Item>
    )
  }

  const CalendarHeaderPlain = () => {
    const current = moment(new Date())
    const month = current.localeData().months(current)
    const year = current.year()

    return (
      <div className="ni-calendar--header">
        <Title level={3} className="ni-calendar--header--title">
          {month} <Text>{year}</Text>
        </Title>
      </div>
    )
  }

  const AnnouncementActions = () => {
    // TODO
    return (
      <div className="ni-todo-actions">
        <a href="/clients">
          <Button type="link" size={'small'}>
            Projected Impact
          </Button>
        </a>
        <a href="/clients">
          <Button type="link" size={'small'}>
            Review Action
          </Button>
        </a>
      </div>
    )
  }

  return (
    <div className="ni-sidebar-notification">
      <div className="ni-calendar u-margin-bottom-xl">
        <CalendarHeaderPlain />
        <Calendar fullscreen={false} />
      </div>

      <Title
        level={3}
        type="secondary"
        className="ni-sidebar-notification--title"
      >
        Appointments
      </Title>

      <div className="u-margin-bottom-xl">
        <List
          className="ni-todolist"
          itemLayout="horizontal"
          header={<Text className="ni-todolist--title">Today</Text>}
          dataSource={data.splice(0, 2)}
          renderItem={listItem}
        />
      </div>

      <div className="u-margin-bottom-xl">
        <List
          className="ni-todolist"
          itemLayout="horizontal"
          header={<Text className="ni-todolist--title">Tomorrow</Text>}
          dataSource={data.splice(0, 4)}
          renderItem={listItem}
        />
      </div>

      <div className="u-margin-botto</div>m-xl">
        <Radio.Group>
          <List
            className="ni-todolist"
            itemLayout="horizontal"
            header={
              <Title
                level={3}
                type="secondary"
                className="ni-sidebar-notification--title"
              >
                To Do
              </Title>
            }
            dataSource={dataTodo}
            renderItem={listItemTodo}
          />
        </Radio.Group>
      </div>

      <List
        className="ni-todolist"
        itemLayout="vertical"
        header={
          <Title
            level={3}
            type="secondary"
            className="ni-sidebar-notification--title"
          >
            Announcements
          </Title>
        }
        dataSource={dataAnnouncements}
        renderItem={listItemAnnouncements}
      />
    </div>
  )
}
