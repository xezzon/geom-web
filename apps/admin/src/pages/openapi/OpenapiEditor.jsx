import { useRequest } from 'ahooks'
import { Form, Input, Select } from 'antd'
import { forwardRef, useImperativeHandle } from 'react'
import { openapiClient } from '@/api'

function OpenapiEditor({ initData }, ref) {
  const [form] = Form.useForm()
  const {
    loading, runAsync: fetchAddOpenapi,
  } = useRequest(openapiClient.addOpenapi, { manual: true })

  const add = async () => form
    .validateFields()
    .then(fetchAddOpenapi)

  useImperativeHandle(ref, () => ({
    loading,
    save: add,
  }))

  return (
    <Form
      form={form}
      initialValues={initData}
      preserve={false}
      labelCol={{
        xs: { span: 24 },
        sm: { span: 6 },
      }}
      wrapperCol={{
        xs: { span: 24 },
        sm: { span: 14 },
      }}
    >
      <Form.Item
        name="id"
        hidden
      >
        <Input disabled />
      </Form.Item>
      <Form.Item
        name="code"
        label="接口编码"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="name"
        label="接口名称"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="type"
        label="接口类型"
        rules={[{ required: true }]}
      >
        <Select
          fieldNames={{
            value: 'code',
          }}
          options={[
            { code: 'RPC', label: 'RPC' },
            { code: 'WEBHOOK', label: 'WEBHOOK' },
          ]}
        />
      </Form.Item>
    </Form>
  )
}

export default forwardRef(OpenapiEditor)
