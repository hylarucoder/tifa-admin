import React from 'react'
import ProCard from '@ant-design/pro-card'
import { Statistic } from 'antd'

const { Divider } = ProCard

export default () => {
  return (
    <div>
      <ProCard.Group title="核心指标">
        <ProCard>
          <Statistic title="今日UV" value={79.0} precision={2} />
        </ProCard>
        <Divider />
        <ProCard>
          <Statistic title="冻结金额" value={112893.0} precision={2} />
        </ProCard>
        <Divider />
        <ProCard>
          <Statistic title="信息完整度" value={93} suffix="/ 100" />
        </ProCard>
        <ProCard>
          <Statistic title="冻结金额" value={112893.0} />
        </ProCard>
      </ProCard.Group>

      <ProCard title="复杂切分" extra="2019年9月28日" split="vertical" bordered headerBordered>
        <ProCard split="horizontal">
          <ProCard split="horizontal">
            <ProCard split="vertical">
              <ProCard title="昨日全部流量">123</ProCard>
              <ProCard title="本月累计流量">234</ProCard>
              <ProCard title="今年累计流量">345</ProCard>
            </ProCard>
            <ProCard split="vertical">
              <ProCard title="运行中试验">12/56</ProCard>
              <ProCard title="历史试验总数">134 个</ProCard>
            </ProCard>
          </ProCard>
          <ProCard title="流量趋势">
            <div>图表</div>
            <div>图表</div>
            <div>图表</div>
            <div>图表</div>
            <div>图表</div>
          </ProCard>
        </ProCard>
        <ProCard title="流量占用情况">右侧内容</ProCard>
      </ProCard>
    </div>
  )
}
