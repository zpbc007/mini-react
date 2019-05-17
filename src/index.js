import MReact from './react'
import MReactDom from './react-dom'

// function tick() {
//     const element = (
//         <div>
//             <h1>Hello, world!</h1>
//             <h2>It is {new Date().toLocaleTimeString()}.</h2>
//         </div>
//       );
//       MReactDom.render(
//         element,
//         document.getElementById( 'root' )
//     );
// }

// setInterval( tick, 1000 );

function Welcome(props) {
    return <h1>{props.name}</h1>
}

class Counter extends MReact.Component {
    constructor( props ) {
        super( props );
        this.state = {
            num: 0
        }
    }

    componentWillUpdate() {
        console.log( 'update' );
    }

    componentWillMount() {
        console.log( 'mount' );
    }

    onClick() {
        this.setState( { num: this.state.num + 1 } );
    }

    render() {
        return (
            <div onClick={ () => this.onClick() }>
                <h1>number: {this.state.num}</h1>
                <button>add</button>
                <Welcome name="1" />
                <Welcome name="2" />
            </div>
        );
    }
}

MReactDom.render(
    <Counter />,
    document.getElementById( 'root' )
);