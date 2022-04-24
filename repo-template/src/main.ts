import { createApp } from 'vue'
// 从一个单文件组件中导入根组件
import App from './App.vue'
import * as VueRouter from 'vue-router';
import routes from './router-path';

const router = VueRouter.createRouter( {
    routes,
    history: VueRouter.createWebHashHistory()
} );
const app = createApp(App).use( router ).mount( "#app" );