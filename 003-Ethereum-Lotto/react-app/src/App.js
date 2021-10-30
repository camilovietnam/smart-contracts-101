import './App.css';
import Nav from './components/Nav'
import Index from './components/Index'
import Players from './components/Players'
import Footer from "./components/Footer";
import Winners from './components/Winners'

import React, {Component} from "react";

import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import loadContract from "./js/loadContract";
import loadWeb3 from "./js/loadweb3";
import $ from 'jquery';

window.$ = $

class App extends Component {
    state = {
        pot: 0,
        players: [],
        winners: [],
        prizes: [],
        web3: null,
        accounts: [],
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
        const web3 = await this.AppLoadWeb3()
        let pot = await web3.eth.getBalance(lottery.options.address)
        pot = web3.utils.fromWei(pot, "ether")
        const players = await lottery.methods.getPlayers().call()
        const winners = await lottery.methods.getWinners().call()
        const prizes = await lottery.methods.getPrizes().call()
        const accounts = await window.ethereum.request({ method: 'eth_accounts' })
        const owner = await lottery.methods.getOwner().call()

        this.setState({
            pot,
            players,
            web3,
            winners,
            prizes,
            accounts,
            owner,
        })

        console.log(`Using web3 version ${web3.version}`)

    }

    componentDidMount() {
        this.hideAllMessages()
    }

    hideAllMessages () {
        $('.msg-registering').hide();
        $('.msg-registered').hide();
        $('.msg-registration-failed').hide();
    }

    onBetChange = (event) => {
        this.setState({
            bet: event.target.value,
        })
    }

    onFormSubmit = async (event) => {
        event.preventDefault()
        this.hideAllMessages()

        const web3 = await this.AppLoadWeb3()
        const accounts = await web3.eth.getAccounts()
        const lottery = await loadContract()

        try {
            $('.msg-registering').show();
            await lottery.methods.enter().send({
                from: accounts[0],
                value: web3.utils.toWei(this.state.bet, "ether"),
            })

            $('.msg-registering').hide();
            $('.msg-registered').show();

            await this.reloadLotteryData(web3, lottery)
        } catch (e) {
            $('.msg-registering').hide();
            $('.msg-registration-failed').show();

            console.log(e)
        }
    }

    reloadLotteryData = async () => {
        const web3 = await this.AppLoadWeb3()
        const lottery = await loadContract()
        const players = await lottery.methods.getPlayers().call()
        const winners = await lottery.methods.getWinners().call()

        let pot = await web3.eth.getBalance(lottery.options.address)
        pot = web3.utils.fromWei(pot, "ether")

        this.setState({
            pot,
            players,
            winners,
        })
    }

    chooseWinner = async (event) => {
        event.preventDefault()

        const web3 = await this.AppLoadWeb3()
        const accounts = await web3.eth.getAccounts()
        const lottery = await loadContract()

        try {
            alert('A winner will be chosen. The code will not wait, so check the balance after the tx is finished')
            lottery.methods.pickWinner().send({
                from: accounts[0],
            })
        } catch (e) {
            alert('Exception choosing the winner')
            console.log(e)
        }
    }

    render = () => {
        return (
            <div className="App">
                <Nav />
                <Router>
                    <Switch>
                        <Route path="/players">
                            <Players
                                players={ this.state.players }
                                pot={ this.state.pot }
                                web3={ this.state.web3 } />
                        </Route>

                        <Route path="/winners">
                            <Winners winners={ this.state.winners } prizes={ this.state.prizes } web3={ this.state.web3 }/>
                        </Route>

                        <Route path="/">
                            <Index pot={ this.state.pot }
                                   onFormSubmit={ this.onFormSubmit }
                                   players={ this.state.players }
                                   onBetChange={ this.onBetChange }
                            />
                        </Route>
                    </Switch>
                </Router>

                <Footer chooseWinner={ this.chooseWinner }
                    accounts = { this.state.accounts }
                    owner = { this.state.owner }
                />
            </div>
        );
    }
}

export default App;
