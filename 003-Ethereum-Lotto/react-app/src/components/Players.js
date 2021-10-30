import React, {Component} from 'react';
import PlayerRow from "./PlayerRow";

class Players extends Component {
    constructor (props) {
        super(props)

        this.state = {
            players: props.players,
            pot: props.pot,
            web3: props.web3,
        }
    }

    static getDerivedStateFromProps(props, state) {
        return {
            players: props.players,
            pot: props.pot,
            web3: props.web3,
        }
    }

    render() {
        return (
            <main className="page shopping-cart-page">
                <section className="clean-block clean-cart dark">
                    <div className="container">
                        <div className="block-heading">
                            <h2 className="text-info">Current players</h2>
                            <p>This is the list of people currently registered for our game and their bet</p>
                        </div>
                        <div className="content">
                            <div className="row g-0">
                                <div className="col-md-12 col-lg-9">
                                    <div className="items">
                                        <div className="product">
                                            <div className="row bg-dark text-white text-center justify-content-center align-items-center">
                                                <div className="col-md-3">
                                                    <h4>Avatar</h4>
                                                </div>
                                                <div className="col-md-5">
                                                    <h4>Address</h4>
                                                </div>
                                                <div className="col-md-4">
                                                    <h4>Accumulated Bet</h4>
                                                </div>
                                            </div>
                                        </div>

                                        { this.state.players.map((player, index )=> {
                                            return (
                                                <PlayerRow key={index} player={player} web3={this.state.web3}/>
                                            )
                                        }) }
                                    </div>
                                </div>
                                <div className="col-md-12 col-lg-3">
                                    <div className="summary">
                                        <h3>Summary</h3>
                                        <h4><span className="text">Players</span>
                                            <span className="price">
                                                { this.state.players.length }
                                            </span>
                                        </h4>
                                        <h4><span className="text">Amount</span>
                                            <span className="price">
                                                { this.state.pot }Ξ
                                            </span>
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        )
    }
}

export default Players;