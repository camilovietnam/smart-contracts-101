import React, { Component } from 'react'
import Layout from '../../../components/Layout'
import { Form, Button, Message, Input } from 'semantic-ui-react'
import LoadCampaign from '../../../ethereum/campaign'
import web3 from '../../../ethereum/web3'
import { Router, Link } from '../../../routes'

class RequestNew extends Component {
    state = {
        value: '',
        description: '',
        recipient: '',
        loading: false,
        error: '',
    }

    static async getInitialProps(props) {
        const { address } = props.query
        return { address }
    }

    onChangeDescription = event => {
        this.setState({
            description: event.target.value
        })
    }

    onChangeValue = event => {
        this.setState({
            value: event.target.value
        })
    }

    onChangeRecipient = event => {
        this.setState({
            recipient: event.target.value
        })
    }

    onSubmit = async event => {
        event.preventDefault()
        this.setState({ loading: true, error: '' })

        try {
            const campaign = LoadCampaign(this.props.address)
            const accounts = await web3.eth.getAccounts()
            const { description, value, recipient } = this.state

            await campaign.methods.createRequestForMoney(
                description,
                web3.utils.toWei(value, 'ether'),
                recipient
            ).send({ from: accounts[0] })

            Router.push(`/campaigns/${this.props.address}/requests`)
        } catch (err) {
            this.setState({ error: err.message })
        }

        this.setState({ loading: false })
    }

    render = () => (
        <Layout>
            <Link route={`/campaigns/${this.props.address}/requests`}>
                <a>
                    &laquo;Back
                </a>
            </Link>
            <h3>Create a new funding request:</h3>
            <Form onSubmit={this.onSubmit} error={!!this.state.error}>
                <Form.Field>
                    <label>Description</label>
                    <Input value={this.state.description} onChange={this.onChangeDescription} />
                </Form.Field>
                <Form.Field>
                    <label>Value (Eth)</label>
                    <Input value={this.state.value} onChange={this.onChangeValue} />
                </Form.Field>
                <Form.Field>
                    <label>Recipient</label>
                    <Input value={this.state.recipient} onChange={this.onChangeRecipient} />
                </Form.Field>

                <Message error content={this.state.error} />

                <Button primary loading={this.state.loading}>Create</Button>
            </Form>
        </Layout>
    )
}

export default RequestNew