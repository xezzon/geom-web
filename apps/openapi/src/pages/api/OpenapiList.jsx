/**
 * @typedef {import('@xezzon/geom').Openapi} Openapi
 */
import { useRequest } from "ahooks"
import { Table } from "antd"
import {
  forwardRef, useEffect, useImperativeHandle, useState,
} from "react"
import { openapiClient } from "@/api"
import { useGroup } from "@/components/GroupContext"

function OpenapiList(_, ref) {
  const [dataSource, setDataSource] = useState(/** @type {Openapi[]} */([]))
  const [pagination, setPagination] = useState(/** @type {import('antd').PaginationProps} */({
    simple: true,
    current: 1,
    pageSize: 15,
  }))
  const [selectedRowKeys, setSelectedRowKeys] = useState(/** @type {React.Key[]} */([]))
  const { currentGroup } = useGroup()

  const {
    runAsync: fetchOpenapiPage,
  } = useRequest(openapiClient.openapiPage, { manual: true })

  const fetchPage = async () => fetchOpenapiPage()
    .then(({ data }) => data)
    .then(({ content, totalElements }) => {
      setDataSource(content)
      setPagination({
        ...pagination,
        total: totalElements,
      })
    })
  const save = () => openapiClient
    .subscribeOpenapi(selectedRowKeys, currentGroup.id)

  /**
   * @type {import('antd').TableColumnProps<Openapi>[]}
   */
  const columns = [
    {
      dataIndex: 'name',
      title: '接口名称',
      valueType: 'text',
    },
  ]

  useEffect(() => {
    fetchPage()
  }, [pagination.current, pagination.pageSize])

  useImperativeHandle(ref, () => ({
    save,
  }))

  return (
    <>
      <Table
        columns={columns}
        dataSource={dataSource}
        rowKey="id"
        rowSelection={{
          type: 'checkbox',
          preserveSelectedRowKeys: true,
          fixed: true,
          selectedRowKeys,
          onChange: setSelectedRowKeys,
        }}
        pagination={pagination}
        sticky
        onChange={(pagination) => setPagination(pagination)}
      />
    </>
  )
}

export default forwardRef(OpenapiList)
