import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { LoginForm, ProFormText } from "@ant-design/pro-components";
import { adminClient } from "@/api";

/**
 * 注册页
 * @returns {import("react").ReactNode}
 */
function SignUpPage() {
  const register = (user) => {
    adminClient.register(user)
  }

  return (
    <div style={{
      backgroundImage: 'url(/bg-sign-up.svg)',
      backgroundRepeat: 'no-repeat',
      height: '100vh',
    }}>
      <LoginForm
        title="Geom"
        logo="/geom.svg"
        subTitle=" "
        submitter={{
          searchConfig: {
            submitText: '注册',
          }
        }}
        onFinish={register}
      >
        <>
          <ProFormText
            name="username"
            placeholder="用户名"
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined className={'prefixIcon'} />,
            }}
            rules={[
              {
                required: true,
                message: '请输入用户名!',
              },
            ]}
          />
          <ProFormText.Password
            name="plaintext"
            placeholder="密码"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined className={'prefixIcon'} />,
              visibilityToggle: false,
            }}
            rules={[
              {
                required: true,
                message: '请输入密码！',
              },
            ]}
          />
          <ProFormText.Password
            name="repeat"
            placeholder="确认密码"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined className={'prefixIcon'} />,
              visibilityToggle: false,
            }}
            rules={[
              {
                required: true,
                message: '请再次输入密码',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('plaintext') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject('两次输入的密码不一致')
                }
              }),
            ]}
          />
        </>
      </LoginForm>
    </div>
  )
}

export {
  SignUpPage as Component,
}
