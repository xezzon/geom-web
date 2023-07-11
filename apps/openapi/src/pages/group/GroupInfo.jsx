import { Button } from 'antd';
import { useState } from 'react';
import { useGroup } from '@/components/GroupContext';

function GroupInfo() {
  const [secretKey, setSecretKey] = useState('')
  const { currentGroup } = useGroup()

  const refreshSecretKey = () => {
    adminClient.generateSecretKey(currentGroup?.id)
      .then((secretKey) => {
        setSecretKey(secretKey)
      })
  }

  return (
    <>
      <p>{`Access Key: ${currentGroup?.accessKey}`}</p>
      <p>
        {`Secret Key: ${secretKey || '*'.repeat(16)}`}
        <Button type="link" danger onClick={refreshSecretKey}>刷新</Button>
      </p>
    </>
  )
}

export default GroupInfo
