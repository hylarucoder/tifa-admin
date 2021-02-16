import React, { useState } from 'react'
import { VersionsPanel } from './panels/VersionsPanel'
import { HistoryPanel } from './panels/HistoryPanel'
import { RequestPanel } from './panels/RequestPanel'
import { SQLPanel } from './panels/SQLPanel'
import { CachePanel } from './panels/CachePanel'
import { LoggingPanel } from './panels/TimerPanel'
import { ProfilingPanel } from './panels/ProfilePanel'
import {
  INITIAL_STORE,
} from './store'
import { PageContainer } from '@ant-design/pro-layout'
import { Button } from 'antd'
import ProCard from '@ant-design/pro-card'

const Page = () => {
  const [tabKey, setTabKey] = useState('base')
  return (
    <PageContainer
      content="欢迎使用 ProLayout 组件"
      tabList={[
        {
          tab: '基本信息',
          key: 'BasePanel',
        },
        {
          tab: '版本信息',
          key: 'VersionsPanel',
        },
        {
          tab: '请求信息',
          key: 'RequestPanel',
        },
        {
          tab: 'SQL信息',
          key: 'SQLPanel',
        },
        {
          tab: '缓存信息',
          key: 'CachePanel',
        },
        {
          tab: 'Profile',
          key: 'ProfilingPanel',
        },
        {
          tab: '日志信息',
          key: 'LoggingPanel',
        },
      ]}
      tabActiveKey={tabKey}
      onTabChange={(key) => {
        setTabKey(key)
      }}
      extra={[
        <Button key="1" type="primary">
          发起请求
        </Button>,
        <Button key="2">
          重新请求
        </Button>,
        <Button key="3">
          历史记录
        </Button>,
      ]}
    >
      <>
        {
          tabKey === 'BasePanel' && <HistoryPanel panel={INITIAL_STORE.HistoryPanel} />
        }
        {
          tabKey === 'VersionsPanel' && <VersionsPanel panel={INITIAL_STORE.VersionsPanel} />
        }
        {
          tabKey === 'RequestPanel' && <RequestPanel panel={INITIAL_STORE.RequestPanel} />
        }
        {
          tabKey === 'SQLPanel' && <SQLPanel panel={INITIAL_STORE.SQLPanel} />
        }
        {
          tabKey === 'CachePanel' && <CachePanel panel={INITIAL_STORE.CachePanel} />
        }
        {
          tabKey === 'LoggingPanel' && <LoggingPanel panel={INITIAL_STORE.LoggingPanel} />
        }
        {
          tabKey === 'ProfilingPanel' && <ProfilingPanel panel={INITIAL_STORE.ProfilingPanel} />
        }
      </>
    </PageContainer>
  )
}

export default Page
