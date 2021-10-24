import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import loadContract from "../js/loadContract";

class Index extends Component {
    state = {
        pot: 0,
        players: [],
        onFormSubmit: null,
    }

    constructor (props) {
        super(props)

        this.state = {
            pot: props.pot,
            players: props.players,
            onFormSubmit: props.onFormSubmit,
            onBetChange: props.onBetChange,
        }
    }

    static getDerivedStateFromProps(props, state) {
        return {
            pot: props.pot,
            players: props.players,
            onFormSubmit: props.onFormSubmit,
            onBetChange: props.onBetChange,
        }
    }

    render = () => {
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
                        <p>This is the first and best Ethereum lottery.</p>
                        <p>Our current prize is <strong>{ this.state.pot } Eth</strong></p>
                    </div>
                    <form onSubmit={ this.state.onFormSubmit }>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="bet">Amount played (in Ether)</label
                            ><input
                                name={"bet"}
                                id={"bet"}
                                className="form-control"
                                type="number"
                                placeholder={"Ξ"}
                                step={"any"}
                                onChange={ this.state.onBetChange }
                            />
                        </div>
                        <div className="mb-3">
                            <button className="btn btn-primary" type="submit">
                                Register
                            </button>
                        </div>
                        <p style={{ color: 'var(--bs-success)', fontWeight: 'bold' }} className={"msg-registering"}>
                            <FontAwesomeIcon icon={faCheck} style={{ marginRight: '10px' }} />
                            Registering, please wait...
                        </p>
                        <p style={{ color: 'var(--bs-success)', fontWeight: 'bold' }} className={"msg-registered"}>
                            <FontAwesomeIcon icon={faCheck} style={{ marginRight: '10px' }} />
                            You registered! good luck
                        </p>
                        <p style={{ color: 'var(--bs-red)', fontWeight: 'bold' }} className={"msg-registration-failed"}>
                            <FontAwesomeIcon icon={faTimes} style={{ marginRight: '10px' }}/>
                            Registration failed! Check console for more information.
                        </p>
                    </form>
                </div>
            </section>
        </main>
        )
    }
}

export default Index;