import React, { Component } from 'react'
import Layout from '../../components/Layout'
import { Form, Button, Input, Message } from "semantic-ui-react";
import factory from "../../ethereum/factory"
import web3 from '../../ethereum/web3'
import { Router } from '../../routes'

class CampaignNew extends Component {
    state = {
        minContribution: '',
        errorMessage: '',
        loading: false,
        hasError: false,
    }

    onSubmit = async event => {
        event.preventDefault()
        this.setState({ loading: true, hasError: false })

        try {
            const accounts = await web3.eth.getAccounts()
            await factory.methods.createCampaign(this.state.minContribution).send({
                from: accounts[0]
            })

            Router.pushRoute('/')
        } catch (err) {
            this.setState({ hasError: true })
            this.setState({
                errorMessage: err.message
            })
        }

        this.setState({ loading: false })
    }

    render () {
        return (
            <Layout>
                <h3>Create a Campaign</h3>
                <Form onSubmit={this.onSubmit} error={this.state.errorMessage !== ''}>
                    <Form.Field>
                        <label>Minimum contribution</label>
                        <Input label={"Wei"}
                            placeholder={"1000"}
                            labelPosition={"right"}
                            value={this.state.minContribution}
                            onChange={event => this.setState({
                                minContribution: event.target.value
                            })}/>
                    </Form.Field>

                    <Button loading={ this.state.loading } primary>Create a new Campaign</Button>

                    {this.state.hasError &&
                        <Message error header={"Error Creating Campaign"} content={this.state.errorMessage} />
                    }

                </Form>
            </Layout>
        )
    }
}

export default CampaignNew