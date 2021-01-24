import React, { Component } from 'react'
import { Select, Spin } from 'antd'
import { LabeledValue } from 'antd/es/select'
import { GeographicItemType } from '../data'
import styles from './GeographicView.less'

const { Option } = Select

const nullSelectItem: LabeledValue = {
  label: '',
  value: '',
  key: '',
}

class GeographicView extends Component {
  componentDidMount = () => {}

  componentDidUpdate(props: any) {}

  getProvinceOption() {
    // const { province } = this.props
    // if (province) {
    //   return this.getOption(province)
    // }
    return []
  }

  getCityOption = () => {
    // const { city } = this.props
    // if (city) {
    //   return this.getOption(city)
    // }
    return []
  }

  getOption = (list: GeographicItemType[]) => {
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

  selectProvinceItem = (item: LabeledValue) => {}

  selectCityItem = (item: LabeledValue) => {}

  conversionObject() {
    return {
      province: nullSelectItem,
      city: nullSelectItem,
    }
  }

  render() {
    const { province, city } = this.conversionObject()
    const loading = false

    return (
      <Spin spinning={loading} wrapperClassName={styles.row}>
        <Select
          className={styles.item}
          value={province}
          labelInValue
          showSearch
          onSelect={this.selectProvinceItem}
        >
          {this.getProvinceOption()}
        </Select>
        <Select
          className={styles.item}
          value={city}
          labelInValue
          showSearch
          onSelect={this.selectCityItem}
        >
          {this.getCityOption()}
        </Select>
      </Spin>
    )
  }
}

export default GeographicView
