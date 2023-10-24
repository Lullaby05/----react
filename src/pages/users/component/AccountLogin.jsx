import React from 'react'
import IconMap from 'components/IconMap'
import { loginRule } from 'utils/rules'

const AccountLogin = ({Input, FormItem}) => {
  return (
    <>
    <FormItem name="accountName" rules={loginRule.userRule} hasFeedback>
      <Input placeholder="请输入用户名" prefix={IconMap.userIcon}></Input>
    </FormItem>
    <FormItem name="password" rules={loginRule.passwordRule} hasFeedback>
      <Input type="password" placeholder="请输入密码" prefix={IconMap.passwordIcon}></Input>
    </FormItem>
    </>
  )
}

export default AccountLogin