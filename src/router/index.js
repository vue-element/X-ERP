import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)
/* Layout */
import Layout from '../views/layout/Layout'

/**
hidden: true                  当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面(默认 false)
redirect: noredirect          当设置 noredirect 的时候该路由不会在面包屑导航中出现
name:'router-name'            设定路由的名字，一定要填写不然 使用 <keep-alive> 时会出现各种问题
meta : {
  role: ['admin','editor']   设置该路由进入的权限，支持多个权限叠加
  title: 'title'             设置该路由在侧边栏和面包屑中展示的名字
  icon: 'svg-name'           设置该路由的图标
  noCache: true              如果设置为true ,则不会被 <keep-alive> 缓存(默认 false)
}
**/
// constantRouterMap 代表那些不需要动态判断权限的路由，如登录页，404，等通用页面。
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/authredirect', component: _import('login/authredirect'), hidden: true },
  { path: '/404', component: _import('errorPage/404'), hidden: true },
  { path: '/401', component: _import('errorPage/401'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      component: _import('dashboard/index'),
      name: 'dashboard',
      meta: { title: '首页', icon: 'dashboard', noCache: true }
    }]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
// asyncRouterMap 代表那些需求动态判断权限并通过 addRouters 动态添加的页面。具体的会在 权限判断 页面介绍。
export const asyncRouterMap = [
  // 基础管理
  { path: '/basic', component: Layout, redirect: 'noredirect', name: 'basic', meta: { title: '基础管理', icon: 'pCenter' },
    children: [
      { path: 'user', component: _import('basic/user/index'), name: 'user', meta: { title: '用户管理' }},
      { path: 'organization', component: _import('basic/organization/index'), name: 'organization', meta: { title: '组织架构管理' }}
    ]
  },
  // 市场管理
  { path: '/market', component: Layout, redirect: 'noredirect', name: 'market', meta: { title: '市场管理', icon: 'person', role: ['sc'] },
    children: [
      { path: 'customer', component: _import('market/customer/index'), name: 'customer', meta: { title: '客户信息' }},
      { path: 'smart-community', component: _import('market/smartCommunity/index'), name: 'smartCommunity', meta: { title: '智慧社区数据库' }},
      { path: 'business-opportunity', component: _import('market/businessOpportunity/index'), name: 'businessOpportunity', meta: { title: '商机管理' }},
      { path: 'bid-manage', component: _import('market/bidManage/index'), name: 'bidManage', meta: { title: '投标报价管理' }}
    ]
  },
  // 财务管理
  { path: '/financial', component: Layout, redirect: 'noredirect', name: 'financial', meta: { title: '财务管理', icon: 'money', role: ['cw'] },
    children: [
      { path: 'contractInfo', component: _import('financial/contractInfo/index'), name: 'contractInfo', meta: { title: '合同信息管理' }},
      { path: 'billing', component: _import('financial/billing/index'), name: 'contrctBilling', meta: { title: '合同开票管理' }},
      { path: 'received', component: _import('financial/received/index'), name: 'received', meta: { title: '合同回款管理' }},
      { path: 'payment', component: _import('financial/payment/index'), name: 'payment', meta: { title: '合同付款管理' }},
      { path: 'scheduleManage', component: _import('financial/scheduleManage/index'), name: 'scheduleManage', meta: { title: '项目进度管理' }},
      { path: 'scheduleAnalysis', component: _import('financial/scheduleAnalysis/index'), name: 'scheduleAnalysis', meta: { title: '项目进度分析' }}
    ]
  },
  // 成本管理
  { path: '/cost', component: Layout, redirect: 'noredirect', name: 'cost', meta: { title: '成本管理', icon: 'cost', role: ['cw'] },
    children: [
      { path: 'supplier', component: _import('cost/supplierInfo/index'), name: 'supplier', meta: { title: '供应商管理' }},
      { path: 'price-system', component: _import('cost/priceSystem/index'), name: 'priceSystem', meta: { title: '价格体系管理' }},
      { path: 'payment-contract', component: _import('cost/paymentContract/index'), name: 'paymentContract', meta: { title: '付款合同管理' }},
      { path: 'purchase-contract', component: _import('cost/purchaseContract/index'), name: 'purchaseContract', meta: { title: '采购合同管理' }},
      { path: '/cost/storage-manage', component: _import('cost/storageManage/index'), name: 'storageManage', meta: { title: '出入库管理' },
        children: [
          { path: 'inbound', component: _import('cost/storageManage/inbound/index'), name: 'inbound', meta: { title: '入库管理' }},
          { path: 'outbound', component: _import('cost/storageManage/outbound/index'), name: 'outbound', meta: { title: '出库管理' }}
        ]
      }
    ]
  },
  // 工程管理
  { path: '/engineering', component: Layout, redirect: 'noredirect', name: 'engineering', meta: { title: '工程管理', icon: 'engineering', role: ['cw'] },
    children: [
      { path: 'engineer', component: _import('engineering/projectCenter/index'), name: 'engineer', meta: { title: '项目管理中心' }},
      { path: 'bidding', component: _import('engineering/biddingManagement/index'), name: 'bidding', meta: { title: '劳务招标管理' }},
      { path: 'temporary', component: _import('engineering/temporaryEmployment/index'), name: 'temporary', meta: { title: '临时用工管理' }}
    ]
  },
  { path: '/permission', component: Layout,
    hidden: true,
    redirect: '/permission/index',
    meta: {
      role: ['admin']
    },
    children: [{
      path: 'index',
      component: _import('permission/index'),
      name: 'permission',
      meta: {
        title: '权限测试页',
        icon: 'lock',
        role: ['admin']
      }
    }]
  },
  {
    path: '/error',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    name: 'errorPages',
    meta: {
      title: '错误页面',
      icon: '404'
    },
    children: [
      { path: '401', component: _import('errorPage/401'), name: 'page401', meta: { title: '401', noCache: true }},
      { path: '404', component: _import('errorPage/404'), name: 'page404', meta: { title: '404', noCache: true }}
    ]
  },
  { path: '/excel',
    component: Layout,
    hidden: true,
    redirect: '/excel/export-excel',
    name: 'excel',
    meta: {
      title: 'excel',
      icon: 'excel'
    },
    children: [
      { path: 'export-excel', component: _import('excel/exportExcel'), name: 'exportExcel', meta: { title: 'export excel' }},
      { path: 'export-selected-excel', component: _import('excel/selectExcel'), name: 'selectExcel', meta: { title: 'select excel' }},
      { path: 'upload-excel', component: _import('excel/uploadExcel'), name: 'uploadExcel', meta: { title: 'upload excel' }}
    ]
  },
  { path: '/i18n',
    component: Layout,
    hidden: true,
    children: [{ path: 'index', component: _import('i18n-demo/index'), name: 'i18n', meta: { title: '国际化', icon: 'international' }}]
  },
  { path: '*', redirect: '/404', hidden: true }
]
