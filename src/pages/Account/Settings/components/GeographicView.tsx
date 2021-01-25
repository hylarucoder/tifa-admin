import React, { Component } from 'react'
import { Select, Spin } from 'antd'
import { LabeledValue } from 'antd/es/select'
import { GeographicItemType } from '../data'
import styles from './GeographicView.module.less'

const { Option } = Select

const nullSelectItem: LabeledValue = {
  label: '',
  value: '',
  key: '',
}

const GeographicView = () => {
  const getProvinceOption = () => {
    // const { province } = this.props
    // if (province) {
    //   return this.getOption(province)
    // }
    return []
  }

  const getCityOption = () => {
    // const { city } = this.props
    // if (city) {
    //   return this.getOption(city)
    // }
    return []
  }

  const getOption = (list: GeographicItemType[]) => {
    if (!list || list.length < 1) {
      return (
        <Option key={0} value={0}>
          没有找到选项
        </Option>
      )
    }
    return list.map((item) => (
      <Option key={item.id} value={item.id}>
        {item.name}
      </Option>
    ))
  }

  const selectProvinceItem = (item: LabeledValue) => {}

  const selectCityItem = (item: LabeledValue) => {}

  const conversionObject = () => {
    return {
      province: nullSelectItem,
      city: nullSelectItem,
    }
  }

  const { province, city } = conversionObject()
  const loading = false

  return (
    <Spin spinning={loading} wrapperClassName={styles.row}>
      <Select
        className={styles.item}
        value={province}
        labelInValue
        showSearch
        onSelect={selectProvinceItem}
      >
        {getProvinceOption()}
      </Select>
      <Select
        className={styles.item}
        value={city}
        labelInValue
        showSearch
        onSelect={selectCityItem}
      >
        {getCityOption()}
      </Select>
    </Spin>
  )
}

export default GeographicView
