import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCheck, faSpinner} from '@fortawesome/free-solid-svg-icons'

class PlayerRow extends Component {
    constructor(props) {
        super(props)

        this.state = {
            player: props.player,
        }
    }

    render = () => {
        return (
            <div className="product">
                <div className="row justify-content-center align-items-center">
                    <div className="col-md-3">
                        <div className="product-image">
                            <img
                                className="img-fluid d-block mx-auto image"
                                src="assets/img/tech/image2.jpg"
                                alt="User"
                            />
                        </div>
                    </div>
                    <div className="col-md-5 product-info">
                        <a className="product-name" href={`https://rinkeby.etherscan.io/address/${ this.state.player }`}>
                            { this.state.player }
                        </a>
                    </div>
                    <div className="col-6 col-md-2 price">
                            <FontAwesomeIcon icon={faSpinner} className={"fa-spin"}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default PlayerRow;