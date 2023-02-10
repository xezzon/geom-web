import { PageContainer } from '@ant-design/pro-components'
import DictTagList from './DictTagList'

function DictPage() {
  return (
    <>
      <PageContainer
        fixedHeader
        header={{
          title: '字典',
          breadcrumb: {},
        }}
      >
        <DictTagList />
      </PageContainer>
    </>
  )
}

export default DictPage
