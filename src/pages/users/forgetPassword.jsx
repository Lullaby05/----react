import React, { useState } from 'react';
import SmCodeLogin from './component/SmCodeLogin';
import UpdatePassword from './component/UpdatePassword';
import { Form, Input, Button, message } from 'antd';
import './css/login.less';
import $http from 'api';

const FormItem = Form.Item;

const forgetPassword = ({ history }) => {
  const [currentStep, setCurrentStep] = useState(1); // 展示哪一个组件的标识位
  const [form] = Form.useForm();

  const submitSelect = async (data) => {
    currentStep === 1
      ? _checkCode(data.code)
      : _updatePassword(data.confirmPassword);
  };

  // 检测用户验证码操作
  const _checkCode = async (smCode) => {
    const { data, msg } = await $http.checkedCode({ smCode })
    if(data) {
      setCurrentStep(2)
    } else {
      message.error(msg)
    }
  };

  // 用户修改密码
  const _updatePassword = async (newPassword) => {
    const { data, msg } = await $http.resetPassword({ newPassword })
    if(data) {
      message.success(msg)
      history.replace('/users/login')
    } else {
      message.error(msg)
    }
  };

  // 组件选择的容器函数
  const ComponentSelector = (props) =>
    currentStep === 1 ? (
      <SmCodeLogin {...props} />
    ) : (
      <UpdatePassword {...props} />
    );

  return (
    <div className="form forget-password">
      <div className="forget-password-title">
        {currentStep === 1 ? '忘记密码' : '重置密码'}
      </div>
      <Form form={form} onFinish={submitSelect}>
        {/* {选择当前展示的组件} */}
        {ComponentSelector({ form, FormItem, Input })}
        <Button
          block={true}
          htmlType="submit"
          type="primary"
        >
          {currentStep === 1 ? '下一步' : '重置'}
        </Button>
      </Form>
    </div>
  );
};

export default forgetPassword;
