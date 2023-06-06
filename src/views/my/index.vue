<template>
    <div class="my-container">
      <!-- 已登陆头部 -->
      <div v-if="user" class="header user-info">
        <div class="base-info">
          <div class="left">
            <van-image
              round
              fit="cover"
              class="avatar"
              src="https://img01.yzcdn.cn/vant/cat.jpeg"
            />
            <span>黑马头条号</span>
          </div>

          <div class="right">
            <van-button size="mini" round>编辑资料</van-button>
          </div>
        </div>
        <div class="data-stats">
          <div class="data-item">
            <span class="count">10</span>
            <span class="text">头条</span>
          </div>
          <div class="data-item">
            <span class="count">10</span>
            <span class="text">关注</span>
          </div>
          <div class="data-item">
            <span class="count">10</span>
            <span class="text">粉丝</span>
          </div>
          <div class="data-item">
            <span class="count">10</span>
            <span class="text">获赞</span>
          </div>
        </div>
      </div>
      <!-- /已登陆头部 -->
      <!-- 未登陆头部 -->
      <div v-else class="header not-login">
        <div class="login-btn" @click="$router.push('/login')">
          <img class="mobile-img" src="@/assets/mobile.png" alt="" >
          <span class="text">登陆 / 注册</span>
        </div>
      </div>
      <!-- /未登陆头部 -->

      <!-- 导航 -->
      <van-grid class="grid-nav" :column-num="2" clickable>
        <van-grid-item class="grid-item">
          <i slot="icon" class="toutiao toutiao-shoucang"></i>
          <span slot="text" class="text">收藏</span>
        </van-grid-item>
        <van-grid-item class="grid-item">
          <i slot="icon" class="toutiao toutiao-lishi"></i>
          <span slot="text" class="text">历史</span>
        </van-grid-item>
      </van-grid>
      <!-- /导航 -->

      <!-- 消息通知，小志同学，退出登录 -->
      <van-cell title="消息通知"  is-link/>
      <van-cell title="小志同学"  is-link class="cmd9"/>
      <van-cell  v-if="user"
          class="lgout-cell"
          title="退出登录"
          @click="onLayout"
          clickable/>
    </div>
</template>

<script>
import { getUserInfo } from '@/api/user'
import { mapState } from 'vuex'

export default {
  name: 'MyIndex',

  data () {
    return {
      userInfo: {
      }
      // 用户信息
    }
  },

  mounted () {

  },

  methods: {
    onLayout () {
      // 退出提示
      // 在组件中需要使用 this.$dialog来调用弹窗按钮
      this.$dialog.confirm({
        title: '确认退出吗'
      })
        .then(() => {
        // on confirm
        // 确认退出：清除登陆状态（容器中的user + 本地存储中的 user）
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          // on cancel
          console.log('取消执行这里')
        })
    },
    async loadUserInfo () {
      try {
        const { data } = await getUserInfo()
        this.userInfo = data.data
        // 2-4-16  token过期了，无法获取数据!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      } catch (error) {
        this.$toast('获取数据失败，请稍后重试')
      }
    }
  },
  created () {
    // 如果用户登录了，则请求家在用户信息数据
    if (this.user) {
      this.loadUserInfo()
    }
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style scoped lang="less" >
.my-container{
  .header{
    height: 170px;
    background: url("@/assets/banner.png") no-repeat;
    background-size: cover;
  }
  .not-login{
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .mobile-img{
        width: 66px;
        height: 66px;
        margin-bottom: 15px;
      }
      .text{
        font-size: 14px;
        color: #fff;
      }
    }
  }
  .user-info{
    .base-info{
      height: 110px;
      padding: 19px,16px,11.5px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left{
        display: flex;
        align-items: center;
        .avatar{
          width:66px;
          height:66px;
          margin-right: 11.5px;
          border:solid 1px #fff;
        }
        .name{
          font-size: 30px;
          color: #fff;
        }
      }
    }
    .data-stats{
      display: flex;
      .data-item{
        height: 65px;
        flex : 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #fff;
        .count{
          font-size: 18px;
        }
        .text{
          font-size: 11.5px;
        }
      }
    }
  }
  .grid-nav{
    .grid-item{
      height: 70px;
      i.toutiao{
        font-size: 21px;
      }
      .toutiao-shoucang{
        color: #eb5253;
      }
      .toutiao-lishi{
        color: #ff9d1d;
      }
      span.text{
        font-size: 13px;
      }
    }
  }
  .cmd9{
    margin-bottom: 4px;
  }
  .lgout-cell{
    text-align: center;
    color: #d86262;
  }
}
</style>
