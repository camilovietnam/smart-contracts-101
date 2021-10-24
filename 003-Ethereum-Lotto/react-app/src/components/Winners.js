import React, { Component } from 'react'

class Winners extends Component {
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
                                <div className="col-md-12 col-lg-8">
                                    <div className="items">
                                        <div className="product">
                                            <div className="row justify-content-center align-items-center">
                                                <div className="col-md-3">
                                                    <div className="product-image">
                                                        <img className="img-fluid d-block mx-auto image"
                                                        src="assets/img/tech/image2.jpg"
                                                        alt={"Product"}/>
                                                    </div>
                                                </div>
                                                <div className="col-md-5 product-info">
                                                    <a className="product-name" href="/">
                                                        Lorem Ipsum dolor
                                                    </a>
                                                </div>
                                                <div className="col-6 col-md-2 price">
                                                    <span>$120</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="product">
                                            <div className="row justify-content-center align-items-center">
                                                <div className="col-md-3">
                                                    <div className="product-image">
                                                        <img className="img-fluid d-block mx-auto image"
                                                        src="assets/img/tech/image2.jpg"
                                                        alt={"Product"}/>
                                                    </div>
                                                </div>
                                                <div className="col-md-5 product-info">
                                                    <a className="product-name" href="/">Lorem Ipsum dolor</a>
                                                </div>
                                                <div className="col-6 col-md-2 price">
                                                    <span>$120</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="product">
                                            <div className="row justify-content-center align-items-center">
                                                <div className="col-md-3">
                                                    <div className="product-image">
                                                        <img className="img-fluid d-block mx-auto image"
                                                        src="assets/img/tech/image2.jpg"
                                                        alt={"Product"}/>
                                                    </div>
                                                </div>
                                                <div className="col-md-5 product-info">
                                                    <a className="product-name" href="/">
                                                        Lorem Ipsum dolor
                                                    </a>
                                                </div>
                                                <div className="col-6 col-md-2 price">
                                                    <span>$120</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12 col-lg-4">
                                    <div className="summary">
                                        <h3>Summary</h3>
                                        <h4><span className="text">Winners</span><span className="price">14</span></h4>
                                        <h4><span className="text">Amount</span><span className="price">$1500</span>
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