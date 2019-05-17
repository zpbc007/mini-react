import { Component } from './component'
import { createElement } from './create-element'
import { render } from './render'

const MReact = {
    createElement,
    Component
}

const MReactDom = {
    render: (vnode, container) => {
        container.innerHTML = ''
        return render(vnode, container)
    }
}

export { MReact, MReactDom }