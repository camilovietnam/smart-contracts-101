import React, { Component } from 'react'

import {
    BrowserRouter as Router,
} from "react-router-dom";

class Nav extends Component {
    render() {
        return (
            <nav className="
                navbar navbar-light navbar-expand-lg
                fixed-top
                bg-white
                clean-navbar">
                <div className="container">
                    <a className="navbar-brand logo" href="/">Ethereum Lotto</a>
                    <button
                    data-bs-toggle="collapse"
                    className="navbar-toggler"
                    data-bs-target="#navcol-1"
                    >
                        <span className="visually-hidden">Toggle navigation</span>
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navcol-1">
                        <Router>
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item">
                                    {/*<Link className="nav-link active" to="/">Play</Link>*/}
                                    <a href="/" className={"nav-link"}>Play</a>
                                </li>
                                <li className="nav-item">
                                    {/*<Link className="nav-link" to="/players">Players</Link>*/}
                                    <a href="/players" className={"nav-link"}>Players</a>
                                </li>
                                <li className="nav-item">
                                    {/*<Link className="nav-link" to="/winners">Winners</Link>*/}
                                    <a href="/winners" className={"nav-link"}>Winners</a>
                                </li>
                            </ul>
                        </Router>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Nav;