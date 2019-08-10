import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },

  {
    path: '/market',
    component: Layout,
    name: 'Market',
    meta: {
      title: '市场风险指数',
      icon: 'dashboard'
    },
    children: [
      {
        path: 'price',
        component: () => import('@/views/dashboard/index'),
        name: 'MarketPrice',
        meta: {
          title: '价格风险指数',
          icon: 'dashboard'
        }
      },
      {
        path: 'deal',
        component: () => import('@/views/dashboard/index'),
        name: 'MarketDeal',
        meta: {
          title: '交易量风险指数',
          icon: 'dashboard'
        }
      }
    ]
  },

  {
    path: '/industry',
    component: Layout,
    name: 'Industry',
    meta: {
      title: '行业风险指数',
      icon: 'dashboard'
    },
    children: [
      {
        path: 'price',
        component: () => import('@/views/dashboard/index'),
        name: 'IndustryPrice',
        meta: {
          title: '价格风险指数',
          icon: 'dashboard'
        }
      },
      {
        path: 'deal',
        component: () => import('@/views/dashboard/index'),
        name: 'IndustryDeal',
        meta: {
          title: '交易量风险指数',
          icon: 'dashboard'
        }
      }
    ]
  },

  {
    path: '/stock',
    component: Layout,
    name: 'Stock',
    meta: {
      title: '个股风险指数',
      icon: 'dashboard'
    },
    children: [
      {
        path: 'group',
        component: () => import('@/views/dashboard/index'),
        name: 'StockGroup',
        meta: {
          title: '模拟组合个股价格、交易量风险指数',
          icon: 'dashboard'
        }
      },
      {
        path: 'single',
        component: () => import('@/views/dashboard/index'),
        name: 'StockSingle',
        meta: {
          title: '单只个股价格、交易量风险指数',
          icon: 'dashboard'
        }
      }
    ]
  },

  {
    path: '/recommand',
    component: Layout,
    name: 'Recommand',
    meta: {
      title: '个股推荐',
      icon: 'dashboard'
    },
    children: [
      {
        path: 'pe',
        component: () => import('@/views/dashboard/index'),
        name: 'RecommandPriceEarning',
        meta: {
          title: '每日市盈率新低个股',
          icon: 'dashboard'
        }
      },
      {
        path: 'history',
        component: () => import('@/views/dashboard/index'),
        name: 'RecommandHistory',
        meta: {
          title: '每日历史新高个股',
          icon: 'dashboard'
        }
      },
      {
        path: 'macd',
        component: () => import('@/views/dashboard/index'),
        name: 'RecommandMACD',
        meta: {
          title: '每日MACD金叉个股',
          icon: 'dashboard'
        }
      }
    ]
  },

  {
    path: '/deal',
    component: Layout,
    name: 'Deal',
    meta: {
      title: '交易',
      icon: 'dashboard'
    },
    children: [
      {
        path: 'stock',
        component: () => import('@/views/dashboard/index'),
        name: 'DealStock',
        meta: {
          title: '个股买进、卖出',
          icon: 'dashboard'
        }
      },
      {
        path: 'history',
        component: () => import('@/views/dashboard/index'),
        name: 'DealHistory',
        meta: {
          title: '历史成交、收益率',
          icon: 'dashboard'
        }
      }
    ]
  },

  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    alwaysShow: true, // will always show the root menu
    name: 'Permission',
    meta: {
      title: 'Permission',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page'),
        name: 'PagePermission',
        meta: {
          title: 'Page Permission',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive'),
        name: 'DirectivePermission',
        meta: {
          title: 'Directive Permission'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'role',
        component: () => import('@/views/permission/role'),
        name: 'RolePermission',
        meta: {
          title: 'Role Permission',
          roles: ['admin']
        }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
