<template>
  <div id="ComponentLogin" class="flex align-items-center flex-column w-full gap-3">
    <Logo></Logo>
    <t-form
      ref="form"
      class="w-full"
      :data="formData"
      :colon="true"
      :label-width="0"
      required-mark
      :rules="rules"
      @submit="onSubmit"
    >
      <t-form-item name="email">
        <t-input v-model="formData.email" clearable placeholder="请输入邮箱">
          <template #prefix-icon>
            <MailIcon />
          </template>
        </t-input>
      </t-form-item>

      <t-form-item name="password">
        <t-input v-model="formData.password" type="password" clearable placeholder="请输入密码">
          <template #prefix-icon>
            <lock-on-icon />
          </template>
        </t-input>
      </t-form-item>

      <t-form-item>
        <t-button theme="primary" type="submit" block>登录</t-button>
      </t-form-item>
    </t-form>
    <div class="w-full flex justify-content-between mt-2">
      <span class="text-xs font-light">注册账号</span>
      <span class="text-xs font-light">忘记密码</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { MessagePlugin } from 'tdesign-vue-next'
import Logo from '@renderer/components/Logo.vue'
import { login, checkUser } from '@renderer/api/app'
import { setUserInfo, addUserInfo } from '@renderer/api/user'
import { MailIcon, LockOnIcon } from 'tdesign-icons-vue-next'
import router from '@renderer/route'
import { getUserLine } from '@renderer/api/userData'
onMounted(async () => {
  try {
    const res = await checkUser()
    setUserInfo(res)
    const line = await getUserLine(res.$id)
    addUserInfo({
      line
    })
    console.log('已经登录')
    router.push({
      path: '/chat'
    })
  } catch (error) {
    console.log('🚀 ~ file: ComponentLogin.vue:51 ~ onMounted ~ error:', error)
  }
})
const form = ref()
const formData = reactive({
  email: '',
  password: ''
})
const rules = {
  password: [{ required: true, message: '密码必填', type: 'error' }],
  email: [{ required: true, message: '格式必须为邮箱', type: 'warning' }]
}
const onSubmit = async ({ validateResult, firstError }) => {
  if (validateResult === true) {
    try {
      const res = await login(formData)
      console.log('🚀 ~ file: ComponentLogin.vue:60 ~ onSubmit ~ res:', res)
      router.push({
        path: '/chat'
      })
    } catch (error) {
      console.log('🚀 ~ file: ComponentLogin.vue:61 ~ onSubmit ~ error:', error)
      handleValidateMessage()
      MessagePlugin.warning('邮箱或密码错误')
    }
  } else {
    console.log('Validate Errors: ', firstError, validateResult)
    MessagePlugin.warning(firstError)
  }
}
const validateMessage = {
  password: [
    {
      type: 'warning',
      message: '密码错误'
    }
  ]
}
const handleValidateMessage = () => {
  MessagePlugin.success('设置表单校验信息提示成功')
  form.value && form.value.setValidateMessage(validateMessage)
}
</script>

<style lang="less" scoped>
#ComponentLogin {
}
</style>
