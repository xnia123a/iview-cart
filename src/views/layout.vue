<style scoped>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
    }
    .layout-logo{
        width: 100px;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        float: left;
        position: relative;
        top: 15px;
        left: 20px;
    }
    .layout-nav{
        width: 420px;
        margin: 0 auto;
    }
    .layout-assistant{
        width: 300px;
        margin: 0 auto;
        height: inherit;
    }
    .layout-breadcrumb{
        padding: 10px 15px 0;
    }
    .layout-content{
        min-height: 200px;
        margin: 15px;
        overflow: hidden;
        background: #fff;
        border-radius: 4px;
    }
    .layout-content-main{
        padding: 10px;
    }
    .layout-copy{
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }
</style>
<template>
    <div class="layout">
        <Menu mode="horizontal" theme="dark" active-name="1">
            <div class="layout-nav">
                <MenuItem name="1">
                    <Icon type="ios-navigate"></Icon>
                    <router-link to="/" style="color: white">首页</router-link>
                </MenuItem>
                <MenuItem name="2">

                    <Icon type="ios-cart"></Icon>
                    <Badge :count="getTotal"  >
                    <router-link to="/cart" style="color: white" >购物车</router-link>
                    </Badge>
                </MenuItem>
                <Dropdown style="margin-left: 20px">
                    <Button type="primary">
                        用户
                        <Icon type="arrow-down-b"></Icon>
                    </Button>
                    <DropdownMenu slot="list">
                        <DropdownItem>登录</DropdownItem>
                        <DropdownItem>退出</DropdownItem>
                        <DropdownItem>详情</DropdownItem>
                    </DropdownMenu>
                </Dropdown>

            </div>
        </Menu>
        <div class="layout-breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem>{{ application }}</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="layout-content">
            <router-view keep-alive></router-view>
        </div>
        <div class="layout-copy">
            2016-2017 &copy; G-Bruin
        </div>
    </div>
</template>
<script>

    export default {
        data () {
            return {
                application: '商品中心'
            }
        },
        computed: {
            getTotal () {
                return this.$store.getters.getTotal
            }
        },
    }
</script>
