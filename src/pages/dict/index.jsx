import { Button, Space, Table } from 'antd'

function DictPage() {
  /**
   * @type {import('antd').TableColumnProps}
   */
  const columns = [
    {
      dataIndex: 'label',
      title: '字典名',
    },
    {
      dataIndex: 'code',
      title: '字典值',
    },
    {
      dataIndex: 'ordinal',
      title: '排序号',
    },
    {
      key: 'options',
      title: '操作',
      render: (_, { parentId }) => (
        <Space>
          <Button type="link" style={{ display: parentId === '0' ? '' : 'none' }}>
            新增字典
          </Button>
          <Button type="link" danger>
            删除
          </Button>
        </Space>
      ),
    },
  ]

  const data = [
    {
      id: '1',
      tag: 'dict',
      code: 'asdlgn',
      label: '大陆让利的',
      parentId: '0',
      ordinal: 1,
      children: [
        {
          id: '11',
          tag: 'dict',
          code: 'nhemhjset',
          label: '哪里的讣告',
          parentId: '1',
          ordinal: 1,
        },
        {
          id: '12',
          tag: 'dict',
          code: 'asdhjmghed',
          label: '击破i企鹅',
          parentId: '1',
          ordinal: 2,
        },
      ],
    },
    {
      id: '2',
      tag: 'dict',
      code: 'asdhjmghed',
      label: '埃里克客户',
      parentId: '0',
      ordinal: 2,
      children: [
        {
          id: '21',
          tag: 'dict',
          code: 'asdlgn',
          label: '佩拉尔吗',
          parentId: '2',
          ordinal: 1,
        },
        {
          id: '22',
          tag: 'dict',
          code: 'asdhjmghed',
          label: '让微软看不见你',
          parentId: '2',
          ordinal: 2,
        },
      ],
    },
  ]

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey="id"
    />
  )
}

export default DictPage
