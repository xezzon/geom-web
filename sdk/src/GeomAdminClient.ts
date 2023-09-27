import axios from 'axios'
import { InstanceConfig } from '@/typings';
import {
  getMe, login, logout, register, searchUser,
} from '@/api/user';
import {
  addDict, dictByTagAndCode, dictListByTag, dictTagPage, modifyDict, removeDict,
} from '@/api/dict';
import {
  addUserGroup,
  generateSecretKey, getMyGroups, groupMemberPage, joinGroup, removeGroupMember,
} from './api/group';
import {
  addMenu, deleteMenu, menuTree, modifyMenu,
} from './api/menu';

export default (config: InstanceConfig) => {
  const instance = axios.create(config)

  return {
    instance,
    /**
     * 用户注册
     */
    register: register(instance),
    /**
     * 用户登录
     */
    login: login(instance),
    /**
     * 获取当前登录用户信息
     */
    getMe: getMe(instance),
    /**
     * 退出登录
     */
    logout: logout(instance),
    /**
     * 搜索用户
     */
    searchUser: searchUser(instance),
    /**
     * 字典目列表（分页）
     */
    dictTagPage: dictTagPage(instance),
    /**
     * 新增字典/字典目
     */
    addDict: addDict(instance),
    /**
     * 查询字典目下的字典集合
     */
    dictListByTag: dictListByTag(instance),
    /**
     * 递归删除字典及其子级
     */
    removeDict: removeDict(instance),
    /**
     * 修改字典
     */
    modifyDict: modifyDict(instance),
    /**
     * 通过字典目和字典码查询字典信息
     */
    dictByTagAndCode: dictByTagAndCode(instance),
    /**
     * 查询当前用户所在用户组列表
     */
    getMyGroups: getMyGroups(instance),
    /**
     * 新增用户组
     */
    addUserGroup: addUserGroup(instance),
    /**
     * 重置用户组密钥
     */
    generateSecretKey: generateSecretKey(instance),
    /**
     * 查询用户组成员（分页）
     */
    groupMemberPage: groupMemberPage(instance),
    /**
     * 加入用户组
     */
    joinGroup: joinGroup(instance),
    /**
     * 移除用户组成员
     */
    removeGroupMember: removeGroupMember(instance),
    /**
     * 获取菜单（树形结构）
     */
    menuTree: menuTree(instance),
    /**
     * 新增菜单
     */
    addMenu: addMenu(instance),
    /**
     * 修改菜单
     */
    modifyMenu: modifyMenu(instance),
    /**
     * 删除菜单
     */
    deleteMenu: deleteMenu(instance),
  }
}
