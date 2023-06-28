import { PageContainer } from '@ant-design/pro-components'
import { Button } from 'antd'
import { useState } from 'react'
import { useGroup } from '@/components/GroupContext'
import { adminClient } from '@/api'

function GroupPage() {
  const [secretKey, setSecretKey] = useState('')
  const { currentGroup } = useGroup()

  const refreshSecretKey = () => {
    adminClient.generateSecretKey(currentGroup?.id)
      .then((secretKey) => {
        setSecretKey(secretKey)
      })
  }

  const GroupContent = (
    <>
      <p>{`团队名称: ${currentGroup?.name}`}</p>
      <p>{`Access Key: ${currentGroup?.accessKey}`}</p>
      <p>
        {`Secret Key: ${secretKey || '*'.repeat(16)}`}
        <Button type="link" danger onClick={refreshSecretKey}>刷新</Button>
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
