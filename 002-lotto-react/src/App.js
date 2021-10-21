import './App.css'
import loadWeb3 from './loadweb3'
import React, { Component } from 'react'
import loadContract from './loadContract'
import Header from './components/Header'
import LotteryForm from './components/LotteryForm'
import Footer from './components/Footer'

// Necessary to be able to use metamask
window.ethereum.enable()

class App extends Component {
    web3 = null

    state = {
        manager: '',
        players: {},
        accounts: [],
        pot: '',
        bet: '',
        message: '',
        owner: '',
    }

    async AppLoadWeb3() {
        if (this.web3) {
            return this.web3
        } else {
            return await loadWeb3()
        }
    }

    async componentWillMount() {
        const lottery = await loadContract()
        const owner = await lottery.methods.getOwner().call()
        const players = await lottery.methods.getPlayers().call()
        const accounts = await window.ethereum.request({ method: 'eth_accounts' })
        const web3 = await this.AppLoadWeb3()
        let pot = await web3.eth.getBalance(lottery.options.address)
        pot = web3.utils.fromWei(pot, "ether")
        const message = 'Waiting for submission'

        this.setState({ owner, players, accounts, pot, message })

        _(`Using web3 version ${web3.version}`)
        _('Accounts available', accounts)

    }

    onBetChange= event => {
        this.setState({
            bet: event.target.value
        })
    }

    onFormSubmit = async (event) => {
        event.preventDefault()

        const web3 = await this.AppLoadWeb3()
        const accounts = await web3.eth.getAccounts()
        const lottery = await loadContract()

        this.setState({ message: 'Entering lottery, please wait...' })
        try {
            await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei(this.state.bet, "ether"),
            })

            this.setState({ message: 'You entered the lottery! Good luck!' })
            this.reloadLotteryData(web3, lottery)
        } catch (e) {
            this.setState({ message: `Exception: ${e.message}` })
        } 
    }

    reloadLotteryData = async (web3, lottery) => {
        const players = await lottery.methods.getPlayers().call()
        let pot = await web3.eth.getBalance(lottery.options.address)
        pot = web3.utils.fromWei(pot, "ether")

        this.setState({ pot, players })
    }

    chooseWinner = async (event) => {
        event.preventDefault()

        const web3 = await this.AppLoadWeb3()
        const accounts = await web3.eth.getAccounts()
        const lottery = await loadContract()

        this.setState({ message: 'Choosing winner...' })

        try {
            lottery.methods.pickWinner().send({
                from: accounts[0], 
            })
            this.setState({ message: 'Winner is ' })
        } catch (e) {
            this.setState({ message: 'Exception! ' })
        }
    }

    render = () => {
        return (
            <div className="App">
                <Header pot={ this.state.pot } players={ this.state.players } />

                <LotteryForm
                    bet={this.state.bet}
                    onBetChange={this.onBetChange}
                    onFormSubmit={this.onFormSubmit}
                    status={ this.state.message }
                />

                <Footer
                    accounts={this.state.accounts}
                    owner={this.state.owner}
                    chooseWinner={this.chooseWinner}
                />
            </div>
        )
    }
}

function _(...args) {
    console.log(`🦊 `, ...args)
}

export default App
