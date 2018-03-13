import Vue from 'vue'
import Router from 'vue-router'
const Recommend = resolve => require(['components/recommend/recommend'], resolve)
const Rank = resolve => require(['components/rank/rank'], resolve)
const Search = resolve => require(['components/search/search'], resolve)
const Singer = resolve => require(['components/singer/singer'], resolve)
const SingerDetail = resolve => require(['components/singer-detail/singer-detail'], resolve)
const Disc = resolve => require(['components/disc/disc'], resolve)
const TopList = resolve => require(['components/top-list/top-list'], resolve)
const UserCenter = resolve => require(['components/user-center/user-center'], resolve)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      name: '推荐',
      component: Recommend,
      children: [
        {path: ':id', component: Disc}
      ]
    },
    {
      path: '/rank',
      name: '排行',
      component: Rank,
      children: [
        {path: ':id', component: TopList}
      ]
    },
    {
      path: '/search',
      name: '搜索',
      component: Search,
      children: [
        {path: ':id', component: SingerDetail, name: '详情页面'}
      ]
    },
    {
      path: '/singer',
      name: '歌手',
      component: Singer,
      children: [
        {path: ':id', component: SingerDetail, name: '详情页面'}
      ]
    },
    {
      path: '/user',
      component: UserCenter
    }
  ]
})
