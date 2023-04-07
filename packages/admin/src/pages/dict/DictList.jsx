/**
 * @typedef {import('@/typings').Dict} Dict
 */
import { PlusOutlined } from '@ant-design/icons'
import {
  Button, Space, Table, Spin, Modal,
} from 'antd'
import { useState, useRef, useEffect } from 'react'
import { useRequest } from 'ahooks'
import { adminClient } from '@/api'
import DictEditor from './DictEditor'

/**
 * 字典列表
 * @param {object} props
 * @param {Dict} props.tag
 */
function DictList({ tag }) {
  const [dataSource, setDataSource] = useState([])
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
  
  useEffect(() => {
    list()
  }, [])

  /**
   * @type {import('antd').TableColumnProps<Dict>[]}
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
      width: '4rem',
      hideInSearch: true,
    },
    {
      key: 'options',
      title: '操作',
      render: (_, record) => (
        <Space>
          <Button onClick={() => setRecord({
            parentId: record.id,
            tag: tag.code
          })}>
            新增
          </Button>
          <Button onClick={() => setRecord(record)}>修改</Button>
          <Button onClick={() => removeDict(record.id)}>删除</Button>
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
          pagination={false}
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
