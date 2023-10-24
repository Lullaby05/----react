import React, { useState } from 'react'
import IconMap from 'components/IconMap'
import { Button } from 'antd'
import { loginRule } from 'utils/rules'

const SmCodeLogin = ({form, Input, FormItem}) => {

  const [disabled, setDisabled] = useState(true)
  let [currentTime, setCurrentTime] = useState(60)
  const [currentStatus, setCurrentStatus] = useState(true)

  const checkedMobile = async () => {
    try {
      await form.validateFields(['mobile'])
      setDisabled(false)
    } catch(err) {
      setDisabled(true)
    }
  }

  const _sendSmCode = () => {
    setCurrentStatus(false)
    setDisabled(true)
    runTime()
  }

  const runTime = () => {
    const timer = setInterval(() => {
      if(currentTime === 0) {
        clearInterval(timer)
        setCurrentStatus(true)
        setDisabled(false)
        setCurrentTime(60)
        return
      }
      setCurrentTime(--currentTime)
    }, 1000)
  }

  return (
    <>
    <FormItem name="mobile" rules={loginRule.mobileRule} hasFeedback>
      <Input placeholder="请输入手机号码" 
        prefix={IconMap.mobileIcon}
        onChange={checkedMobile}
      >
      </Input>
    </FormItem>
    <FormItem name="code" rules={loginRule.codeRule} hasFeedback>
      <Input placeholder="请输入验证码" 
        prefix={IconMap.codeIcon} 
        addonAfter={
          <Button 
            disabled={disabled} 
            onClick={_sendSmCode}
          >{currentStatus ? '发送验证码' : `${currentTime}秒后重新发送`}</Button>
        }>
      </Input>
    </FormItem>
    </>
  )
}

export default SmCodeLogin