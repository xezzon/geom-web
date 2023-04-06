/**
 * @typedef {import('@/typings').Dict} Dict
 */
import { adminClient } from '@/api'
import CommonQuery from '@/component/CommonQuery'
import { PlusOutlined } from '@ant-design/icons'
import { useRequest } from 'ahooks'
import { Button, Modal, Space, Spin, Table } from 'antd'
import { useRef, useState } from 'react'
import DictEditor from './DictEditor'

/**
 * 字典目列表
 * @param {object} props
 * @param {(dict: Dict) => void} props.onDetail
 */
function DictTagList({ onDetail }) {
  const [dataSource, setDataSource] = useState(/** @type {Dict[]} */([]))
  const [pagination] = useState({
    simple: true,
    current: 1,
    pageSize: 15,
  })
  const [sorter] = useState({
    field: 'ordinal',
    order: 'ASC',
  })
  const [record, setRecord] = useState(/** @type {Dict} */(null))

  const commonQuery = useRef(null)
  const editorRef = useRef(null)

  const { loading, runAsync: fetchDictTagPage } = useRequest(adminClient.dictTagPage, { manual: true })
  const { runAsync: fetchRemoveDict } = useRequest(adminClient.removeDict, { manual: true })

  const fetchPage = async (params) => fetchDictTagPage(params)
    .then((response) => response.data)
    .then(({ content }) => {
      setDataSource(content)
    })
  const saveDict = () => editorRef.current
    .save()
    .then(() => {
      setRecord()
    })
    .then(commonQuery.current.search)
  const removeDict = (id) => fetchRemoveDict(id)
    .then(commonQuery.current.search)

  /**
   * @type {import('antd').TableColumnProps<Dict>[]}
   */
  const columns = [
    {
      key: 'index',
      title: '序号',
      render: (_1, _2, index) => index + 1,
      width: '10%',
    },
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
      width: '15%',
    },
    {
      key: 'options',
      title: '操作',
      render: (_, record) => (
        <Space>
          <Button onClick={() => onDetail(record)}>详情</Button>
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
          onClick={() => {
            setRecord({
              parentId: '0',
              tag: 'tag',
            })
          }}
        >
          新增
        </Button>
        <CommonQuery
          columns={columns}
          filter={"tag EQ 'tag'"}
          sorter={sorter}
          pagination={pagination}
          onQuery={fetchPage}
          ref={commonQuery}
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

export default DictTagList
