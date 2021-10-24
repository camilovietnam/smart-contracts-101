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

class App extends Component {

    state = {
        pot: 0,
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

        this.setState({
            pot
        })

        // const owner = await lottery.methods.getOwner().call()
        // const players = await lottery.methods.getPlayers().call()
        // const accounts = await window.ethereum.request({ method: 'eth_accounts' })
        // const message = 'Waiting for submission'
        //
        // this.setState({ owner, players, accounts, pot, message })
        //
        // _(`Using web3 version ${web3.version}`)
        // _('Accounts available', accounts)
    }

    render () {
        return (
            <div className="App">
                <Nav />
                <Router>
                    <Switch>
                        <Route path="/players">
                            <Players />
                        </Route>
                        <Route path="/winners">
                            <Winners />
                        </Route>
                        <Route path="/">
                            <Index pot={ this.state.pot } />
                        </Route>
                    </Switch>
                </Router>

                <Footer />
            </div>
        );
    }
}

export default App;
