import React from 'react'
import IconMap from 'components/IconMap'
import { loginRule } from 'utils/rules'

const UpdatePassword = ({Input, FormItem, form}) => {
  return (
    <>
    <FormItem name="password" rules={loginRule.passwordRule} hasFeedback>
      <Input type="password"  placeholder="登录密码" prefix={IconMap.passwordIcon}></Input>
    </FormItem>
    <FormItem name="confirmPassword" rules={loginRule.confirmPasswordRule(form)} hasFeedback>
      <Input type="password" placeholder="确认登录密码" prefix={IconMap.passwordIcon}></Input>
    </FormItem>
    </>
  )
}

export default UpdatePassword