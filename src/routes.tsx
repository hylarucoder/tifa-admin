import React, { lazy, LazyExoticComponent } from 'react'
import BasicLayout from '@/layout/BasicLayout'

type RouteNode = {
  path: string
  name: string
  icon?: string
  component: React.ComponentType | React.FC | LazyExoticComponent<any> | JSX.Element
  permission?: string
  isMultiPanel?: boolean
  keepAlive?: boolean
  routes?: RouteNode[]
}

export const layoutRoutes: RouteNode[] = [
  {
    path: '/welcome',
    name: '欢迎页面',
    icon: 'smile',
    component: lazy(() => import(/* webpackChunkName: "Welcome" */ '@/pages/Welcome')),
  },
  {
    path: '/dashboard',
    name: '仪表盘',
    icon: 'crown',
    component: BasicLayout,
    routes: [
      {
        name: 'Analytic',
        icon: 'smile',
        path: '/dashboard/analytic',
        component: lazy(() => import('@/pages/Dashboard/Analytic')),
      },
      {
        name: 'Monitor',
        icon: 'smile',
        path: '/dashboard/monitor',
        component: lazy(() => import('@/pages/Dashboard/Monitor')),
      },
      {
        name: 'Workspace',
        icon: 'smile',
        path: '/dashboard/workplace',
        component: lazy(() => import('@/pages/Dashboard/Workplace')),
      },
    ],
  },
  {
    path: '/biz_process',
    name: '个人办公',
    icon: 'crown',
    component: BasicLayout,
    routes: [
      {
        name: '我的任务',
        icon: 'smile',
        path: '/biz_process/tasks',
        component: lazy(() => import('@/pages/BizProcess/Tasks')),
      },
      {
        name: '发起流程',
        icon: 'smile',
        path: '/biz_process/process',
        component: lazy(() => import('@/pages/BizProcess/Process')),
      },
      {
        name: '我的抄送',
        icon: 'smile',
        path: '/biz_process/cc',
        component: lazy(() => import('@/pages/BizProcess/CC')),
      },
    ],
  },
  {
    path: '/process',
    name: '流程设计',
    icon: 'crown',
    component: BasicLayout,
    routes: [
      {
        name: '流程设计',
        icon: 'smile',
        path: '/process/design',
        component: lazy(() => import('@/pages/Process/Design')),
      },
      {
        name: '流程监听',
        icon: 'smile',
        path: '/process/listener',
        component: lazy(() => import('@/pages/Process/Listener')),
      },
      {
        name: '流程表达式',
        icon: 'smile',
        path: '/process/expression',
        component: lazy(() => import('@/pages/Process/Expression')),
      },
    ],
  },
  {
    path: '/dynamic_form',
    name: '表单设计',
    icon: 'crown',
    component: BasicLayout,
    routes: [
      {
        name: '表单设计器',
        icon: 'smile',
        path: '/dynamic_form/design',
        component: lazy(() => import('@/pages/DynamicForm/Design')),
      },
      {
        name: '表单设计模板',
        icon: 'smile',
        path: '/dynamic_form/template',
        component: lazy(() => import('@/pages/DynamicForm/Template')),
      },
    ],
  },
  {
    path: '/online_dev',
    name: '在线开发',
    icon: 'crown',
    component: BasicLayout,
    routes: [
      {
        name: '表单开发',
        icon: 'smile',
        path: '/online_dev/form',
        component: lazy(() => import('@/pages/OnlineDev/Form')),
      },
      {
        name: '报表配置',
        icon: 'smile',
        path: '/online_dev/report',
        component: lazy(() => import('@/pages/OnlineDev/Report')),
      },
      {
        name: '图表配置',
        icon: 'smile',
        path: '/online_dev/chart',
        component: lazy(() => import('@/pages/OnlineDev/Chart')),
      },
      {
        name: '组合仪表盘',
        icon: 'smile',
        path: '/online_dev/dashboard',
        component: lazy(() => import('@/pages/OnlineDev/Dashboard')),
      },
      {
        name: '系统编码生成规则',
        icon: 'smile',
        path: '/online/rule_code_gen',
        component: lazy(() => import('@/pages/OnlineDev/RuleCodeGen')),
      },
      {
        name: '系统编码校验规则',
        icon: 'smile',
        path: '/online/rule_code_validator',
        component: lazy(() => import('@/pages/OnlineDev/RuleCodeValidator')),
      },
    ],
  },
  {
    path: '/dashboard',
    name: '仪表盘设计',
    icon: 'crown',
    component: BasicLayout,
    routes: [
      {
        name: '表单设计器',
        icon: 'smile',
        path: '/dashboard/forms',
        component: lazy(() => import('@/pages/BizProcess/Tasks')),
      },
      {
        name: '表单设计模板',
        icon: 'smile',
        path: '/dashboard/templates',
        component: lazy(() => import('@/pages/BizProcess/Tasks')),
      },
    ],
  },
  {
    path: '/system',
    name: '系统管理',
    icon: 'crown',
    component: BasicLayout,
    routes: [
      {
        name: '用户管理',
        icon: 'smile',
        path: '/system/user',
        component: lazy(() => import('@/pages/System/User')),
      },
      {
        name: '菜单管理',
        icon: 'smile',
        path: '/system/menu',
        component: lazy(() => import('@/pages/System/Menu')),
      },
      {
        name: '角色管理',
        icon: 'smile',
        path: '/system/role',
        component: lazy(() => import('@/pages/System/Role')),
      },
      {
        name: '部门管理',
        icon: 'smile',
        path: '/system/department',
        component: lazy(() => import('@/pages/System/Department')),
      },
      {
        name: '我的部门',
        icon: 'smile',
        path: '/system/my_department',
        component: lazy(() => import('@/pages/System/MyDepartment')),
      },
      {
        name: '职务管理',
        icon: 'smile',
        path: '/system/position',
        component: lazy(() => import('@/pages/System/Position')),
      },
      {
        name: '数据字典',
        icon: 'smile',
        path: '/system/dictionary',
        component: lazy(() => import('@/pages/System/Dictionary')),
      },
      {
        name: '分类字典',
        icon: 'smile',
        path: '/system/category',
        component: lazy(() => import('@/pages/System/Category')),
      },
      {
        name: '系统通告',
        icon: 'smile',
        path: '/system/announcement',
        component: lazy(() => import('@/pages/System/Announcement')),
      },
      {
        name: '租户管理',
        icon: 'smile',
        path: '/system/tenant',
        component: lazy(() => import('@/pages/System/Tenant')),
      },
    ],
  },
  {
    path: '/monitor',
    name: '系统监控',
    icon: 'crown',
    component: BasicLayout,
    routes: [
      {
        name: '数据源管理',
        icon: 'smile',
        path: '/monitor/data_sources',
        component: lazy(() => import('@/pages/Monitor/DataSources')),
      },
      {
        name: '定时任务',
        icon: 'smile',
        path: '/monitor/jobs',
        component: lazy(() => import('@/pages/Monitor/Jobs')),
      },
      {
        name: '数据日志',
        icon: 'smile',
        path: '/monitor/data_log',
        component: lazy(() => import('@/pages/Monitor/DataLog')),
      },
      {
        name: 'SQL监控',
        icon: 'smile',
        path: '/monitor/sql',
        component: lazy(() => import('@/pages/Monitor/PerformanceSQL')),
      },
      {
        name: '日志管理',
        icon: 'smile',
        path: '/monitor/log_manager',
        component: lazy(() => import('@/pages/Monitor/LogManager')),
      },
      {
        name: '性能监控 - Redis',
        icon: 'smile',
        path: '/monitor/redis',
        component: lazy(() => import('@/pages/Monitor/PerformanceRedis')),
      },
      {
        name: '性能监控 - 请求',
        icon: 'smile',
        path: '/monitor/request',
        component: lazy(() => import('@/pages/Monitor/PerformanceRequest')),
      },
      {
        name: '性能监控 - 虚拟机',
        icon: 'smile',
        path: '/monitor/python',
        component: lazy(() => import('@/pages/Monitor/PerformancePython')),
      },
      {
        name: '性能监控 - 服务器',
        icon: 'smile',
        path: '/monitor/server',
        component: lazy(() => import('@/pages/Monitor/PerformanceServer')),
      },
      {
        name: '性能监控 - Gunicorn',
        icon: 'smile',
        path: '/monitor/gunicorn',
        component: lazy(() => import('@/pages/Monitor/PerformanceGunicorn')),
      },
      {
        name: '性能监控 - 磁盘',
        icon: 'smile',
        path: '/monitor/disk',
        component: lazy(() => import('@/pages/Monitor/PerformanceDisk')),
      },
    ],
  },
  {
    path: '/account',
    name: '我的账户',
    icon: 'crown',
    component: BasicLayout,
    routes: [
      {
        name: '账户设置',
        icon: 'smile',
        path: '/account/settings',
        component: lazy(() => import('@/pages/Account/Settings')),
      },
    ],
  },
]
