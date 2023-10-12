/**
 * @typedef {import('@xezzon/geom').Group} Group
 */
/**
 * @typedef {Object} GroupContextProps
 * @property {Group[]} groups 当前用户所在用户组
 * @property {Group} currentGroup 当前启用的用户组
 * @property {(group: Group) => void} toggleGroup
 */
import {
  createContext, useContext, useEffect, useMemo, useState,
} from 'react'
import { useNavigate } from 'react-router-dom'
import { adminClient } from '@/api'

/**
 * @type {React.Context<GroupContextProps>}
 */
const GroupContext = createContext(null)

function useGroup() {
  return useContext(GroupContext)
}

function GroupProvider({ children }) {
  const [groups, setGroups] = useState(/** @type {Group[]} */([]))
  const [current, toggleGroup] = useState(/** @type {Group} */(null))
  const navigate = useNavigate()

  useEffect(() => {
    adminClient.getMyGroups()
      .then(({ data }) => {
        setGroups(data)
        if (data.length === 0) {
          navigate('/group/new')
          return;
        }
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
