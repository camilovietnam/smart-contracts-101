import React, { Component } from 'react'
import Layout from '../../components/Layout'
import { Form, Button, Input, Message } from "semantic-ui-react";
import factory from "../../ethereum/factory"
import web3 from '../../ethereum/web3'

class CampaignNew extends Component {
    state = {
        minContribution: '',
        errorMessage: ''
    }

    onSubmit = async event => {
        event.preventDefault()
        try {
            const accounts = await web3.eth.getAccounts()
            await factory.methods.createCampaign(this.state.minContribution).send({
                from: accounts[0]
            })
        } catch (err) {
            this.setState({
                errorMessage: err.message
            })
            console.log(this.state)
        }
    }

    render () {
        console.log("Render again", Date.now())
        console.log("The error message is ", this.state.errorMessage)
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

                    <Button primary>Create a new Campaign</Button>

                    <Message error header={"Error Creating Campaign"} content={this.state.errorMessage} />
                </Form>
            </Layout>
        )
    }
}

export default CampaignNew