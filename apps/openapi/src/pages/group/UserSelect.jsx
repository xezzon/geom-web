/**
 * @typedef {import('@xezzon/geom/dist/api/user').User} User
 */
import { useRequest } from 'ahooks'
import {
  AutoComplete, Avatar, Button, List, Modal,
} from 'antd'
import { forwardRef, useImperativeHandle, useState } from 'react'
import { CloseOutlined, UserOutlined } from '@ant-design/icons'
import { adminClient } from '@/api'

/**
 * @param {object} param0
 * @param {(user: User) => void} param0.onFinish
 * @param {string} param0.title
 */
function UserSelect({ onFinish, title }, ref) {
  const [visible, setVisible] = useState(false)
  const [value, setValue] = useState(/** @type {User} */(null))
  const [options, setOptions] = useState(([]))

  const {
    runAsync: _searchUser,
  } = useRequest(adminClient.searchUser, { manual: false })

  const searchUser = (searchValue) => {
    _searchUser(searchValue)
      .then((resp) => resp.data)
      .then((users) => {
        setOptions(users.map((user) => ({
          ...user,
          value: user.id,
          label: `${user.username} - ${user.nickname}`,
        })))
      })
  }
  const handleSelect = (userId) => {
    const { value, label, ...user } = options.find(({ id }) => id === userId)
    setValue(user)
  }
  const handleFinish = () => {
    onFinish(value)
    setVisible(false)
  }

  useImperativeHandle(ref, () => ({
    open: () => setVisible(true),
  }))

  return (
    <>
      <Modal
        open={visible}
        title={title}
        destroyOnClose
        onOk={handleFinish}
        onCancel={() => setVisible(false)}
      >
        {value ? (
          <List
            dataSource={[value]}
            renderItem={(user) => (
              <List.Item
                actions={[
                  <Button key="delete" type="link" onClick={() => setValue(null)}><CloseOutlined /></Button>,
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar size={48} icon={<UserOutlined />} />}
                  title={user.username}
                  description={user.nickname}
                />
              </List.Item>
            )}
          />
        ) : (
          <AutoComplete
            options={options}
            onSearch={searchUser}
            onSelect={handleSelect}
            placeholder="通过用户名/用户昵称搜索"
            style={{ width: '100%' }}
          />
        )}
      </Modal>
    </>
  )
}

export default forwardRef(UserSelect)
