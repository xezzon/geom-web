import CommonQuery from '@geom/components/CommonQuery'
import { useRequest } from 'ahooks'
import {
  Button, Space, Spin, Table,
} from 'antd'
import {
  forwardRef, useImperativeHandle, useRef, useState,
} from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { openapiClient } from '@/api'

function OpenapiList({ onEdit }, ref) {
  const [dataSource, setDataSource] = useState(/** @type {import('.').Openapi[]} */([]))
  const [pagination, setPagination] = useState(/** @type {import('antd').PaginationProps} */({
    simple: true,
    current: 1,
    pageSize: 15,
  }))
  const [sorter] = useState([])

  const commonQuery = useRef(null)

  const {
    loading, runAsync: fetchOpenapiPage,
  } = useRequest(openapiClient.openapiPage, { manual: true })

  const fetchPage = async (params) => fetchOpenapiPage(params)
    .then(({ data }) => data)
    .then(({ content, totalElements }) => {
      setDataSource(content)
      setPagination({
        ...pagination,
        total: totalElements,
      })
    })
  useImperativeHandle(ref, () => ({
    refresh: commonQuery.current.search,
  }))

  /**
   * @type {import('antd').TableColumnProps<Openapi>[]}
   */
  const columns = [
    {
      key: 'index',
      title: '序号',
      render: (_1, _2, index) => index + 1,
      width: '10%',
    },
    {
      dataIndex: 'name',
      title: '接口名称',
      valueType: 'text',
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
            onEdit({})
          }}
        >
          新增
        </Button>
        <CommonQuery
          columns={columns}
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
          pagination={pagination}
          sticky
          onChange={(pagination) => setPagination(pagination)}
        />
      </Spin>
    </>
  )
}

export default forwardRef(OpenapiList)
