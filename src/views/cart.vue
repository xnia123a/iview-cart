<template>
    <div>
        <template>
            <Table :columns="columns" :data="data"></Table>
            <Button type="primary" style="margin-top: 20px; float:right; margin-left: 20px">结算</Button>
            <div style="width: 150px;margin-top: 20px;float:right; ">
                <b>总金额:</b><Input readonly  placeholder="" style="width: 90px; margin-left: 20px;" :value="total"></Input>
            </div>
        </template>
    </div>
</template>

<script>
    export default {
        created () {
                this.data =  this.$store.getters.getAdded
        },
        computed: {
            allProducts () {
                this.data = this.$store.getters.getAdded
            },
            total () {
              return '￥'+this.data.reduce((total, p) => {
                return total + p.price * p.quantity
              }, 0)
            }
        },
        data () {
            return {
                columns: [
                    {
                        title: '商品',
                        key: 'title'
                    },
                    {
                        title: '价格',
                        key: 'price',
                        render: (h, params) => {
                            return h('div', [
                                h('Icon', {
                                    props: {
                                        type: 'social-yen'
                                    }
                                }),
                                h('strong', params.row.price),

                            ]);
                        }
                    },
                    {
                        title: '数量',
                        key: 'quantity'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 200,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small',
                                        icon: 'plus',
                                        disabled: (params.row.inventory == 0) ? true : false
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.add(params.row)
                                        }
                                    }
                                }),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small',
                                        icon: 'minus',
                                        disabled: (params.row.quantity == 0) ? true : false
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.row)
                                        }
                                    }
                                })
                            ]);
                        }
                    }
                ],
                data: []
            }
        },
        methods: {
            add: function(production) {
                production.quantity = 1
                this.$store.dispatch('addToCart', production)
            },

            remove: function(production) {
                this.$store.dispatch('cacelCart', production)
            },
        },

        beforeRouteEnter (to, from, next) {
            next(vm => {
                let _this = vm;
                _this.$parent.application = '购物车';
            });
        }
    }
</script>
