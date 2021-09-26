import './App.css'
import loadWeb3 from './loadweb3'
import React, { Component } from 'react'
import loadContract from './loadContract'

// Necessary to be able to use metamask
window.ethereum.enable()

class App extends Component {
  web3 = null

  state = {
    manager: '',
    players: {},
    accounts: [],
    pot: '',
  }

  async AppLoadWeb3() {
    if (this.web3) {
      return this.web3
    } else {
      return await loadWeb3()
    }
  }

  async componentDidMount() {
    const lottery = await loadContract()
    const owner = await lottery.methods.getOwner().call()
    const players = await lottery.methods.getPlayers().call()
    const accounts = await window.ethereum.request({ method: 'eth_accounts' })
    const web3 = await this.AppLoadWeb3()
    const pot = await web3.eth.getBalance(lottery.options.address)

    this.setState({ owner, players, accounts, pot })
    _(`Using web3 version ${web3.version}`)
    _('Accounts available', accounts)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src="/ethereum.svg" className="App-logo" alt="logo" />
          <p>
            This lottery is managed by: <br />
            {this.state.owner}
            &nbsp;
            <a
              className="App-link"
              href={'https://rinkeby.etherscan.io/address/' + this.state.owner}
            >
              (see address info)
            </a>
          </p>
          <p>
            Number of registered players: {this.state.players.length}
            <br />
            Ethereum pot: {this.state.pot}
          </p>
        </header>
        <p>Available Metamask accounts:</p>
        <div className="App-footer">
          <ul>
            {this.state.accounts.map((account) => (
              <li>{account}</li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

function _(...args) {
  console.log(`🦊 `, ...args)
}

export default App
