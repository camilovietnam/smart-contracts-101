import React, { Component } from 'react';

class Footer extends Component {
    state = {}

    static getDerivedStateFromProps(props, state) {
        return {
            chooseWinner: props.chooseWinner
        }
    }

    render () {
        return (
            <footer className="page-footer dark">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-3">
                            <h5>Web Map</h5>
                            <ul>
                                <li><a href="/">Home</a></li>
                                <li><a href="/players">Players</a></li>
                                <li><a href="/winners">Winners</a></li>
                            </ul>
                        </div>
                        <div className="col-sm-3">
                            <h5>Social Links</h5>
                            <ul>
                                <li><a href="https://www.twitter.com">Twitter</a></li>
                                <li><a href="https://www.facebook.com">Facebook</a></li>
                                <li><a href="https://www.youtube.com">YouTube</a></li>
                            </ul>
                        </div>
                        <div className="col-sm-3">
                            <h5>Ethereum Links</h5>
                            <ul>
                                <li><a href="https://www.udemy.com">Udemy Course</a></li>
                                <li><a href="https://www.youtube.com">Youtube Course</a></li>
                                <li><a href="https://www.ethereum.org">Ethereum Documentation</a></li>
                            </ul>
                        </div>
                        <div className="col-sm-3">
                            <h5>Administration</h5>
                            <ul>
                                <li><a href="https://www.udemy.com" onClick={ this.state.chooseWinner }>Choose winner</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="footer-copyright">
                    <p>© 2021 Copyright Digitarum</p>
                </div>
            </footer>
        );
    }
}

export default Footer;