import { PageContainer } from '@ant-design/pro-components'
import { Button } from 'antd'

function GroupPage() {
  const GroupContent = (
    <>
      <p>{'团队名称: '}</p>
      <p>{'Access Key: '}</p>
      <p>
        {'Secret Key: '}
        <Button type="link" danger>刷新</Button>
      </p>
    </>
  )

  return (
    <>
      <PageContainer
        fixedHeader
        header={{
          breadcrumb: {},
        }}
        content={GroupContent}
        tabList={[
          { key: 'member', tab: '团队成员' },
        ]}
      >
        <></>
      </PageContainer>
    </>
  )
}

export {
  GroupPage as Component,
}
