import {
  createContext, useContext, useEffect, useMemo, useState,
} from 'react'
import { adminClient } from '@/api'

const GroupContext = createContext(null)

function useGroup() {
  return useContext(GroupContext)
}

function GroupProvider({ children }) {
  const [groups, setGroups] = useState([])
  const [current, toggleGroup] = useState(null)

  useEffect(() => {
    adminClient.getMyGroups()
      .then(({ data }) => {
        setGroups(data)
        toggleGroup(data[0].id)
      })
  }, [])

  const currentGroup = useMemo(
    () => groups.find(({ id }) => id === current),
    [current],
  )

  const value = useMemo(() => ({
    groups, currentGroup, toggleGroup,
  }), [groups, current])

  return (
    <GroupContext.Provider value={value}>
      {children}
    </GroupContext.Provider>
  )
}

export {
  GroupProvider, useGroup,
}
