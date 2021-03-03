import React from 'react'
// import styled from 'styled-components'
import Highlight, { defaultProps, Language } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/github'
import { format } from 'sql-formatter'

// const Pre = styled.pre`
//   text-align: left;
//   margin: 1em 0;
//   padding: 0.5em;
//   overflow: scroll;
// `
//
// const Line = styled.div`
//   display: table-row;
// `
//
// const LineNo = styled.span`
//   display: table-cell;
//   text-align: right;
//   padding-right: 1em;
//   user-select: none;
//   opacity: 0.5;
// `
//
// const LineContent = styled.span`
//   display: table-cell;
// `

function shortenSQLSelect(line: string) {
  if (line.startsWith('SELECT ')) {
    line = line.replace(/SELECT (.+?) FROM/gm, 'SELECT * /* 略 */ FORM ')
  }
  return line
}

export const SQLCodeBlock = ({ sql }: { sql: string }) => {
  const formattedSQL = format(sql, { indent: '\xa0\xa0\xa0\xa0' })
  return (
    <Highlight {...defaultProps} theme={theme} code={formattedSQL} language="sql">
      {({ className, style, tokens, getLineProps, getTokenProps }) => <div></div>}
    </Highlight>
  )
}

export const SQLCodeBlockOneLiner = ({ sql }: { sql: string }) => {
  const oneLiner = shortenSQLSelect(sql.replaceAll('\n', ''))
  return (
    <Highlight {...defaultProps} theme={theme} code={oneLiner} language="sql">
      {({ className, style, tokens, getLineProps, getTokenProps }) => <div></div>}
    </Highlight>
  )
}

export const CodeBlock = ({ snippet, language }: { snippet: string; language: Language }) => {
  return (
    <Highlight {...defaultProps} theme={theme} code={snippet} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => <div></div>}
    </Highlight>
  )
}
