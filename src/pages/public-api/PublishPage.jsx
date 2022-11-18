import { PageContainer } from '@ant-design/pro-components'
import { useState } from 'react'
import PublicApiList from './PublicApiList'

/**
 * 开放接口 - 我发布的
 */
function PublishPage() {
  const [tabKey, setTabKey] = useState('RPC')

  return (
    <>
      <PageContainer
        fixedHeader
        tabList={[
          { tab: 'RPC请求', key: 'RPC' },
          { tab: 'WebHook', key: 'WEBHOOK' },
        ]}
        header={{
          title: '开放接口 - 我发布的',
          breadcrumb: {},
        }}
        onTabChange={setTabKey}
      >
        <PublicApiList type={tabKey} />
      </PageContainer>
    </>
  )
}

export default PublishPage
