import React, { useState } from 'react'
import AccountLogin from './component/AccountLogin'
import SmCodeLogin from './component/SmCodeLogin'
import { Form, Input, Button, Row, Col } from 'antd'
import IconMap from 'components/IconMap'
import logoImg from 'common/img/logo.svg'
import './css/login.less'
import { useDispatch, useSelector } from 'umi'
const FormItem = Form.Item

const login = () => {
  const [form] = Form.useForm()
  const [type, setType] = useState(0)
  const dispatch = useDispatch()
  const loading = useSelector(state => state.loading)

  // 表单提交事件
  const submitUserInfo = (data) => {
    // 登录请求的参数处理 type为必选项 + 用户名/密码 或 手机号/验证码
    dispatch({ type: 'user/login', payload: {
      ...data, 
      type
    }})
  }

  // 组件选择的容器函数
  const ComponentSelector = (props) => !type ? <AccountLogin {...props} /> : <SmCodeLogin {...props} />

  return (
    <div className="form">
      <div className="logo">
        <img src={logoImg} alt="" />
        <span>人事管理系统</span>
      </div>
      <Form form={form} onFinish={submitUserInfo}>
        {/* {选择当前展示的组件} */}
        {ComponentSelector({form, FormItem, Input})}
        <Row>
          <Button 
            block={true} 
            htmlType='submit' 
            type='primary' 
            loading={loading.effects['user/login']}
          >登录</Button>
        </Row>
        <Row>
          <Col span={6} className='ft-12'>
            忘记密码？
          </Col>
          <Col span={18} className='ft-12 align-right' onClick={()=>setType(!type? 1 : 0)}>
            {
              !type ? '使用手机号码进行登录' : '使用账户名密码进行登录'
            }
            {IconMap.arrRowRight}
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default login