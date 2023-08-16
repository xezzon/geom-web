/**
 * @typedef {import('@xezzon/geom').OpenapiInstance} OpenapiInstance
 */
import { PageContainer } from '@ant-design/pro-components'
import CommonQuery from '@geom/components/CommonQuery'
import { Button, Space, Table } from 'antd'
import { useRef, useState } from 'react'
import { useRequest } from 'ahooks'
import { useGroup } from '@/components/GroupContext'
import { openapiClient } from '@/api'

function OpenapiInstancePage() {
  const [dataSource, setDataSource] = useState(/** @type {OpenapiInstance} */([]))
  const [pagination, setPagination] = useState(/** @type {import('antd').PaginationProps} */({
    simple: true,
    current: 1,
    pageSize: 15,
  }))
  const [sorter] = useState([])
  const { currentGroup } = useGroup()

  const commonQuery = useRef(null)

  const {
    runAsync: fetchOpenapiPage,
  } = useRequest(openapiClient.openapiInstancePage, { manual: true })

  const fetchPage = async (params) => fetchOpenapiPage(params)
    .then(({ data }) => data)
    .then(({ content, totalElements }) => {
      setDataSource(content)
      setPagination({
        ...pagination,
        total: totalElements,
      })
    })

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
      dataIndex: 'apiName',
      title: '接口名称',
      valueType: 'text',
    },
    {
      key: 'options',
      title: '操作',
      render: () => (
        <Space>
          <Button type="link">详情</Button>
          <Button type="link">调试</Button>
          <Button type="link">操作记录</Button>
        </Space>
      ),
    },
  ]
  const Toolbar = () => (
    <div className="d-flex justify-content-between">
      <div />
      <Space>
        <CommonQuery
          columns={columns}
          filter={`groupId eq '${currentGroup?.id}'`}
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
      <PageContainer
        fixedHeader
        header={{ breadcrumb: {} }}
      >
        <Table
          columns={columns}
          rowKey="id"
          dataSource={dataSource}
          title={Toolbar}
          pagination={pagination}
          sticky
          onChange={(pagination) => setPagination(pagination)}
        />
      </PageContainer>
    </>
  )
}

export {
  OpenapiInstancePage as Component,
}
