import React, { Component } from 'react'
import { Button, Table } from 'semantic-ui-react'
import { Link } from '../../../routes'
import Layout from '../../../components/Layout'
import LoadCampaign from '../../../ethereum/campaign'
import RequestRow from '../../../components/RequestRow'
import web3 from '../../../ethereum/web3'

class RequestIndex extends Component {
    state = {
        requests: [],
    }

    static async getInitialProps(props) {
        const { address } = props.query
        const campaign = LoadCampaign(address)
        const accounts = web3.eth.getAccounts()

        const requestCount = await campaign.methods.getRequestsCount().call({
            from: accounts[0],
        })

        const requests = await Promise.all(
            Array(parseInt(requestCount)).fill().map((element, index) => {
                return campaign.methods.requests(index).call({
                    from: accounts[0],
                })
            })
        )
        const totalApprovers = await campaign.methods.approversCount().call()

        return { address, requests, requestCount, totalApprovers }
    }

    renderRows() {
        return this.props.requests.map((request, index) => {
            return (
                <RequestRow
                    request={request}
                    index={index}
                    key={index}
                    address={this.props.address}
                    totalApprovers={this.props.totalApprovers} />
            )
        })
    }

    render = () => {
        const { Header, Row, HeaderCell, Body } = Table

        return (
            <Layout>
                <h3>List of Requests for this campaign:</h3>
                <Link route={`/campaigns/${this.props.address}/requests/new`}>
                    <a>
                        <Button primary floated='right' style={{ marginBottom: '10px' }}>Add Request</Button>
                    </a>
                </Link>
                <Table celled>
                    <Header>
                        <Row>
                            <HeaderCell>ID</HeaderCell>
                            <HeaderCell>Description</HeaderCell>
                            <HeaderCell>Money Requested</HeaderCell>
                            <HeaderCell>Recipient</HeaderCell>
                            <HeaderCell>Approval Count</HeaderCell>
                            <HeaderCell>Approve</HeaderCell>
                            <HeaderCell>Finalize</HeaderCell>
                        </Row>
                    </Header>
                    <Body>
                        {this.renderRows()}
                    </Body>
                </Table>

                <p>We have a total of {this.props.requests.length} requests.</p>
            </Layout >
        )
    }
}

export default RequestIndex