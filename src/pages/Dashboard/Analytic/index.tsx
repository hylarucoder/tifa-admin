import React from 'react'
import { EllipsisOutlined } from '@ant-design/icons'
import { Col, Dropdown, Menu, RadioChangeEvent, Row } from 'antd'
import { GridContent } from '@ant-design/pro-layout'

import { getTimeDistance } from '@/components/Dashboard/utils/utils'
import styles from './style.module.less'
import { getFakeChartData } from '@/pages/Dashboard/Analytic/_mock'
import { RangePickerProps } from 'antd/es/date-picker'
import { ErrorFallback } from '@/components/ErrorFallback'
import { ErrorBoundary } from '@/components/ErrorBoundary'

const IntroduceRow = React.lazy(() => import('@/components/Dashboard/IntroduceRow'))
const SalesCard = React.lazy(() => import('@/components/Dashboard/SalesCard'))
const TopSearch = React.lazy(() => import('@/components/Dashboard/TopSearch'))
const ProportionSales = React.lazy(() => import('@/components/Dashboard/ProportionSales'))
const OfflineData = React.lazy(() => import('@/components/Dashboard/OfflineData'))

type RangePickerValue = RangePickerProps['value']

export default () => {
  const state = {
    salesType: 'all',
    currentTabKey: '',
    rangePickerValue: getTimeDistance('year'),
  }
  const handleChangeSalesType = (e: RadioChangeEvent) => {
    // this.setState({
    //     salesType: e.target.value,
    // })
  }

  const handleTabChange = (key: string) => {
    // this.setState({
    //     currentTabKey: key,
    // })
  }

  const handleRangePickerChange = (rangePickerValue: RangePickerValue) => {}

  const selectDate = (type: 'today' | 'week' | 'month' | 'year') => {}

  const isActive = (type: 'today' | 'week' | 'month' | 'year') => {
    const { rangePickerValue } = state
    if (!rangePickerValue) {
      return ''
    }
    const value = getTimeDistance(type)
    if (!value) {
      return ''
    }
    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return ''
    }
    if (
      rangePickerValue[0].isSame(value[0], 'day') &&
      rangePickerValue[1].isSame(value[1], 'day')
    ) {
      return styles.currentDate
    }
    return ''
  }
  const loading = false
  const { rangePickerValue, salesType, currentTabKey } = state
  // salesType = "ALL"
  const {
    visitData,
    visitData2,
    salesData,
    searchData,
    offlineData,
    offlineChartData,
    salesTypeData,
    salesTypeDataOnline,
    salesTypeDataOffline,
  } = getFakeChartData
  let salesPieData
  if (salesType === 'all') {
    salesPieData = salesTypeData
  } else {
    salesPieData = salesType === 'online' ? salesTypeDataOnline : salesTypeDataOffline
  }
  const menu = (
    <Menu>
      <Menu.Item>操作一</Menu.Item>
      <Menu.Item>操作二</Menu.Item>
    </Menu>
  )

  const dropdownGroup = (
    <span className={styles.iconGroup}>
      <Dropdown overlay={menu} placement="bottomRight">
        <EllipsisOutlined />
      </Dropdown>
    </span>
  )

  const activeKey = currentTabKey || (offlineData[0] && offlineData[0].name)
  return (
    <GridContent>
      <React.Fragment>
        <IntroduceRow loading={loading} visitData={visitData} />
        <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => {}}>
          <SalesCard
            rangePickerValue={rangePickerValue}
            salesData={salesData}
            isActive={isActive}
            handleRangePickerChange={handleRangePickerChange}
            loading={loading}
            selectDate={selectDate}
          />
        </ErrorBoundary>
        <Row
          gutter={24}
          style={{
            marginTop: 24,
          }}
        >
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => {}}>
              <TopSearch
                loading={loading}
                visitData2={visitData2}
                searchData={searchData}
                dropdownGroup={dropdownGroup}
              />
            </ErrorBoundary>
          </Col>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => {}}>
              <ProportionSales
                dropdownGroup={dropdownGroup}
                // @ts-ignore
                salesType={salesType}
                loading={loading}
                salesPieData={salesPieData}
                handleChangeSalesType={handleChangeSalesType}
              />
            </ErrorBoundary>
          </Col>
        </Row>
        <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => {}}>
          <OfflineData
            activeKey={activeKey}
            loading={loading}
            offlineData={offlineData}
            offlineChartData={offlineChartData}
            handleTabChange={handleTabChange}
          />
        </ErrorBoundary>
      </React.Fragment>
    </GridContent>
  )
}
