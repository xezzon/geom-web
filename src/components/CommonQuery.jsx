import { CloseOutlined, FilterOutlined, PlusOutlined } from '@ant-design/icons'
import { ProField } from '@ant-design/pro-components'
import { useUpdate, useCounter, useDynamicList } from 'ahooks'
import {
  Space, Button, Col, Popover, Row, Select,
} from 'antd'
import {
  forwardRef, useEffect, useImperativeHandle, useMemo,
} from 'react'

/**
 * 通用查询组件
 * @param {object} props
 * @param {import("antd/lib/table").ColumnProps[]} props.columns
 * @param {{ field: string, order: string }} props.sorter
 * @param {string} props.filter
 * @param {{ current: number, pageSize: number }} props.pagination
 * @param {Function} props.onQuery
 */
function CommonQuery({
  columns, sorter, filter: foreignFilter, pagination, onQuery,
}, ref) {
  /**
   * 将值转化为值表达式
   * @param {any} value
   * @param {string} valueType
   * @param {string} operator
   * @returns 值表达式
   */
  const valueExpress = (value, valueType, operator) => {
    if (operator === 'NULL') {
      return true
    }
    if (operator === 'NNULL') {
      return false
    }
    if (['digit', 'switch'].includes(valueType)) {
      return value
    }
    return `'${value}'`
  }
  /**
   * 筛选器转为表达式
   * @param {Filter[]} filters
   * @returns {string}
   */
  const filterExpress = (filters) => filters
    .filter(({ field, operator }) => field && operator)
    .map(({
      logic, field, valueType, operator, value, children,
    }) => {
      if (children?.length) {
        return `${logic} (${filterExpress([{
          logic, field, valueType, operator, value,
        }, ...children])})`
      }
      return `${logic} ${field} ${operator === 'NNULL' ? 'NULL' : operator} ${valueExpress(value, valueType, operator)}`
    })
    .join(' ')
    .replace(/^(AND|OR)/, '')
    .trim()

  /**
   * 触发查询
   */
  const [querySignal, { inc: search }] = useCounter(0)
  /**
   * 筛选器
   */
  const {
    list: filters, push, resetList, replace, remove, getKey,
  } = useDynamicList([])
  /**
   * 筛选表达式
   */
  const filterExpression = useMemo(() => {
    const expression = filterExpress(filters)
    if (foreignFilter) {
      return expression ? `(${foreignFilter}) AND (${expression})` : foreignFilter
    }
    return expression
  }, [filters, querySignal])
  /**
   * 排序表达式
   */
  const sortExpression = useMemo(() => {
    const sorter1 = Array.isArray(sorter) ? sorter : [sorter]
    return sorter1
      .filter(({ field, order }) => field && order)
      .map(({ field, order }) => `${field}:${order}`)
      .join(',')
  }, [sorter])
  /**
   * 查询参数
   */
  const queryParam = useMemo(
    () => ({
      filter: filterExpression,
      sort: sortExpression,
      pageNum: pagination?.current,
      pageSize: pagination?.pageSize,
    }),
    [filterExpression, sortExpression, pagination?.current, pagination?.pageSize],
  )

  useEffect(() => {
    console.debug(filters, queryParam)
    onQuery(queryParam)
  }, [querySignal, foreignFilter, sorter, pagination?.current, pagination?.pageSize])

  /**
   * 暴露给外部的接口
   */
  useImperativeHandle(ref, () => ({
    queryParam,
    search,
  }))

  return (
    <Popover
      title={(
        <div className="text-end">
          <Button className="mx-1" onClick={() => push({ logic: 'AND', level: 0, children: [] })}>
            新增
          </Button>
          <Button className="mx-1" onClick={() => resetList([])}>
            重置
          </Button>
          <Button type="primary" className="mx-1" onClick={search}>
            筛选
          </Button>
        </div>
      )}
      content={(
        <FilterList
          columns={columns}
          filters={filters}
          getKey={getKey}
          onChange={replace}
          onRemove={remove}
        />
      )}
      trigger="click"
      placement="bottomRight"
      overlayInnerStyle={{
        minHeight: '38.2vh',
        maxHeight: '70vh',
        minWidth: '38.2vw',
        maxWidth: '61.8vw',
        overflowY: 'auto',
      }}
    >
      <Button icon={<FilterOutlined />}>筛选</Button>
    </Popover>
  )
}

/**
 * @typedef Filter
 * @property {string} logic
 * @property {string} field
 * @property {string} operator
 * @property {string} value
 * @property {Filter[]} children
 */
/**
 *
 * @param {object} props
 * @param {import("antd/lib/table").ColumnProps[]} props.columns
 * @param {Filter[]} props.filters
 * @param {Function} props.getKey
 * @param {Function} props.onChange
 * @param {Function} props.onRemove
 */
function FilterList({
  columns, filters, getKey, onChange, onRemove,
}) {
  /**
   * @typedef Operator
   * @property {string} value
   * @property {string} label
   * @property {import('@ant-design/pro-components').ProFieldValueType[]} valueTypes
   */
  /**
   * 支持的操作符
   * @readonly
   * @type {Operator[]}
   */
  const operators = [
    {
      value: 'EQ',
      label: '等于',
      valueTypes: ['text', 'digit', 'datetime', 'date', 'time', 'switch'],
    },
    {
      value: 'NE',
      label: '不等于',
      valueTypes: ['text', 'digit', 'datetime', 'date', 'time'],
    },
    {
      value: 'LLIKE',
      label: '以...开头',
      valueTypes: ['text'],
    },
    {
      value: 'IN',
      label: '包含于',
      valueTypes: ['select'],
    },
    {
      value: 'OUT',
      label: '不包含',
      valueTypes: ['select'],
    },
    {
      value: 'GT',
      label: '大于',
      valueTypes: ['digit', 'datetime', 'date', 'time'],
    },
    {
      value: 'GE',
      label: '大于等于',
      valueTypes: ['digit', 'datetime', 'date', 'time'],
    },
    {
      value: 'LT',
      label: '小于',
      valueTypes: ['digit', 'datetime', 'date', 'time'],
    },
    {
      value: 'LE',
      label: '小于等于',
      valueTypes: ['digit', 'datetime', 'date', 'time'],
    },
    {
      value: 'NULL',
      label: '为空',
      valueTypes: ['text', 'digit', 'datetime', 'date', 'time', 'switch'],
    },
    {
      value: 'NNULL',
      label: '不为空',
      valueTypes: ['text', 'digit', 'datetime', 'date', 'time', 'switch'],
    },
  ]

  /**
   * 计算当前行类型
   * @param {string} field
   */
  const getType = (field) => columns.find(({ dataIndex }) => dataIndex === field)?.valueType
  /**
   * 计算当前行字典枚举
   * @param {string} field
   */
  const getOptions = (field) => columns.find(({ dataIndex }) => dataIndex === field)?.options

  const forceUpdate = useUpdate()

  return (
    <>
      {filters.map((filter, index) => (
        <div key={getKey(index)}>
          <Row gutter={16} className="my-2" style={{ marginLeft: `${filter.level * 2}rem` }}>
            <Col span={3}>
              <Select
                value={filter.logic}
                options={[
                  { value: 'AND', label: '且' },
                  { value: 'OR', label: '或' },
                ]}
                placeholder="逻辑"
                disabled={index + filter.level === 0}
                className="mx-1 w-100"
                onChange={(logic) => onChange(index, { ...filter, logic })}
              />
            </Col>
            {/* 查询字段 */}
            <Col span={5}>
              <Select
                value={filter.field}
                options={columns
                  .filter(({ dataIndex }) => dataIndex)
                  .filter(({ hideInSearch }) => !hideInSearch)
                  .filter(({ valueType }) => valueType)}
                fieldNames={{
                  value: 'dataIndex',
                  label: 'title',
                  options: 'children',
                }}
                placeholder="列名"
                allowClear
                className="mx-1 w-100"
                onChange={(field) => onChange(index, {
                  ...filter,
                  field,
                  valueType: getType(field),
                  operator: null,
                  value: null,
                })}
              />
            </Col>
            {/* 操作符 */}
            <Col span={5}>
              <Select
                value={filter.operator}
                options={operators.filter(
                  ({ valueTypes }) => valueTypes.includes(filter.valueType),
                )}
                placeholder="条件"
                className="mx-1 w-100"
                disabled={!filter.field}
                onChange={(operator) => onChange(index, { ...filter, operator })}
              />
            </Col>
            {/* 查询值 */}
            <Col span={8}>
              <div style={{ display: ['NULL', 'NNULL'].includes(filter.operator) ? 'none' : '' }}>
                <ProField
                  value={filter.value}
                  valueType={filter.valueType}
                  fieldProps={{
                    options: getOptions(filter.field),
                    fieldNames: filter.valueType === 'select' ? { value: 'code' } : undefined,
                    mode: 'multiple',
                    disabled: !filter.field,
                    placeholder: '查询值',
                    checkedChildren: getOptions(filter.field)?.checkedChildren,
                    unCheckedChildren: getOptions(filter.field)?.unCheckedChildren,
                  }}
                  mode="edit"
                  className="w-100"
                  onChange={(e) => onChange(index, {
                    ...filter,
                    value: ['text'].includes(filter.valueType) ? e.target.value : e,
                  })}
                />
              </div>

            </Col>
            {/* 操作列 */}
            <Col span={1}>
              <Space.Compact>
                <Button
                  type="text"
                  icon={<PlusOutlined />}
                  size="small"
                  onClick={() => onChange(index, {
                    ...filter,
                    children: [...filter.children, {
                      logic: 'AND',
                      level: filter.level + 1,
                      children: [],
                    }],
                  })}
                />
                <Button
                  type="text"
                  icon={<CloseOutlined />}
                  size="small"
                  onClick={() => onRemove(index)}
                />
              </Space.Compact>
            </Col>
          </Row>
          <FilterList
            columns={columns}
            filters={filter.children}
            getKey={(i) => i}
            onChange={(i, data) => {
              filter.children.splice(i, 1, data)
              forceUpdate()
            }}
            onRemove={(i) => {
              filter.children.splice(i, 1)
              forceUpdate()
            }}
          />
        </div>
      ))}
      <Button type="link" className="d-none">
        高级模式
      </Button>
    </>
  )
}

export default forwardRef(CommonQuery)
