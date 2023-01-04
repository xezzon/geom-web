/**
 * 树形数据筛选
 * @param {Array} tree
 * @param {Function<object, boolean>} filter
 */
function filterDeep(tree, filter, childrenProp = 'children') {
  return tree.filter(filter)
    .map((item) => {
      if (!item[childrenProp]) {
        return item
      }
      return {
        ...item,
        [childrenProp]: filterDeep(item[childrenProp], filter, childrenProp),
      }
    })
}

export { filterDeep }
