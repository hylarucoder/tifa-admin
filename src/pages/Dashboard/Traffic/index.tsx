import { EllipsisOutlined } from '@ant-design/icons'
import { Col, Dropdown, Menu, Row } from 'antd'
import React, { Component, Dispatch, Suspense } from 'react'
import { GridContent } from '@ant-design/pro-layout'
import { RadioChangeEvent } from 'antd/es/radio'
import { RangePickerProps } from 'antd/es/date-picker/generatePicker'
import moment from 'moment'

import PageLoading from './components/PageLoading'
import { getTimeDistance } from './utils/utils'
import { AnalysisData } from './data'
import styles from './style.less'
import { getFakeChartData } from '@/pages/Dashboard/Traffic/_mock'

const IntroduceRow = React.lazy(() => import('./components/IntroduceRow'))
const SalesCard = React.lazy(() => import('./components/SalesCard'))
const TopSearch = React.lazy(() => import('./components/TopSearch'))
const ProportionSales = React.lazy(() => import('./components/ProportionSales'))
const OfflineData = React.lazy(() => import('./components/OfflineData'))

type RangePickerValue = RangePickerProps<moment.Moment>['value']

interface DashboardAnalysisProps {
  dashboardAnalysis: AnalysisData
  loading: boolean
}

interface DashboardAnalysisState {
  salesType: 'all' | 'online' | 'stores'
  currentTabKey: string
  rangePickerValue: RangePickerValue
}

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
      rangePickerValue[0].isSame(value[0] as moment.Moment, 'day') &&
      rangePickerValue[1].isSame(value[1] as moment.Moment, 'day')
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
        <Suspense fallback={<PageLoading />}>
          <IntroduceRow loading={loading} visitData={visitData} />
        </Suspense>
        <Suspense fallback={null}>
          <SalesCard
            rangePickerValue={rangePickerValue}
            salesData={salesData}
            isActive={isActive}
            handleRangePickerChange={handleRangePickerChange}
            loading={loading}
            selectDate={selectDate}
          />
        </Suspense>
        <Row
          gutter={24}
          style={{
            marginTop: 24,
          }}
        >
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Suspense fallback={null}>
              <TopSearch
                loading={loading}
                visitData2={visitData2}
                searchData={searchData}
                dropdownGroup={dropdownGroup}
              />
            </Suspense>
          </Col>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Suspense fallback={null}>
              <ProportionSales
                dropdownGroup={dropdownGroup}
                // @ts-ignore
                salesType={salesType}
                loading={loading}
                salesPieData={salesPieData}
                handleChangeSalesType={handleChangeSalesType}
              />
            </Suspense>
          </Col>
        </Row>
        <Suspense fallback={null}>
          <OfflineData
            activeKey={activeKey}
            loading={loading}
            offlineData={offlineData}
            offlineChartData={offlineChartData}
            handleTabChange={handleTabChange}
          />
        </Suspense>
      </React.Fragment>
    </GridContent>
  )
}
