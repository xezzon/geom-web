import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { GeomSvg, SignUpSvg } from '@geom/assets/img';
import { useNavigate } from 'react-router-dom';
import { useTitle } from 'ahooks';
import { adminClient } from '@/api';

/**
 * 注册页
 * @returns {import("react").ReactNode}
 */
function NewGroupPage() {
  const navigate = useNavigate()
  useTitle('新增用户组', { restoreOnUnmount: true })

  const addUserGroup = (group) => {
    adminClient.addUserGroup(group)
      .then(() => {
        navigate('/')
      })
  }

  return (
    <div style={{
      backgroundImage: `url(${SignUpSvg})`,
      backgroundRepeat: 'no-repeat',
      height: '100vh',
    }}
    >
      <LoginForm
        title="Geom"
        logo={GeomSvg}
        subTitle=" "
        submitter={{
          searchConfig: {
            submitText: '创建用户组',
          },
        }}
        onFinish={addUserGroup}
      >
        <>
          <ProFormText
            label="用户组编码"
            name="code"
            fieldProps={{
              size: 'large',
            }}
            rules={[
              {
                required: true,
                message: '请输入用户组编码!',
              },
            ]}
          />
          <ProFormText
            label="用户组名称"
            name="name"
            fieldProps={{
              size: 'large',
            }}
            rules={[
              {
                required: true,
                message: '请输入用户组名称!',
              },
            ]}
          />
        </>
      </LoginForm>
    </div>
  )
}

export default NewGroupPage
