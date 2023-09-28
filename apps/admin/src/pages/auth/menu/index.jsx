/**
 * @typedef {import('@xezzon/geom').Menu} Menu
 */
import { PlusOutlined } from '@ant-design/icons'
import { PageContainer } from '@ant-design/pro-components'
import { useRequest } from 'ahooks'
import {
  Button, Modal, Space, Spin, Table,
} from 'antd'
import { useEffect, useRef, useState } from 'react'
import { adminClient } from '@/api'
import MenuForm from './MenuForm'

function MenuPage() {
  const [menus, setMenus] = useState(/** @type {Menu[]} */([]))
  const [record, setRecord] = useState(/** @type {Menu} */(null))
  const {
    loading, runAsync: _getMenuTree,
  } = useRequest(adminClient.menuTree, { manual: true })

  const formRef = useRef((null))

  const fetchMenuTree = () => {
    _getMenuTree()
      .then(({ data }) => {
        setMenus(data)
      })
  }
  const saveMenu = () => {
    formRef.current
      .save()
      .then(() => {
        setRecord()
      })
      .then(fetchMenuTree)
  }
  const deleteMenu = (id) => {
    adminClient.deleteMenu(id)
      .then(fetchMenuTree)
  }

  useEffect(() => {
    fetchMenuTree()
  }, [])

  /**
   * @type {import('antd').TableColumnProps<Menu>[]}
   */
  const columns = [
    {
      key: 'index',
      title: '序号',
      render: (_value, _record, index) => index + 1,
      width: '15%',
    },
    {
      dataIndex: 'fullPath',
      title: '全路径',
      valueType: 'text',
    },
    {
      dataIndex: 'name',
      title: '名称',
      valueType: 'text',
    },
    {
      dataIndex: 'ordinal',
      title: '排序',
    },
    {
      key: 'options',
      title: '操作',
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            onClick={() => setRecord({
              parentId: record.id,
            })}
          >
            新增
          </Button>
          <Button
            type="link"
            onClick={() => setRecord(record)}
          >
            修改
          </Button>
          <Button
            type="link"
            danger
            onClick={() => deleteMenu(record.id)}
          >
            删除
          </Button>
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
          })}
        >
          新增
        </Button>
      </Space>
    </div>
  )

  return (
    <>
      <PageContainer
        fixedHeader
        header={{
          breadcrumb: {},
        }}
      >
        <Spin spinning={loading}>
          <Table
            columns={columns}
            rowKey="id"
            dataSource={menus}
            title={Toolbar}
          />
        </Spin>
      </PageContainer>
      <Modal
        title="编辑菜单"
        open={!!record}
        destroyOnClose
        okText="保存"
        maskClosable={false}
        onOk={saveMenu}
        onCancel={() => { setRecord() }}
      >
        <MenuForm
          initData={record}
          menus={menus}
          ref={formRef}
        />
      </Modal>
    </>
  )
}

export {
  MenuPage as Component,
}
