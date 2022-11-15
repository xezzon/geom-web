import { CloseOutlined, FilterOutlined } from '@ant-design/icons'
import { ProField } from '@ant-design/pro-components'
import { useCounter, useDynamicList } from 'ahooks'
import {
  Button, Col, Popover, Row, Select,
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
   * 筛选器
   */
  const {
    list: filters, push, resetList, replace, remove, getKey,
  } = useDynamicList([])
  /**
   * 筛选表达式
   */
  const filterExpression = useMemo(() => {
    const expressions = filters
      .filter(({ field }) => field)
      .filter(({ operator }) => operator)
      .filter(({ value }) => value)
      .map(({
        field, valueType, operator, value,
      }) => `${field} ${operator === 'NNULL' ? 'NULL' : operator} ${valueExpress(value, valueType, operator)}`)
    if (foreignFilter) {
      expressions.unshift(`(${foreignFilter})`)
    }
    return expressions.join(' AND ')
  }, [filters])
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
  /**
   * 触发查询
   */
  const [querySignal, { inc: search }] = useCounter(0)

  useEffect(() => {
    console.debug(queryParam)
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
          <Button className="mx-1" onClick={() => push({})}>
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
 *
 * @param {object} props
 * @param {import("antd/lib/table").ColumnProps[]} props.columns
 * @param {{ field: string, type: string, operator: string, value: string }[]} props.filters
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

  return (
    <>
      {filters.map(({
        field, valueType, operator, value,
      }, index) => (
        <Row gutter={16} key={getKey(index)} className="my-2">
          {/* 查询字段 */}
          <Col span={7}>
            <Select
              value={field}
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
              className="mx-1"
              style={{ width: '100%' }}
              onChange={(field) => onChange(index, { field, valueType: getType(field) })}
            />
          </Col>
          {/* 操作符 */}
          <Col span={5}>
            <Select
              value={operator}
              options={operators.filter(({ valueTypes }) => valueTypes.includes(valueType))}
              placeholder="条件"
              className="mx-1"
              disabled={!field}
              style={{ width: '100%' }}
              onChange={(operator) => onChange(index, {
                field, valueType, operator, value,
              })}
            />
          </Col>
          {/* 查询值 */}
          <Col span={10}>
            <div style={{ display: ['NULL', 'NNULL'].includes(operator) ? 'none' : '' }}>
              <ProField
                value={value}
                valueType={valueType}
                fieldProps={{
                  options: getOptions(field),
                  fieldNames: valueType === 'select' ? { value: 'code' } : undefined,
                  mode: 'multiple',
                  disabled: !field,
                  placeholder: '查询值',
                  checkedChildren: getOptions(field)?.checkedChildren,
                  unCheckedChildren: getOptions(field)?.unCheckedChildren,
                }}
                mode="edit"
                className="d-none"
                style={{ width: '100%' }}
                onChange={(e) => onChange(index, {
                  field,
                  valueType,
                  operator,
                  value: ['text'].includes(valueType) ? e.target.value : e,
                })}
              />
            </div>

          </Col>
          {/* 操作列 */}
          <Col span={2}>
            <Button type="text" icon={<CloseOutlined />} onClick={() => onRemove(index)} />
          </Col>
        </Row>
      ))}
      <Button type="link" className="d-none">
        高级模式
      </Button>
    </>
  )
}

export default forwardRef(CommonQuery)
