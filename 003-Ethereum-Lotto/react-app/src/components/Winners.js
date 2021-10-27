import React, { Component } from 'react'

class Winners extends Component {
    state = {
        winners: [],
        prizes: [],
        web3: null,
    }

    static getDerivedStateFromProps(props) {
        return {
            winners: props.winners,
            prizes: props.prizes,
            web3: props.web3,
        }
    }

    render() {
        return (
            <main className="page shopping-cart-page">
                <section className="clean-block clean-cart dark">
                    <div className="container">
                        <div className="block-heading">
                            <h2 className="text-info">Previous winners</h2>
                            <p>This is the list of the people who won the lottery in the past</p>
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
                                                    <h4>Prize</h4>
                                                </div>
                                            </div>
                                        </div>


                                        { this.state.winners.map((winner, index) => {
                                            return (
                                                <div className="product">
                                                    <div className="row justify-content-center align-items-center">
                                                        <div className="col-md-3">
                                                            <div className="product-image">
                                                                <img className="img-fluid d-block mx-auto image"
                                                                     src="img/ethereum.jpg"
                                                                     alt={"Product"}/>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-5 product-info">
                                                            <a className="product-name" href={`https://rinkeby.etherscan.io/address/${winner}`}>
                                                                { winner }
                                                            </a>
                                                        </div>
                                                        <div className="col-6 col-md-2 price">
                                                            <span>
                                                                { this.state.web3.utils.fromWei(this.state.prizes[index], "ether" )}
                                                                Ξ
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>)
                                        })
                                        }
                                    </div>
                                </div>
                                <div className="col-md-12 col-lg-3">
                                    <div className="summary">
                                        <h3>Summary</h3>
                                        <h4><span className="text">Winners</span><span className="price">
                                            { this.state.winners.length }
                                        </span></h4>
                                        <h4><span className="text">Amount</span><span className="price">
                                            { this.state.web3 ?  (web3 => {
                                                const sum = this.state.prizes.reduce((prev, current) => {
                                                    return prev + current
                                                }, 0)
                                                return web3.utils.fromWei(sum.toString(), "ether")
                                            })(this.state.web3) : '' }Ξ
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

export default Winners;