import React, { Component } from 'react'

class Footer extends React.Component {

    constructor(props) {
        super(props)
        
        this.state = {
            accounts: props.accounts,
            owner: props.owner,
            chooseWinner: props.chooseWinner,
        }
    }

    static getDerivedStateFromProps(props, state) {
        return {
            accounts: props.accounts,
            owner: props.owner,
            chooseWinner: props.chooseWinner,
        }
    }

    render = () => {
        return (
            <div className='App-footer'>
                <p>Available Metamask accounts:</p>
                
                <div>
                    <ul>
                    {this.state.accounts.map((account, index) => (
                        <li key={ index } >{account}</li>
                    ))}
                    </ul>
                </div>

                <p>Lottery Owner: <small>{this.state.owner}</small>
                    &nbsp;
                    <a
                        className="App-link"
                        href={'https://rinkeby.etherscan.io/address/' + this.state.owner}
                        target="_blank"
                        rel="noopener noreferrer"
                    >see address info</a>
                </p>

                <p>
                    Are you the owner?
                    <a href="#" className='App-link' onClick={ this.state.chooseWinner }>Choose a winner!</a>
                </p>
            </div>
        )
    }
}

export default Footer