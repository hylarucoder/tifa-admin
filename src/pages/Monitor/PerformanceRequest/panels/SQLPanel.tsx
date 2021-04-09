import React from "react"
import { TSQLPanel, TSQLPanelQuery } from "../store"
import { CodeBlock, SQLCodeBlock, SQLCodeBlockOneLiner } from "../SQLCodeBlock"
import { Button, Tooltip, Dropdown, Menu, Input, Progress } from "antd"
import type { ProColumns } from "@ant-design/pro-table"
import ProTable, { TableDropdown } from "@ant-design/pro-table"

const expandedRowRender = (props: any) => {
  return (
    <div>
      <SQLCodeBlock sql={props.query} />
      <SQLCodeBlock sql={props.stacktrace} />
    </div>
  )
}

const columns: ProColumns<TSQLPanelQuery>[] = [
  {
    title: "No",
    dataIndex: "index",
    width: 48,
  },
  {
    title: "Query",
    dataIndex: "query",
    render: (_) => <SQLCodeBlockOneLiner sql={_ as string} />,
  },
  {
    title: "Timeline",
    dataIndex: "startOffset",
    render: (_) => <Progress percent={30} size="small" />,
  },
  {
    title: "Action",
    width: 180,
    key: "option",
    valueType: "option",
    render: () => [<a key="link">Sel</a>, <a key="link">Expl</a>],
  },
]

export const SQLPanel = ({ panel }: { panel: TSQLPanel }) => {
  const queries = panel.queries
  return (
    <ProTable<TSQLPanelQuery>
      columns={columns}
      request={(params, sorter, filter) => {
        // 表单搜索项会从 params 传入，传递给后端接口。
        console.log(params, sorter, filter)
        return Promise.resolve({
          data: queries,
          success: true,
        })
      }}
      size={"small"}
      expandable={{ expandedRowRender }}
      rowKey="key"
      pagination={{
        showQuickJumper: true,
      }}
      search={{
        layout: "vertical",
        defaultCollapsed: false,
      }}
      dateFormatter="string"
      toolbar={{
        title: "高级表格",
        tooltip: "这是一个标题提示",
      }}
      toolBarRender={() => [
        <Button key="danger" danger>
          危险按钮
        </Button>,
        <Button key="show">查看日志</Button>,
        <Button type="primary" key="primary">
          创建应用
        </Button>,
      ]}
    />
  )
}
