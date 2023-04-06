import { PlusOutlined } from '@ant-design/icons'
import {
  Button, Space, Table, Spin, Modal,
} from 'antd'
import { useState, useRef } from 'react'
import { useRequest } from 'ahooks'
import { adminClient } from '@/api'
import CommonQuery from '@/component/CommonQuery'
import DictEditor from './DictEditor'

/**
 * 字典列表
 * @param {object} param0
 * @param {import('@/api/dict').Dict} param0.tag
 */
function DictList({ tag }) {
  const [dataSource, setDataSource] = useState([])
  const [pagination] = useState({
    hideOnSinglePage: true,
    current: 1,
    pageSize: 0,
  })
  const [sorter] = useState({})
  const [record, setRecord] = useState()

  const editorRef = useRef(null)

  const { loading, runAsync: fetchDictListByTag } = useRequest(adminClient.dictListByTag, { manual: true })
  const { runAsync: fetchRemoveDict } = useRequest(adminClient.removeDict, { manual: true })

  const list = async () => fetchDictListByTag(tag.code)
    .then((response) => response.data)
    .then((dict) => {
      setDataSource(dict)
    })
  const saveDict = () => editorRef.current
    .save()
    .then(() => {
      setRecord()
    })
    .then(list)
  const removeDict = (id) => fetchRemoveDict(id)
    .then(list)

  /**
   * @type {import('antd').TableColumnProps}
   */
  const columns = [
    {
      dataIndex: 'label',
      title: '名称',
      valueType: 'text',
    },
    {
      dataIndex: 'code',
      title: '编码',
      valueType: 'text',
    },
    {
      dataIndex: 'ordinal',
      title: '排序',
      hideInSearch: true,
    },
    {
      key: 'options',
      title: '操作',
      render: (_, { id }) => (
        <Space>
          <Button>修改</Button>
          <Button onClick={() => removeDict(id)}>删除</Button>
        </Space>
      ),
    },
  ]

  const Toolbar = () => (
    <div className="d-flex justify-content-between">
      <div />
      <Space>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setRecord({
            parentId: tag.id,
            tag: tag.code,
          })}
        >
          新增
        </Button>
        <CommonQuery
          columns={columns}
          sorter={sorter}
          pagination={pagination}
          onQuery={list}
        />
      </Space>
    </div>
  )

  return (
    <>
      <Spin spinning={loading}>
        <Table
          columns={columns}
          rowKey="id"
          dataSource={dataSource}
          title={Toolbar}
          sticky
        />
      </Spin>
      <Modal
        title="编辑字典"
        open={!!record}
        destroyOnClose
        okText="保存"
        maskClosable={false}
        onOk={saveDict}
        onCancel={() => { setRecord() }}
      >
        <DictEditor initData={record} ref={editorRef} />
      </Modal>
    </>
  )
}

export default DictList
