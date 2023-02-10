import { PageContainer } from '@ant-design/pro-components'
import { Drawer } from 'antd'
import { useState } from 'react'
import DictList from './DictList'
import DictTagList from './DictTagList'

function DictPage() {
  const [tagDict, setTagDict] = useState(null)

  return (
    <>
      <PageContainer
        fixedHeader
        header={{
          title: '字典',
          breadcrumb: {},
        }}
      >
        <DictTagList onDetail={setTagDict} />
      </PageContainer>
      <Drawer
        open={!!tagDict}
        title={`${tagDict?.code} - ${tagDict?.label}`}
        destroyOnClose
        maskClosable={false}
        onClose={() => setTagDict(null)}
        width="61.8%"
      >
        <DictList tag={tagDict?.code} />
      </Drawer>
    </>
  )
}

export default DictPage
