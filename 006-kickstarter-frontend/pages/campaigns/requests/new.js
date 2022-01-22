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
        recipient: ''
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

    render = () => (
        <Layout>
            <h3>Create a new funding request:</h3>
            <Form>
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

                <Button primary>Create</Button>
            </Form>
        </Layout>
    )
}

export default RequestNew