<template>
    <div >
    <!-- 子路由出口 -->
        <router-view />
    <!-- /子路由出口 -->

    <!-- 标签导航页 -->
    <!-- route开启路由模式 -->
    <van-tabbar   route>
        <van-tabbar-item to="/home">
          <i slot="icon" class="toutiao toutiao-shouye"></i>
          <span class="text">首页</span>
        </van-tabbar-item>
        <van-tabbar-item to="/qa">
          <i slot="icon" class="toutiao toutiao-wenda"></i>
          <span class="text">问答</span>
        </van-tabbar-item>
        <van-tabbar-item to="/video">
          <i slot="icon" class="toutiao toutiao-shipin"></i>
          <span class="text">视频</span>
        </van-tabbar-item>
        <van-tabbar-item to="/my">
          <i slot="icon" class="toutiao toutiao-wode"></i>
          <span class="text">{{ $store.state.user ? '我的' : '未登录' }}</span>
        </van-tabbar-item>
</van-tabbar>
    <!-- /标签导航页 -->
    </div>
</template>

<script>
export default {
  name: 'LayIndex',

  data () {
    return {

    }
  },

  mounted () {

  },

  methods: {

  }
}
</script>

<style scoped lang="less">

</style>
