import React, { Component } from 'react';
import { Button, Form, Input } from 'antd';
import { Redirect  } from 'react-router-dom';
import { connect } from 'react-redux';

import { login } from '../../store/reducer/auth/actions';

import './index.scss';

const loginValidData = 'test';
const passwordValidData = 'test';

class Login extends Component {
  getRulesValidationByFieldName = (fieldName) => {
    const rulesByFieldName = {
      username: [{
        validator(rule, value) {
          if (value === loginValidData) return Promise.resolve();
          return Promise.reject('Вы ввели не верные данные (Login)');
        },
      }],
      password: [{
        validator(rule, value) {
          if (value === passwordValidData)  return Promise.resolve();
          return Promise.reject('Вы ввели не верные данные (Password)');
        },
      }],
    };

    return [
      { required: true, message: 'Заполните поле!' },
      ...rulesByFieldName[fieldName],
    ];
  };

  render() {
    const { isAuth, login } = this.props;

    if (isAuth) return <Redirect to={'/contacts'} />;

    return (
      <div className="login-page">
        <div className="valid-login-data">
          <div>
            <strong>Login:</strong> {loginValidData}
          </div>
          <div>
            <strong>Password:</strong> {passwordValidData}
          </div>
        </div>
        <Form
          className="form"
          name="basic"
          initialValues={{ remember: true }}
          onFinish={login}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={this.getRulesValidationByFieldName('username')}
          >
            <Input className="antd-input" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={this.getRulesValidationByFieldName('password')}
          >
            <Input.Password className="antd-input" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">Войти</Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = ({ auth: { isAuth } }) => ({ isAuth });
const mapDispatchToProps = { login };

export default connect(mapStateToProps, mapDispatchToProps)(Login);
