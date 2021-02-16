import React from 'react'
import { TCachePanel, TCachePanelCall, TCachePanelCount } from '../store'
import ProTable, { ProColumns, TableDropdown } from '@ant-design/pro-table'

const commonProps = {
  size: 'small',
  bordered: false,
  toolbarRender: false,
  search: false,
  pagination: {
    showQuickJumper: true,
    hideOnSinglePage: true,
  },
}

export const CachePanel = ({ panel }: { panel: TCachePanel }) => {
  const columns: ProColumns<TCachePanel>[] = [
    {
      dataIndex: 'totalCalls',
      title: 'Total Calls',
    },
    {
      dataIndex: 'totalTime',
      title: 'Total Time',
    },
    {
      dataIndex: 'hits',
      title: 'Cache Hits',
    },
    {
      dataIndex: 'misses',
      title: 'Cache Misses',
    },
  ]

  const columnsCommands: ProColumns<TCachePanelCount>[] = [
    {
      dataIndex: 'name',
      title: 'Command',
    },
    {
      dataIndex: 'value',
      title: 'Count',
    },
  ]

  const columnsCalls: ProColumns<TCachePanelCall>[] = [
    {
      dataIndex: 'time',
      title: 'time',
    },
    {
      dataIndex: 'name',
      title: 'name',
    },
    {
      dataIndex: 'args',
      title: 'args',
    },
    {
      dataIndex: 'kwargs',
      title: 'kwargs',
    },
    {
      dataIndex: 'backend',
      title: 'trace',
    },
  ]

  return (
    <>
      <ProTable<TCachePanel>
        title={() => <h3>Summary</h3>}
        size={'small'}
        bordered={false}
        columns={columns}
        request={(params, sorter, filter) => {
          // 表单搜索项会从 params 传入，传递给后端接口。
          console.log(params, sorter, filter)
          return Promise.resolve({
            data: [panel],
            success: true,
          })
        }}
        pagination={{
          hideOnSinglePage: true,
        }}
        toolBarRender={false}
        search={false}
      />
      <br />
      <ProTable<TCachePanelCount>
        title={() => <h3>Commands</h3>}
        size={'small'}
        bordered={false}
        columns={columnsCommands}
        request={(params, sorter, filter) => {
          // 表单搜索项会从 params 传入，传递给后端接口。
          console.log(params, sorter, filter)
          return Promise.resolve({
            data: panel.counts,
            success: true,
          })
        }}
        pagination={{
          hideOnSinglePage: true,
        }}
        toolBarRender={false}
        search={false}
      />
      <br />

      <ProTable<TCachePanelCall>
        title={() => <h3>Calls</h3>}
        size={'small'}
        bordered={false}
        columns={columnsCalls}
        request={(params, sorter, filter) => {
          // 表单搜索项会从 params 传入，传递给后端接口。
          console.log(params, sorter, filter)
          return Promise.resolve({
            data: panel.calls,
            success: true,
          })
        }}
        rowKey="outUserNo"
        pagination={{
          hideOnSinglePage: true,
        }}
        toolBarRender={false}
        search={false}
      />
    </>
  )
}
