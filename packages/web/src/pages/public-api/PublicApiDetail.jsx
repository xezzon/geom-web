import { useRequest } from 'ahooks'
import { Form, Input } from 'antd'
import { forwardRef, useImperativeHandle } from 'react'
import { add as addApi } from '@/api/public-api'

/**
 * @param {object} props
 * @param {import('@/api/public-api').PublicApi} props.initData
 * @param {import("@ant-design/pro-components").ProFieldFCMode} props.mode
 */
function PublicApiDetail({ initData }, ref) {
  /**
   * 详情表单
   */
  const [form] = Form.useForm()
  /**
   * 异步请求 - 保存/更新
   */
  const { loading, runAsync: runSave } = useRequest(addApi, {
    manual: true,
  })
  /**
   * 保存
   */
  const saveDetail = async () => form
    .validateFields()
    .then(runSave)
    .catch((reason) => {
      console.log(reason)
      return Promise.reject(reason)
    })

  /**
   * 暴露给外部的接口
   */
  useImperativeHandle(ref, () => ({
    loading,
    save: saveDetail,
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
      <Form.Item name="service" label="服务提供者" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="code" label="调用识别码" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="name" label="接口名称" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="type" label="接口类型" hidden>
        <Input disabled />
      </Form.Item>
    </Form>
  )
}

export default forwardRef(PublicApiDetail)
