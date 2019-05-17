/**
 * 创建vnode 其实并没有干啥 只是记录当前节点的标签、属性、与子节点
 * @param {*} tag 
 * @param {*} attrs 
 * @param  {...any} children 
 */
export function createElement(tag, attrs, ...children) {
    return {
        tag,
        attrs,
        children
    }
}