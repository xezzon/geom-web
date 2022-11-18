import { useRequest } from 'ahooks'
import { Spin, Table, Space } from 'antd'
import {
  useRef, useState, useImperativeHandle, forwardRef,
} from 'react'
import { list as fetchListApi } from '@/api/public-api'
import CommonQuery from '@/components/CommonQuery'

function PublicApiList({ type }, ref) {
  /**
   * 列表数据
   */
  const [dataSource, setDataSource] = useState([])
  /**
   * 分页信息
   */
  const [pagination, setPagination] = useState({
    simple: true,
    current: 1,
    pageSize: 10,
  })
  /**
   * 排序信息
   */
  const [sorter, setSorter] = useState({})

  /**
   * @type {import('antd').TableColumnProps}
   */
  const columns = [
    {
      key: 'index',
      title: '序号',
      render: (_text, _record, index) => pagination.pageSize * (pagination.current - 1) + index + 1,
    },
    {
      dataIndex: 'service',
      title: '服务提供者',
      valueType: 'text',
    },
    {
      dataIndex: 'code',
      title: '调用识别码',
      valueType: 'text',
    },
    {
      dataIndex: 'name',
      title: '接口名称',
      valueType: 'text',
    },
    {
      dataIndex: 'enabled',
      title: '状态',
      valueType: 'switch',
      options: {
        checkedChildren: '启用',
        unCheckedChildren: '禁用',
      },
      render: (value) => (value ? '启用' : '禁用'),
    },
    {
      key: 'options',
      title: '操作',
    },
  ]

  /**
   * 通用查询组件
   */
  const commonQuery = useRef(null)
  /**
   * 异步请求 - 获取列表
   */
  const { loading, runAsync: runFetchList } = useRequest(fetchListApi, { manual: true })

  /**
   * 获取列表
   * @param {object} queryParam
   */
  const fetchList = async (queryParam) => runFetchList(queryParam)
    .then(({ totalElements, content }) => {
      setPagination({ ...pagination, total: totalElements })
      setDataSource(content)
    })

  /**
   * 对外暴露接口
   */
  useImperativeHandle(ref, () => ({
    refresh: () => commonQuery.current.refresh(),
  }))

  const Toolbar = () => (
    <div className="d-flex justify-content-between">
      <div />
      <Space>
        <CommonQuery
          columns={columns}
          filter={`type EQ '${type}'`}
          sorter={sorter}
          pagination={pagination}
          onQuery={fetchList}
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
        pagination={pagination}
        title={Toolbar}
        sticky
        onChange={(pagination, _filters, sorter) => {
          setPagination(pagination)
          setSorter(sorter)
        }}
      />
    </Spin>
  )
}

export default forwardRef(PublicApiList)
