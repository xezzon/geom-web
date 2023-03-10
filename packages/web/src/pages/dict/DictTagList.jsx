import {
  Table, Spin, Button, Space, Modal,
} from 'antd'
import { useState, useRef } from 'react'
import { useRequest } from 'ahooks'
import { PlusOutlined } from '@ant-design/icons'
import { getTags as getTagsApi } from '@/api/dict'
import CommonQuery from '@/components/CommonQuery'
import DictEditor from './DictEditor'

/**
 * 字典目列表
 * @param {object} param0
 * @param {(dict: import('@/api/dict').Dict) => void} onDetail
 */
function DictTagList({ onDetail }) {
  const [dataSource, setDataSource] = useState([])
  const [pagination] = useState({
    simple: true,
    current: 1,
    pageSize: 15,
  })
  const [sorter] = useState({})
  const [record, setRecord] = useState()

  const commonQuery = useRef(null)
  const editorRef = useRef(null)

  const { loading, runAsync: runGetTagsApi } = useRequest(getTagsApi, { manual: true })

  const getTags = async () => runGetTagsApi()
    .then((tags) => {
      setDataSource(tags)
    })
  const saveDict = () => editorRef.current
    .save()
    .then(() => {
      setRecord()
    })
    .then(commonQuery.current.search)

  /**
   * @type {import('antd').TableColumnProps}
   */
  const columns = [
    {
      key: 'index',
      title: '序号',
      render: (_1, _2, index) => index + 1,
      width: '6%',
    },
    {
      dataIndex: 'label',
      title: '类型',
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
            parentId: '0',
            tag: 'tags',
          })}
        >
          新增
        </Button>
        <CommonQuery
          columns={columns}
          filter={"code EQ 'tags'"}
          sorter={sorter}
          pagination={pagination}
          onQuery={getTags}
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
