/**
 * @typedef {import('@xezzon/geom/dist/api/dict').Dict} Dict
 */
import { PageContainer } from '@ant-design/pro-components'
import { Modal } from 'antd'
import { useState } from 'react'
import DictTagList from './DictTagList'

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
    </>
  )
}

export {
  DictPage as Component,
}
