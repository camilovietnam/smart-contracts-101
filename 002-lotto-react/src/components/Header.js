import  React, { Component } from 'react'

class Header extends Component {
    state = {
        pot: '',
        players: [],
    }

    static getDerivedStateFromProps(props, state) {
        return {
            pot: props.pot,
            players: props.players,
        }
    }

    render() {
        return (<header className="App-header">
            <h1 className={"App-title"}>
                <img src="/ethereum.svg" className="App-logo" alt="logo" />
                YOU COULD WIN!!
                <img src="/ethereum.svg" className="App-logo" alt="logo" />
            </h1>
            <p className='text-rainbow Paragraph-pot'>
                {this.state.pot} Ether            
            </p>
            <p>
                Number of registered players: {this.state.players.length}
            </p>
        </header>)
    }
}

export default Header