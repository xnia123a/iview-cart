<template>
    <div>
        <template>

            <Table border :columns="columns" :data="data"></Table>

            <Modal
                    v-model="modal1"
                    title="商品数据详情"
                    @on-ok="okBuy">
                <p>商品：{{ buy_object.title }}</p>
                <p>价格：￥{{ buy_object.price }}</p>
                <p>剩余数量：{{buy_object.inventory}}</p>
                <p>购买数量：<Input v-model="buy_number" style="width: 50px" number ></Input></p>
            </Modal>

        </template>
    </div>
</template>

<script>
    import * as shop from '../api/shop.js'
    import { mapActions, mapGetters} from 'vuex'
    export default {
        watch: {
            buy_number: function () {
                if(this.buy_object && (this.buy_object.inventory < this.buy_number)) {
                    this.$Message.info('购买的数量有误')
                    this.buy_number = this.buy_object.inventory
                }
            }
        },
        created () {
                this.data =  this.$store.getters.allProducts
        },
        computed: {
            allProducts () {
                this.data = this.$store.getters.allProducts
            }
        },

        data () {
            return {
                modal1: false,
                buy_object: {},
                buy_number: 1,
                columns: [
                    {
                        title: '商品',
                        key: 'title',
                        render: (h, params) => {
                            return h('div', [
                                h('strong', params.row.title)
                            ]);
                        }
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
                        key: 'inventory'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 100,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small',
                                        disabled: (params.row.inventory == 0) ? true : false
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.modal1 = true
                                            this.buy_object = params.row

                                        }
                                    }
                                }, '添加')
                            ]);
                        }
                    }
                ],
                data: []
            }
        },
        methods: {
            remove (index) {
                this.data.splice(index, 1)
            },
            okBuy () {
                if(this.buy_object.inventory < this.buy_number) {
                   this.$Message.info('购买失败，添加的数量有误222')
                   return
                } else {
                    this.buy_object.quantity = this.buy_number
                    this.$store.dispatch('addToCart', this.buy_object)
                    this.buy_number = 1
                    this.buy_object = {}
                }
            },

        },

        beforeRouteEnter (to, from, next) {
            next(vm => {
                let _this = vm;
                _this.$parent.application = '商品中心';
            });
        }
    }
</script>
