import { PlusOutlined } from '@ant-design/icons'
import {
  Button, Space, Table, Spin, Modal,
} from 'antd'
import { useState, useRef } from 'react'
import { useRequest } from 'ahooks'
import CommonQuery from '@/components/CommonQuery'
import { list as listApi } from '@/api/dict'
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

  const { loading, runAsync: runListApi } = useRequest(listApi, { manual: true })

  const list = async () => runListApi(tag.code)
    .then((dict) => {
      setDataSource(dict)
    })
  const saveDict = () => editorRef.current
    .save()
    .then(() => {
      setRecord()
    })
    .then(list)

  /**
   * @type {import('antd').TableColumnProps}
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
    },
    {
      key: 'options',
      title: '操作',
      render: () => (
        <Space>
          <Button>修改</Button>
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
