<template>
  <div class="login-container">
    <!-- //导航栏 -->
    <van-nav-bar class="page-nav-bar" title="登录" >
      <van-icon class="page-nav-icon" slot="left" name="cross" @click="$router.back()"/>
    </van-nav-bar>

    <!-- 登陆表单 -->
    <!--
      表单验证：
        1.给van-field组件配置 :rules 验证规则
        2.给表单提交的时候会自动触发表单验证
          如果验证通过，会触发submit事件
          如果验证失败，不会触发submit
     -->
    <van-form @submit="onSubmit" ref="loginForm">
    <van-field
      v-model="user.mobile"
      name="mobile"
      placeholder="请输入手机号"
      :rules="userFormRules.mobile"
      type="number"
      maxlength="11"
    >
    <i slot="left-icon" class="toutiao toutiao-shouji"></i>
    </van-field>
      <van-field
        v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        :rules="userFormRules.code"
        type="number"
        maxlength="6"
      >
    <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
    <!--
      time倒计时时长
     -->
      <template #button>
    <van-count-down
    v-if="isCountDownShow"
      :time="1000 * 60"
      format="ss s"
      @finish="isCountDownShow = false"
     />
        <van-button
        v-else
        class="send-sms-btn"
        native-type="button"
        round
        size="small"
        type="default"
        @click="onSendSms"
        >发送验证码</van-button>
      </template>
    </van-field>
      <div style="margin: 16px;">
        <van-button  block type="info" native-type="submit">登陆</van-button>
      </div>
    </van-form>
    <span style="font-size: 5px;">
      13911111111
      246810
    </span>
      </div>
    </template>
<script>
import { login, sendSms } from '@/api/user'

export default {
  name: 'LoginPage',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '',
        code: ''
        /**
         * 13911111111
         * 246810
         */
      },
      userFormRules: {
        mobile: [{
          required: true,
          message: '手机号不能为空'
        },
        {
          pattern: /^1[3|5|7|8]\d{9}$/,
          message: '手机号格式错误'
        }],
        code: [{
          required: true,
          message: '验证码不能为空'
        },
        {
          pattern: /^\d{6}$/,
          message: '验证码格式错误'
        }]
      },
      isCountDownShow: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async  onSubmit () {
      // 1.获取表单数据
      const user = this.user
      // 2.表单验证
      this.$toast.loading({
        message: '登陆中...',
        forbidClick: true, // 禁用背景点击
        duration: 0 // 持续时间，默认是2000ms，设置为0，则持续展示
      })
      // 3.提交表单请求登陆
      try {
        const { data } = await login(user)
        this.$store.commit('setUser', data.data)
        this.$toast.success('登陆成功')
        // 登陆成功，跳转到回原来页面
        // 但是使用back（）不严谨
        this.$router.back()
      } catch (error) {
        if (error.response.status === 400) {
          this.$toast.fail('手机号或验证码错误')
        } else {
          this.$toast.success('登陆失败,请稍后重试')
        }
      }
      // 4.根据请求响应结果处理后续操作
    },
    async onSendSms () {
      // 1.校验手机号
      try {
        await this.$refs.loginForm.validate('mobile')
        console.log('验证通过')
      } catch (error) {
        return console.log('验证失败', error)
      }
      // 2.验证通过，显示倒计时
      this.isCountDownShow = true
      // 3.请求发送验证码
      try {
        await sendSms(this.user.mobile)
        this.$toast('发送成功')
      } catch (error) {
        // 发送失败
        this.isCountDownShow = false
        if (error.response.status === 429) {
          this.$toast('发送过于频繁,请稍后重试')
        } else {
          this.$toast('发送失败,请稍后重试')
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.login-container {
  .toutiao {
    font-size: 37px;
  }
  .send-sms-btn {
    width: 152px;
    height: 46px;
    line-height: 23px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
