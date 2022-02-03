import React, { Component } from 'react'
import { Table, Button } from 'semantic-ui-react'
import LoadCampaign from '../ethereum/campaign'
import web3 from '../ethereum/web3'
import { Router } from '../routes'

class RequestRow extends Component {
    state = {
        approvingError: '',
        finalizingError: '',
        approving: false,
        finalizing: false,
    }

    onApprove = async () => {
        const ok = confirm("Are you sure you want to approve?")
        if (!ok) {
            return
        }
        this.setState({ approving: true, approvingError: '' })

        try {
            const campaign = await LoadCampaign(this.props.address)
            const accounts = await web3.eth.getAccounts()

            await campaign.methods.approveRequest(this.props.index).send({
                from: accounts[0],
            })
        } catch (err) {
            this.setState({ approvingError: err.message })
        }

        this.setState({ approving: false })
        Router.push(`/campaigns/${this.props.address}/requests`)
    }

    onFinalize = async () => {
        const ok = confirm('Do you want to finalize?')
        if (!ok) {
            return
        }

        this.setState({ finalizing: true, finalizingError: '' })

        try {
            const campaign = await LoadCampaign(this.props.address)
            const accounts = await web3.eth.getAccounts()

            await campaign.methods.finalizeRequestForMoney(this.props.index).send({
                from: accounts[0]
            })
        } catch (err) {
            this.setState({ finalizingError: err.message })
        }

        this.setState({ finalizing: false })
        Router.push(`/campaigns/${this.props.address}/requests`)
    }

    render() {
        const req = this.props.request
        const { Row, Cell } = Table
        const readyToApprove = req.approvalCount > (this.props.totalApprovers / 2)

        return (
            <Row key={this.props.index}
                disabled={req.requestPaid}
                positive={!req.requestPaid && readyToApprove}>
                <Cell>{this.props.index}</Cell>
                <Cell>{req.description}</Cell>
                <Cell>{web3.utils.fromWei(req.moneyRequested, 'ether')} Ether</Cell>
                <Cell>{req.moneyDestination}</Cell>
                <Cell >{req.approvalCount}/{this.props.totalApprovers}</Cell>
                <Cell style={{ width: '50px' }}>
                    {!req.requestPaid &&
                        <Button positive basic
                            onClick={this.onApprove}
                            loading={this.state.approving}>
                            Approve
                        </Button>
                    }
                    {req.requestPaid &&
                        <Button>
                            Paid
                        </Button>
                    }
                </Cell>
                <Cell style={{ width: '50px' }}>
                    {!req.requestPaid &&
                        <Button negative basic
                            onClick={this.onFinalize}
                            loading={this.state.finalizing}>
                            Finalize
                        </Button>
                    }
                    {req.requestPaid &&
                        <Button>
                            Paid
                        </Button>
                    }
                </Cell>
            </Row >
        )
    }
}

export default RequestRow