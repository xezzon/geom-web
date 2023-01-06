import {
  Row, Col, Table, Space, Button,
} from 'antd'

function RolePage() {
  /**
   * @type {import('antd').TableColumnProps}
   */
  const columns = [
    {
      dataIndex: 'name',
      title: '角色名称',
    },
    {
      dataIndex: 'code',
      title: '角色编码',
    },
    {
      key: 'options',
      title: '操作',
      render: () => (
        <Space>
          <Button type="link">绑定用户</Button>
          <Button type="link">分配权限</Button>
        </Space>
      ),
    },
  ]
  const data = [
    {
      id: '61',
      code: 'kqhaogwx',
      name: '时例展周',
    },
    {
      id: '56',
      code: 'cxzvn',
      name: '现调战给划进',
    },
    {
      id: '79',
      code: 'qgpqz',
      name: '总常毛革接段行',
    },
  ]

  return (
    <Row gutter={16}>
      <Col span={24}>
        <Table
          columns={columns}
          dataSource={data}
          rowKey="id"
        />
      </Col>
    </Row>
  )
}

export default RolePage
