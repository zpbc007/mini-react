import { renderComponent } from '../react-dom'

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