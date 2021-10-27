import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import loadContract from "../js/loadContract";

class PlayerRow extends Component {
    constructor(props) {
        super(props)

        this.state = {
            player: props.player,
            web3: props.web3,
            bet: null
        }

        this.getBet().then(bet => {
            this.setState({ bet })
        }).catch(e => {
            alert('Error getting player bet. Check console for more information.')
            console.log(`Error getting bet for player ${this.state.player}`, e)
        })
    }

    getBet = async () => {
        const lottery = await loadContract()

        return new Promise(async (resolve, reject) => {
            try {
                let bet = await lottery.methods.getPlayerBet(this.state.player).call()
                    bet = this.state.web3.utils.fromWei(bet, "ether")
                resolve(bet)
            }catch(e) {
                reject(e)
            }
        })
    }

    static getDerivedStateFromProps(props, state) {
        return {
            web3: props.web3,
        }
    }

    render = () => {
        return (
            <div className="product">
                <div className="row justify-content-center align-items-center">
                    <div className="col-md-3">
                        <div className="product-image">
                            <img className="img-fluid d-block mx-auto image"
                                 src="/img/ethereum.jpg"
                                 alt="User"
                                />
                        </div>
                    </div>
                    <div className="col-md-5 product-info">
                        Address:
                        <br />
                        <a className="product-name" href={`https://rinkeby.etherscan.io/address/${ this.state.player }`}>
                            { this.state.player }
                        </a>
                    </div>
                    <div className="col-6 col-md-2 price">
                        {
                            this.state.bet
                                ? <span>{this.state.bet}Ξ</span>
                                : <FontAwesomeIcon icon={faSpinner} className={"fa-spin"}/>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default PlayerRow;