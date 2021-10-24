import React, { Component } from 'react';

class Index extends Component {
    state = {
        pot: 0,
        players: []
    }

    constructor (props) {
        super(props)

        this.state = {
            pot: props.pot
        }
    }

    static getDerivedStateFromProps(props, state) {
        return {
            pot: props.pot,
        }
    }

    render() {
        return (
            <main className="page contact-us-page">
                <section className="clean-block clean-form dark">
                    <div className="container">
                    <div className="block-heading">
                        <h2
                        className="
                            display-1
                            text-light
                            bg-info bg-gradient
                            border
                            rounded-pill
                        "
                        style={{ padding: '15px' }}
                        >
                        Win a lot of money!!!
                        </h2>
                        <p>This is the first and best Ethereum lottery.&nbsp;</p>
                        <p>Our current prize is <strong>{ this.state.pot } Eth</strong></p>
                    </div>
                    <form>
                        <div className="mb-3">
                        <label className="form-label" for="subject">Amount played</label
                        ><input
                            className="form-control"
                            type="text"
                            id="subject"
                            name="subject"
                        />
                        </div>
                        <div className="mb-3"></div>
                        <div className="mb-3">
                        <label className="form-label" for="message">Message</label
                        ><textarea
                            className="form-control"
                            id="message"
                            name="message"
                        ></textarea>
                        </div>
                        <div className="mb-3">
                        <button className="btn btn-primary" type="submit">
                            Register&nbsp;
                        </button>
                        </div>
                        <p style={{ color: 'var(--bs-success)', fontWeight: 'bold' }}>
                        <i className="fa fa-check" style={{ paddingRight: '10px' }}></i>You
                        registered! good luck
                        </p>
                        <p style={{ color: 'var(--bs-red)', fontWeight: 'bold' }}>
                        <i className="fa fa-remove" style={{ paddingRight: '10px' }}></i
                        >Registration failed!&nbsp;
                        </p>
                    </form>
                </div>
            </section>
        </main>
        )
    }
}

export default Index;