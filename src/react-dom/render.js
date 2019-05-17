import { Component } from '../react'
import { setAttribute } from './dom'

/** 创建 组件 */
export default function createComponent(component, props) {
    let inst
    // class 直接使用 new 获得实例
    if (component.prototype && component.prototype.render) {
        inst = new component(props)
    } else {
        // function 添加 render 方法
        inst = new Component(props)
        inst.constructor = component
        inst.render = function() {
            return this.constructor(props)
        }
    }

    return inst
}

export function setComponentProps(component, props) {
    if (!component.base) { // 组件从未渲染过
        component.componentWillMount && component.componentWillMount()
    } else { // 组件渲染过
        component.WillReceiveProps && component.WillReceiveProps(props)
    }

    component.props = props

    renderComponent(component)
}

export function renderComponent(component) {
    let base
    // 渲染结果（vnode）
    const renderer = component.render()

    // 未渲染过 执行 componentWillUpdate 生命周期
    if (component.base && component.componentWillUpdate) {
        component.componentWillUpdate()
    }

    // 获取真实dom
    base = _render(renderer)

    // 执行生命周期
    if (component.base) {
        component.componentDidUpdate && component.componentDidUpdate()
    } else {
        component.componentDidMount && component.componentDidMount()
    }

    // 更新dom
    if (component.base && component.base.parentNode) {
        component.base.parentNode.replaceChild(base, component.base)
    }

    // 存放引用
    component.base = base
    base._component = component
}

/**
 * 虚拟dom转为真实dom
 * @param {*} vnode 
 */
function _render(vnode) {
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

/**
 * 将虚拟dom渲染后的结构添加到真实dom中
 * @param {*} vnode 
 * @param {*} container 
 */
export function render(vnode, container) {
    return container.appendChild(_render(vnode))
}