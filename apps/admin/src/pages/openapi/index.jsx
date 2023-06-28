/**
 * @typedef {import('@/typings').Openapi} Openapi
 */
import { PageContainer } from '@ant-design/pro-components'
import { useRef, useState } from 'react'
import { Modal } from 'antd'
import OpenapiList from './OpenapiList'
import OpenapiEditor from './OpenapiEditor'

function OpenapiPage() {
  const [record, setRecord] = useState(/** @type {Openapi} */(null))

  const listRef = useRef(null)
  const editorRef = useRef(null)

  const closeEditor = () => {
    setRecord()
    listRef.current.refresh()
  }
  const save = () => editorRef.current
    .save()
    .then(closeEditor)

  return (
    <>
      <PageContainer
        fixedHeader
        header={{
          title: '对外接口',
          breadcrumb: {},
        }}
      >
        <OpenapiList
          onEdit={setRecord}
          ref={listRef}
        />
      </PageContainer>
      <Modal
        title="编辑接口"
        open={!!record}
        destroyOnClose
        maskClosable={false}
        onOk={save}
        onCancel={closeEditor}
      >
        <OpenapiEditor ref={editorRef} />
      </Modal>
    </>
  )
}

export {
  OpenapiPage as Component,
}
