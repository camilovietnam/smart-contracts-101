import React, { Component } from 'react'
import { Table } from 'semantic-ui-react'
import web3 from '../ethereum/web3'

class RequestRow extends Component {
    render() {
        const req = this.props.request
        const { Row, Cell } = Table

        return (
            <Row key={this.props.index}>
                <Cell>{this.props.index}</Cell>
                <Cell>{req.description}</Cell>
                <Cell>{web3.utils.fromWei(req.moneyRequested, 'ether')}</Cell>
                <Cell>{req.moneyDestination}</Cell>
                <Cell>{req.approvalCount}</Cell>
                <Cell>Approve</Cell>
                <Cell>Finalize</Cell>
            </Row>
        )
    }
}

export default RequestRow