import Read from '../pages/Read/Read.vue'
import Chat from '../pages/Chat/Chat.vue'
import Write from '../pages/Write/Write.vue'
import ReadBlock from '../Block/ReadBlock.vue'
import WebBlock from '../Block/WebBlock.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import Demo from '../pages/Demo.vue'
import Knowledge from '../pages/Knowledge/Knowledge.vue'
import Login from '@renderer/pages/Login/Login.vue'
import { checkUser } from '@renderer/api/app'
import Help from '@renderer/pages/Help/Help.vue'
import Setting from '@renderer/pages/Setting/Setting.vue'
const routes = [
  {
    path: '/',
    redirect: '/Login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/demo',
    component: Demo
  },
  {
    path: '/read',
    component: Read
    // children: [
    //   { path: '', component: ReadBlock },
    //   {
    //     path: 'web',
    //     component: WebBlock,
    //     props: (route): { text: string; type: string } => ({
    //       text: route.query.text,
    //       type: route.query.type
    //     })
    //   }
    // ]
  },
  { path: '/chat', component: Chat },
  { path: '/write', component: Write },
  { path: '/knowledge', component: Knowledge },
  { path: '/help', component: Help },
  { path: '/setting', component: Setting }
]
const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes // `routes: routes` 的缩写
})
let isAuthenticated = true
router.beforeEach(async (to, from) => {
  try {
    await checkUser()
    isAuthenticated = true
  } catch (error) {
    isAuthenticated = false
  }
  if (!isAuthenticated && to.path !== '/login') {
    // 将用户重定向到登录页面
    return { path: '/login' }
  }
})
export default router
