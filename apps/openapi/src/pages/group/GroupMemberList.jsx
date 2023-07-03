import {
  Button, Space, Spin, Table,
} from 'antd'
import { useRequest } from 'ahooks'
import { forwardRef, useEffect, useState } from 'react'
import { useGroup } from '@/components/GroupContext'
import { adminClient } from '@/api'

function GroupMemberList() {
  const [dataSource, setDataSource] = useState(([]))
  const [pagination, setPagination] = useState(/** @type {import('antd').PaginationProps} */({
    simple: true,
    current: 1,
    pageSize: 15,
  }))
  const { currentGroup } = useGroup()
  const {
    loading, runAsync: fetchGroupMemberPage,
  } = useRequest(adminClient.groupMemberPage, { manual: true })
  const {
    runAsync: fetchRemoveGroupMember,
  } = useRequest(adminClient.removeGroupMember, { manual: true })

  const fetchPage = () => {
    fetchGroupMemberPage(currentGroup?.id, {
      pageNum: pagination?.current,
      pageSize: pagination?.pageSize,
    })
      .then(({ data }) => data)
      .then(({ content, totalElements }) => {
        setDataSource(content)
        setPagination({
          ...pagination,
          total: totalElements,
        })
      })
  }
  const removeGroupMember = (memberId) => {
    fetchRemoveGroupMember(currentGroup?.id, memberId)
      .then(fetchPage)
  }

  useEffect(() => {
    fetchPage()
  }, [pagination?.current, pagination?.pageSize])

  /**
   * @type {import('antd').TableColumnProps<User>[]}
   */
  const columns = [
    {
      key: 'index',
      title: '序号',
      render: (_1, _2, index) => (pagination.current - 1) * pagination.pageSize + index + 1,
      width: '10%',
    },
    {
      dataIndex: 'nickname',
      title: '昵称',
      valueType: 'text',
    },
    {
      key: 'options',
      title: '操作',
      render: (_, record) => (
        <Space>
          <Button type="link" danger onClick={() => removeGroupMember(record.id)}>移除</Button>
        </Space>
      ),
      width: 200,
    },
  ]

  return (
    <>
      <Spin spinning={loading}>
        <Table
          columns={columns}
          rowKey="id"
          dataSource={dataSource}
          pagination={pagination}
          sticky
          onChange={(pagination) => setPagination(pagination)}
        />
      </Spin>
    </>
  )
}

export default forwardRef(GroupMemberList)
