import { Button, Table, Space } from 'antd'
import { route } from '@/route'
import { filterDeep } from '@/util/tree'

const data = filterDeep(route.routes, ({ hideInMenu }) => hideInMenu !== true)

function MenuPage() {
  /**
   * @type {import('antd').TableColumnProps}
   */
  const columns = [
    {
      dataIndex: 'name',
      title: '菜单名称',
      width: '33%',
    },
    {
      dataIndex: 'path',
      title: '菜单路径',
      width: '33%',
    },
    {
      dataIndex: 'icon',
      title: '图标',
    },
    {
      key: 'options',
      title: '操作',
      render: () => (
        <Space>
          <Button type="link">绑定角色</Button>
        </Space>
      ),
    },
  ]

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey="path"
    />
  )
}

export default MenuPage
