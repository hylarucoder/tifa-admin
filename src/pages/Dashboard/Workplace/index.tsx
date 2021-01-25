import { Avatar, Card, Col, List, Skeleton, Row, Statistic } from 'antd'
import React from 'react'

import { PageContainer } from '@ant-design/pro-layout'
import moment from 'moment'
import Radar from './components/Radar'
import EditableLinkGroup from './components/EditableLinkGroup'
import styles from './style.module.less'
import { ActivitiesType } from './data'
import { Link } from 'react-router-dom'
import { getActivities, getNotice, radarData } from '@/pages/Dashboard/Workplace/_mock'
import { TProfile, useProfile } from '@/hooks/useStore'

const links = [
  {
    title: '操作一',
    href: '',
  },
  {
    title: '操作二',
    href: '',
  },
  {
    title: '操作三',
    href: '',
  },
  {
    title: '操作四',
    href: '',
  },
  {
    title: '操作五',
    href: '',
  },
  {
    title: '操作六',
    href: '',
  },
]

const PageHeaderContent: React.FC<{ profile: TProfile }> = ({ profile }) => {
  const loading = profile && Object.keys(profile).length
  if (!loading) {
    return <Skeleton avatar paragraph={{ rows: 1 }} active />
  }
  return (
    <div className={styles.pageHeaderContent}>
      <div className={styles.avatar}>
        <Avatar size="large" src={profile.avatar} />
      </div>
      <div className={styles.content}>
        <div className={styles.contentTitle}>
          早安，
          {profile.name}
          ，祝你开心每一天！
        </div>
        <div>
          {profile.title} |{profile.group}
        </div>
      </div>
    </div>
  )
}

const ExtraContent: React.FC<{}> = () => (
  <div className={styles.extraContent}>
    <div className={styles.statItem}>
      <Statistic title="项目数" value={56} />
    </div>
    <div className={styles.statItem}>
      <Statistic title="团队内排名" value={8} suffix="/ 24" />
    </div>
    <div className={styles.statItem}>
      <Statistic title="项目访问" value={2223} />
    </div>
  </div>
)

export default () => {
  const profile = useProfile()
  const renderActivities = (item: ActivitiesType) => {
    const events = item.template.split(/@\{([^{}]*)\}/gi).map((key) => {
      // @ts-ignore
      if (item[key]) {
        return (
          // @ts-ignore
          <a href={item[key].link} key={item[key].name}>
            {/*// @ts-ignore*/}
            {item[key].name}
          </a>
        )
      }
      return key
    })
    return (
      <List.Item key={item.id}>
        <List.Item.Meta
          avatar={<Avatar src={item.user.avatar} />}
          title={
            <span>
              <a className={styles.username}>{item.user.name}</a>
              &nbsp;
              <span className={styles.event}>{events}</span>
            </span>
          }
          description={
            <span className={styles.datetime} title={item.updatedAt}>
              {moment(item.updatedAt).fromNow()}
            </span>
          }
        />
      </List.Item>
    )
  }
  const activities = getActivities
  const projectLoading = false
  const activitiesLoading = false
  const projectNotice = getNotice

  return (
    <PageContainer
      content={<PageHeaderContent profile={profile} />}
      extraContent={<ExtraContent />}
    >
      <Row gutter={24}>
        <Col xl={16} lg={24} md={24} sm={24} xs={24}>
          <Card
            className={styles.projectList}
            style={{ marginBottom: 24 }}
            title="进行中的项目"
            bordered={false}
            extra={<Link to="/">全部项目</Link>}
            loading={projectLoading}
            bodyStyle={{ padding: 0 }}
          >
            {projectNotice.map((item) => (
              <Card.Grid className={styles.projectGrid} key={item.id}>
                <Card bodyStyle={{ padding: 0 }} bordered={false}>
                  <Card.Meta
                    title={
                      <div className={styles.cardTitle}>
                        <Avatar size="small" src={item.logo} />
                        <Link to={item.href}>{item.title}</Link>
                      </div>
                    }
                    description={item.description}
                  />
                  <div className={styles.projectItemContent}>
                    <Link to={item.memberLink}>{item.member || ''}</Link>
                    {item.updatedAt && (
                      // @ts-ignore
                      <span className={styles.datetime} title={item.updatedAt}>
                        {moment(item.updatedAt).fromNow()}
                      </span>
                    )}
                  </div>
                </Card>
              </Card.Grid>
            ))}
          </Card>
          <Card
            bodyStyle={{ padding: 0 }}
            bordered={false}
            className={styles.activeCard}
            title="动态"
            loading={activitiesLoading}
          >
            <List<ActivitiesType>
              loading={activitiesLoading}
              renderItem={(item) => renderActivities(item)}
              // @ts-ignore
              dataSource={activities}
              className={styles.activitiesList}
              size="large"
            />
          </Card>
        </Col>
        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
          <Card
            style={{ marginBottom: 24 }}
            title="快速开始 / 便捷导航"
            bordered={false}
            bodyStyle={{ padding: 0 }}
          >
            <EditableLinkGroup onAdd={() => {}} links={links} linkElement={Link} />
          </Card>
          <Card
            style={{ marginBottom: 24 }}
            bordered={false}
            title="XX 指数"
            loading={radarData.length === 0}
          >
            <div className={styles.chart}>
              <Radar hasLegend height={343} data={radarData} />
            </div>
          </Card>
          <Card
            bodyStyle={{ paddingTop: 12, paddingBottom: 12 }}
            bordered={false}
            title="团队"
            loading={projectLoading}
          >
            <div className={styles.members}>
              <Row gutter={48}>
                {projectNotice.map((item) => (
                  <Col span={12} key={`members-item-${item.id}`}>
                    <Link to={item.href}>
                      <Avatar src={item.logo} size="small" />
                      <span className={styles.member}>{item.member}</span>
                    </Link>
                  </Col>
                ))}
              </Row>
            </div>
          </Card>
        </Col>
      </Row>
    </PageContainer>
  )
}
