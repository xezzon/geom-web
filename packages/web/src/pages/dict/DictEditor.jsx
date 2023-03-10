import { useRequest } from 'ahooks'
import { Input, Form, InputNumber } from 'antd'
import { useImperativeHandle, forwardRef } from 'react'
import { add as addApi } from '@/api/dict'

function DictEditor({ initData }, ref) {
  const [form] = Form.useForm()
  const { loading, runAsync: runAddApi } = useRequest(addApi, { manual: true })

  const add = async () => form
    .validateFields()
    .then(runAddApi)
    .catch((reason) => {
      console.log(reason)
      return Promise.reject(reason)
    })

  useImperativeHandle(ref, () => ({
    loading,
    save: add,
  }))

  return (
    <Form
      form={form}
      initialValues={{ ordinal: 1, ...initData }}
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
        name="tag"
        label="字典目"
        rules={[{ required: true }]}
        hidden
      >
        <Input disabled />
      </Form.Item>
      <Form.Item
        name="code"
        label="编码"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="label"
        label="名称"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="ordinal"
        label="排序"
        rules={[{ required: true }]}
      >
        <InputNumber precision={0} />
      </Form.Item>
      <Form.Item
        name="parentId"
        label="上级字典"
        rules={[{ required: true }]}
        hidden
      >
        <Input />
      </Form.Item>
    </Form>
  )
}

export default forwardRef(DictEditor)
