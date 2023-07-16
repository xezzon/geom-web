import {
  Button, Space, Spin, Table,
} from 'antd'
import { useRequest } from 'ahooks'
import {
  forwardRef, useEffect, useRef, useState,
} from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { useGroup } from '@/components/GroupContext'
import { adminClient } from '@/api'
import UserSelect from './UserSelect'

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
    runAsync: _removeGroupMember,
  } = useRequest(adminClient.removeGroupMember, { manual: true })
  const {
    runAsync: _joinGroup,
  } = useRequest(adminClient.joinGroup, { manual: true })

  const userSelectRef = useRef(null)

  const fetchPage = () => {
    fetchGroupMemberPage(currentGroup.id, {
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
    _removeGroupMember(currentGroup.id, memberId)
      .then(fetchPage)
  }
  /**
   *
   * @param {import('@xezzon/geom/dist/api/user').User} user
   */
  const joinGroup = (user) => {
    _joinGroup(currentGroup.id, user.id)
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

  const Toolbar = () => (
    <div className="d-flex justify-content-between">
      <div />
      <Space>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            userSelectRef.current.open()
          }}
        >
          新增
        </Button>
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
      <UserSelect
        title={`添加成员到 ${currentGroup.name}`}
        onFinish={joinGroup}
        ref={userSelectRef}
      />
    </>
  )
}

export default forwardRef(GroupMemberList)
