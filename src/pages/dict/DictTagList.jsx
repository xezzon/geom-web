import {
  Table, Spin, Button, Space,
} from 'antd'
import { useState, useRef } from 'react'
import { useRequest } from 'ahooks'
import { PlusOutlined } from '@ant-design/icons'
import { getTags as getTagsApi } from '@/api/dict'
import CommonQuery from '@/components/CommonQuery'

function DictTagList() {
  const [dataSource, setDataSource] = useState([])
  const [pagination] = useState({
    simple: true,
    current: 1,
    pageSize: 0,
  })
  const [sorter] = useState({})

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
    },
    {
      key: 'options',
      title: '操作',
      render: () => (
        <Space>
          <Button>详情</Button>
        </Space>
      ),
    },
  ]

  const commonQuery = useRef(null)

  const { loading, runAsync: runGetTagsApi } = useRequest(getTagsApi, { manual: true })

  const getTags = async () => runGetTagsApi()
    .then((tags) => {
      setDataSource(tags)
    })

  const Toolbar = () => (
    <div className="d-flex justify-content-between">
      <div />
      <Space>
        <Button type="primary" icon={<PlusOutlined />}>
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
    <Spin spinning={loading}>
      <Table
        columns={columns}
        rowKey="id"
        dataSource={dataSource}
        title={Toolbar}
        sticky
      />
    </Spin>
  )
}

export default DictTagList
