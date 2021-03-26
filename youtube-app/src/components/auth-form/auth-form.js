import { Form, Input, Button, Alert } from 'antd'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { login } from '../../store/actions/auth'
import logo from '../../logo.svg'
import './auth-form.scss'

function AuthForm() {
  const dispatch = useDispatch()
  const { error } = useSelector(state => state.auth)

  const onFinishHandler = values => {
    dispatch(login(values))
  }

  return (
    <div className="auth__outher">
      <div className="auth__inner">
        <img className="auth__logo" src={logo} alt="YTA" />
        <h1 className="auth__title">Вход</h1>
        <Form
          className="auth__form"
          onFinish={onFinishHandler}
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Введите e-mail'
              }
            ]}
          >
            <Input placeholder="E-mail" className="auth__input" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Введите пароль'
              }
            ]}
          >
            <Input.Password placeholder="Пароль" className="auth__input" />
          </Form.Item>
          <Form.Item>
            <Button className="auth__submit" type="primary" htmlType="submit">
              Войти
            </Button>
          </Form.Item>
        </Form>
        {error && <Alert message={error} type="error" showIcon />}
        <div className="auth__data">
          <span>j@gmail.com | 111111</span>
          <span>b@mail.com | 222222</span>
        </div>
      </div>
    </div>
  )
}
export default AuthForm
