/**
 * 为节点设置属性
 * @param {*} dom 
 * @param {*} name 
 * @param {*} value 
 */
export function setAttribute(dom, name, value) {
    // class 为关键字
    if (name === 'className') {
        name = 'class'
    }

    // 事件监听
    if (/on\w+/.test(name)) {
        name = name.toLowerCase()
        dom[name]= value || ''
    } else if (name === 'style') {
        if (!value || typeof value === 'string') {
            dom.style.cssText = value || ''
        } else if (value && typeof value === 'object') {
            for (let name in value) {
                dom.style[name] = typeof value[name] === 'number' ? value[name] + 'px' : value[name]
            }
        } else {
            if (name in dom) {
                dom[name] = value || ''
            }
            if (value) {
                dom.setAttribute(name, value)
            } else {
                dom.removeAttribute(name)
            }
        }
    }
}