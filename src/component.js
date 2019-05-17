import { _render } from './render'

export class Component {
    constructor(props = {}) {
        this.props = props
        this.state = {}
    }

    setState(changedState) {
        Object.assign(this.state, changedState)

        renderComponent( this );
    }
}

/** 创建 组件 */
export function createComponent(component, props) {
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