import React, { useEffect } from 'react'
import { useLocalObservable } from 'mobx-react'
import { action } from 'mobx'

type PanelIdType =
  | 'VersionsPanel'
  | 'HistoryPanel'
  | 'RequestPanel'
  | 'SQLPanel'
  | 'CachePanel'
  | 'LoggingPanel'
  | 'ProfilingPanel';

export interface TPanel {
  id: PanelIdType;
  title: string;
  subtitle: string;
  ContentVisible: boolean;
}

export type TVersionsPanel = TPanel;

export type THistoryPanel = TPanel;

export type TRequestPanel = TPanel;

export type TSQLPanelQueryTemplateInfoLine = {
  num: number;
  highlight: boolean;
  content: string;
}

export type TSQLPanelQueryTemplateInfo = {
  name: string;
  lines: TSQLPanelQueryTemplateInfoLine[];
}

export type TSQLPanelQuery = {
  isSlow: boolean;
  query: string;
  rgbColor: string;
  similarCount: number;
  similarColor: string;
  duplicateCount: number;
  duplicateColor: string;
  traceColor: string;
  widthRatio: number;
  startOffset: number;
  endOffset: number;
  duration: number;
  isSelect: boolean;
  stacktrace: string;
  templateInfo: TSQLPanelQueryTemplateInfo;
};

export interface TSQLPanel extends TPanel {
  queries: TSQLPanelQuery[];
  timeSpent: number;
  numQueries: number;
  similarCount: number;
  duplicateCount: number;
}

export type TCachePanelCount = {
  name: string;
  value: string;
};

export type TCachePanelCall = {
  time: number;
  name: string;
  args: string;
  kwargs: string;
  backend: string;
  trace: string;
};

export interface TCachePanel extends TPanel {
  totalCalls: number;
  hits: number;
  totalTime: number;
  misses: number;
  counts: TCachePanelCount[];
  calls: TCachePanelCall[];
}

export type TLoggingPanel = TPanel;

export type TProfilingPanel = TPanel;

export type PanelType =
  | TVersionsPanel
  | THistoryPanel
  | TRequestPanel
  | TSQLPanel
  | TCachePanel
  | TLoggingPanel
  | TProfilingPanel;

export interface TInitialState {
  toolbarVisible: boolean;
  VersionsPanel: TVersionsPanel;
  HistoryPanel: THistoryPanel;
  RequestPanel: TRequestPanel;
  SQLPanel: TSQLPanel;
  CachePanel: TCachePanel;
  LoggingPanel: TLoggingPanel;
  ProfilingPanel: TProfilingPanel;
}

export interface MGlobalStore extends TInitialState {
  showToolbar: Function;
  hideToolbar: Function;
  showPanelContent: Function;
  hidePanelContent: Function;
  togglePanelContent: Function;
}

export const INITIAL_STORE: TInitialState = {
  toolbarVisible: true,
  VersionsPanel: {
    id: 'VersionsPanel',
    title: '版本',
    subtitle: 'Flask 1.2.2',
    ContentVisible: false,
  },
  HistoryPanel: {
    id: 'HistoryPanel',
    title: '历史版本',
    subtitle: 'HistoryPanel',
    ContentVisible: false,
  },
  RequestPanel: {
    id: 'RequestPanel',
    title: '请求',
    subtitle: 'CPU 100ms (总耗时: 530ms)',
    ContentVisible: false,
  },
  SQLPanel: {
    id: 'SQLPanel',
    title: 'SQL',
    subtitle: '0 queries in 0 ms',
    timeSpent: 0,
    numQueries: 0,
    similarCount: 0,
    duplicateCount: 0,
    ContentVisible: false,
    queries: [
      {
        isSlow: false,
        query: 'select versions();',
        rgbColor: '#EE2200',
        similarCount: 3,
        similarColor: '#f3f302',
        duplicateCount: 3,
        duplicateColor: '#88ff33',
        traceColor: '#f133ff',
        widthRatio: 10,
        startOffset: 1,
        endOffset: 3,
        duration: 100,
        isSelect: true,
        stacktrace: '# just blank',
        templateInfo: {
          name: 'name',
          lines: [
            {
              num: 1,
              highlight: true,
              content: 'content',
            },
            {
              num: 1,
              highlight: true,
              content: 'content',
            },
          ],
        },
      },
    ],
  },
  CachePanel: {
    id: 'CachePanel',
    title: '缓存',
    subtitle: '0.0 ms 内 3次使用',
    ContentVisible: false,
    totalCalls: 1,
    totalTime: 12,
    hits: 10,
    misses: 10,
    counts: [
      {
        name: '123',
        value: '123',
      },
    ],
    calls: [
      {
        time: 1,
        name: 'name',
        args: 'args',
        kwargs: 'kwargs',
        backend: 'backend',
        trace: 'trace',
      },
    ],
  },
  LoggingPanel: {
    id: 'LoggingPanel',
    title: '日志',
    subtitle: '0条消息',
    ContentVisible: false,
  },
  ProfilingPanel: {
    id: 'ProfilingPanel',
    title: 'Profile',
    subtitle: '0条消息',
    ContentVisible: false,
  },
}
