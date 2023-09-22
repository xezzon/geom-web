import { forwardRef, useImperativeHandle } from 'react';
import {
  Form, Input, TreeSelect, InputNumber, Switch,
} from 'antd';

function MenuForm({ initData, menus }, ref) {
  const [formRef] = Form.useForm()

  const save = () => formRef.validateFields()
    .then((data) => {
      if (record.id) {
        return adminClient.modifyMenu(data)
      }
      return adminClient.addMenu(data)
    })

  useImperativeHandle(ref, () => ({
    save,
  }))

  return (
    <Form
      form={formRef}
      initialValues={{ ordinal: 1, hideInMenu: false, ...initData }}
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 18 }}
    >
      <Form.Item name="id" hidden>
        <Input disabled />
      </Form.Item>
      <Form.Item name="parentId" label="上级菜单" rules={[{ required: true }]}>
        <TreeSelect
          fieldNames={{ label: 'name', value: 'id' }}
          treeData={[{ id: '0', name: '全部', children: menus }]}
        />
      </Form.Item>
      <Form.Item name="path" label="路径" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="name" label="名称" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="component" label="组件路径">
        <Input />
      </Form.Item>
      <Form.Item name="icon" label="图标">
        <Input />
      </Form.Item>
      <Form.Item name="ordinal" label="排序" rules={[{ required: true }]}>
        <InputNumber precision={0} />
      </Form.Item>
      <Form.Item name="hideInMenu" label="隐藏" rules={[{ required: true }]} valuePropName="checked">
        <Switch checkedChildren="是" unCheckedChildren="否" />
      </Form.Item>
    </Form>
  )
}

export default forwardRef(MenuForm)
