import { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";

/**
 * 通用返回结果
 */
export interface Result<T> {
  /**
   * 状态码 '00000'为正常
   */
  code: string,
  /**
   * 提示消息
   */
  message?: string,
  /**
   * 负载数据
   */
  data?: T,
  /**
   * 请求ID 通常用于追踪链路
   */
  requestId?: string,
}

/**
 * 通用查询参数
 */
export interface CommonQuery {
  /**
   * 字段表达式
   */
  select?: string[],
  /**
   * 排序表达式
   */
  sort?: string[],
  /**
   * 筛选表达式
   */
  filter?: string,
  /**
   * 搜索内容
   */
  searchKey?: string,
  /**
   * 页码 从1开始计
   */
  pageNum: number,
  /**
   * 页容 最大为2000
   */
  pageSize: number,
}

/**
 * 分页结果
 */
export interface Page<T> {
  /**
   * 页码 从0开始计
   */
  number: number,
  /**
   * 页容
   */
  size: number,
  /**
   * 数据总量
   */
  totalElements: number,
  /**
   * 数据项
   */
  content: T[],
  [k: string]: any,
}

/* 统一定义为抽象类型 暂时使用 Axios 实现 */
export declare type Instance = AxiosInstance
export declare type Interceptor =
  (config: InternalAxiosRequestConfig<any>) => InternalAxiosRequestConfig<any>
export declare type Response<T = any> = AxiosResponse<T>
