
import Chat from './pages/chat.vue'
import Index from './pages/index.vue'
import Main from './pages/main.vue'
const routes = [

    { 
        path: '/chat', 
        component: Chat 
    }, 
    { 
        path: '/', 
        component: Index 
    }, 
    { 
        path: '/main', 
        component: Main 
    }, 
];
export default routes;
    