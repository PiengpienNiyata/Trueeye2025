import { createRouter, createWebHistory } from 'vue-router';
import UserView from '../components/UserView/UserBody.vue';
import UserInfo from '../components/UserView/UserInfo.vue';
import UserCreate from '../components/UserView/UserCreate.vue';
import SiteView from '../components/SiteView/SiteBody.vue';
import AttributeView from '../components/AttributeView/AttributeBody.vue';
import LoginView from '../components/LoginView/LoginBody.vue';
import DashboardView from '@/components/DashboardView/DashboardBody.vue';
import TestingView from '@/components/TestView/TestBody.vue';
import CreditView from '@/components/CreditView/CreditBody.vue';
import SummarizeView from '@/components/SummarizeView/SummarizeBody.vue';

const routes = [
  {
    path: '/', // Default path (root)
    redirect: '/login', // Redirect to login
  },
  {
    path: '/user',
    name: 'user',
    component: UserView,
  },
  {
    path: '/user/:id',
    name: 'userinfo',
    component: UserInfo,
  },
  {
    path: '/user/create',
    name: 'usercreate',
    component: UserCreate,
  },
  {
    path: '/site',
    name: 'siteView',
    component: SiteView,
  },
  {
    path: '/site/:id',
    name: 'site',
    component: SiteView,
  },
  {
    path: '/attribute',
    name: 'attribute',
    component: AttributeView,
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
  },
  {
    path: '/testing',
    name: 'testing',
    component: TestingView,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/credit',
    name: 'credit',
    component: CreditView,
  },
  {
    path: '/summarize',
    name: 'summarize',
    component: SummarizeView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;