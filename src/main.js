import Vue from 'vue'
import iView from 'iview'
import VueRouter from 'vue-router'
import {store} from './store/index'
import Routers from './router'
import Util from './libs/util'
import App from './app.vue'
import 'iview/dist/styles/iview.css'

Vue.use(VueRouter)
Vue.use(iView)

// 路由配置
const RouterConfig = {
    mode: 'history',
    routes: Routers
}
const router = new VueRouter(RouterConfig)

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    Util.title(to.meta.title);
    next();
    //if(to.matched.some(record => record.meta.requiresAuth)){
    //    if(store.getters.token){
    //        next()
    //    }else{
    //        next({name: 'login'})
    //    }
    //}else{
    //    next();
    //}
})

router.afterEach((to, from, next) => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
})

new Vue({
    el: '#app',
    store,
    router: router,
    render: h => h(App)
});
