/**
 *
 * @template T
 * @param {Array<T>} tree
 * @param {(callback: Array<T>) => Array<T>} callback
 * @param {string} childrenProp
 * @returns {Array<T>}
 */
 function nest(tree, callback, childrenProp = 'children') {
  return callback(tree).map((item) => {
    const children = item[childrenProp]
    if (!children) {
      return item
    }
    return {
      ...item,
      [childrenProp]: callback(children),
    }
  })
}

/**
 * 树形数据筛选
 * @param {Array} tree
 * @param {(object) => boolean} filter
 */
function filterDeep(tree, filter, childrenProp = 'children') {
  return nest(tree, (arr) => arr.filter(filter), childrenProp)
}

export { nest, filterDeep }
