import { PlusOutlined } from '@ant-design/icons'
import {
  Button, Space, Table, Spin,
} from 'antd'
import { useState } from 'react'
import { useRequest } from 'ahooks'
import CommonQuery from '@/components/CommonQuery'
import { list as listApi } from '@/api/dict'

function DictList({ tag }) {
  const [dataSource, setDataSource] = useState([])
  const [pagination] = useState({
    hideOnSinglePage: true,
    current: 1,
    pageSize: 0,
  })
  const [sorter] = useState({})

  const { loading, runAsync: runListApi } = useRequest(listApi, { manual: true })

  const list = async () => runListApi(tag)
    .then((tags) => {
      setDataSource(tags)
    })

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
        <Button type="primary" icon={<PlusOutlined />}>
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

export default DictList
