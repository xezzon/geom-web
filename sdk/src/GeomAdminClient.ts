import axios from 'axios'
import { Instance, InstanceConfig } from '@/typings';
import {
  getMe, login, logout, register,
} from '@/api/user';
import {
  addDict, dictByTagAndCode, dictListByTag, dictTagPage, modifyDict, removeDict,
} from '@/api/dict';

export default (config: InstanceConfig) => {
  const instance: Instance = axios.create(config)

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
  }
}
