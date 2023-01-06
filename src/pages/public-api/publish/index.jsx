import { PageContainer } from '@ant-design/pro-components'
import { useBoolean } from 'ahooks'
import { Modal } from 'antd'
import { useRef, useState } from 'react'
import PublicApiDetail from '../PublicApiDetail'
import PublicApiList from '../PublicApiList'

/**
 * 开放接口 - 我发布的
 */
function PublishPage() {
  /**
   * 接口类型
   */
  const [tabKey, setTabKey] = useState('RPC')
  /**
   * 详情数据
   */
  const [record, setRecord] = useState({})
  /**
   * 详情可见性
   */
  const [
    detailVisible,
    { setTrue: setDetailVisible, setFalse: setDetailInvisible },
  ] = useBoolean(false)
  /**
   * 详情框模式
   * view: 查看; edit: 新增; update: 更新;
   */
  const [mode, setMode] = useState('view')
  /**
   * 详情框加载态
   */
  const [
    detailLoading,
    { setTrue: setDetailLoading, setFalse: setDetailUnloading },
  ] = useBoolean(false)
  const listRef = useRef(null)
  const detailRef = useRef(null)
  /**
   * 显示详情框
   * @param {import('@/api/public-api').PublicApi} record
   */
  const showDetail = (record, mode = 'view') => () => {
    setRecord(record)
    setMode(mode)
    setDetailVisible()
  }
  /**
   * 列表刷新
   */
  const refreshList = () => listRef.current.refresh()
  /**
   * 详情框保存
   */
  const saveDetail = () => {
    setDetailLoading()
    return detailRef.current
      .save()
      .then(setDetailInvisible)
      .then(refreshList)
      .finally(setDetailUnloading)
  }

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
        <PublicApiList type={tabKey} onEdit={showDetail} ref={listRef} />
      </PageContainer>
      <Modal
        title="编辑开放接口"
        open={detailVisible}
        destroyOnClose
        okText="保存"
        maskClosable={false}
        onOk={saveDetail}
        onCancel={setDetailInvisible}
        confirmLoading={detailLoading}
      >
        <PublicApiDetail initData={record} mode={mode} ref={detailRef} />
      </Modal>
    </>
  )
}

export default PublishPage
