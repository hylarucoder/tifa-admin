import React from 'react'
import { Yuan as OldYuan } from '../components/Charts'

/**
 * 减少使用 dangerouslySetInnerHTML
 */
export default class Yuan extends React.Component<{
  children: React.ReactText
}> {
  main: HTMLSpanElement | undefined | null = null

  componentDidMount() {
    this.renderToHtml()
  }

  componentDidUpdate() {
    this.renderToHtml()
  }

  renderToHtml = () => {
    const { children } = this.props
    if (this.main) {
      this.main.innerHTML = OldYuan(children)
    }
  }

  render() {
    return (
      <span
        ref={(ref) => {
          this.main = ref
        }}
      />
    )
  }
}
