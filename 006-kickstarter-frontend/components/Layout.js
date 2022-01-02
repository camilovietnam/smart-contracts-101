import React, {Component} from 'react'
import Header from './Header'
import Head from 'next/head'
import {Container} from "semantic-ui-react";

class Layout extends Component {
    render() {
        return (
            <Container>
                <Head>
                    <link href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css" rel="stylesheet" />
                </Head>
                <Header />
                {this.props.children}
            </Container>
        )
    }
}

export default Layout