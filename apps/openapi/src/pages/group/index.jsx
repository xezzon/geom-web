import { PageContainer } from '@ant-design/pro-components'
import { useGroup } from '@/components/GroupContext'
import GroupMemberList from './GroupMemberList'
import GroupInfo from './GroupInfo'

function GroupPage() {
  const { currentGroup } = useGroup()

  return (
    <>
      <PageContainer
        fixedHeader
        header={{
          breadcrumb: {},
        }}
        content={<p>{`团队名称: ${currentGroup?.name}`}</p>}
        tabList={[
          { key: 'info', tab: '团队信息', children: <GroupInfo /> },
          { key: 'member', tab: '团队成员', children: <GroupMemberList /> },
        ]}
      />
    </>
  )
}

export {
  GroupPage as Component,
}
