/**
 * @typedef {import('@xezzon/geom/dist/api/dict').Dict} Dict
 */
import { PageContainer } from '@ant-design/pro-components'
import { Drawer } from 'antd'
import { useState } from 'react'
import DictTagList from './DictTagList'
import DictList from './DictList'

function DictPage() {
  const [tagDict, setTagDict] = useState(/** @type {Dict} */(null))

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
        onClose={() => setTagDict()}
        width="61.8%"
      >
        <DictList tag={tagDict} />
      </Drawer>
    </>
  )
}

export {
  DictPage as Component,
}
