import { setAttribute } from './set-attribute'
import { createComponent, setComponentProps } from './component'

/**
 * 将虚拟dom渲染后的结构添加到真实dom中
 * @param {*} vnode 
 * @param {*} container 
 */
export function render(vnode, container) {
    return container.appendChild(_render(vnode))
}

/**
 * 虚拟dom转为真实dom
 * @param {*} vnode 
 */
export function _render(vnode) {
    if (vnode === 'undefined' || vnode === null || typeof vnode === 'boolean') {
        vnode = ''
    }

    if (typeof vnode === 'number') {
        vnode = String(vnode)
    }

    if (typeof vnode === 'string') {
        const textNode = document.createTextNode(vnode)

        return textNode
    }

    if (typeof vnode.tag === 'function') {
        const component = createComponent(vnode.tag, vnode.attrs)
        setComponentProps(component, vnode.attrs)

        return component.base
    }

    const dom = document.createElement(vnode.tag)

    if (vnode.attrs) {
        Object.keys(vnode.attrs).forEach(key => {
            const value = vnode.attrs[key]
            setAttribute(dom, key, value)
        })
    }

    vnode.children.forEach(child => render(child, dom))

    return dom
}