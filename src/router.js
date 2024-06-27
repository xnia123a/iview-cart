const routers = [
    {
        path: '/',
        meta: {
            title: '首页'
        },
        component: (resolve) => require(['./views/layout.vue'], resolve),
        children: [
            {
                name: 'home',
                path: '/',
                component: (resolve) => require(['./views/production.vue'], resolve),
            },
            {
                name: 'cart',
                path: 'cart',
                meta: { requiresAuth: true },
                component: (resolve) => require(['./views/cart.vue'], resolve),
            },
            {
                name: 'info',
                path: 'info',
                meta: { requiresAuth: true },
                component: (resolve) => require(['./views/info.vue'], resolve),
            },
            {
                name: 'login',
                path: 'login',
                component: (resolve) => require(['./views/login.vue'], resolve),
            }
        ]

    }
];
export default routers;