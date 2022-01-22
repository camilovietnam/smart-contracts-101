import React, { Component } from "react";
import { Form, Input, Message, Button } from "semantic-ui-react";
import LoadCampaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";
import { Router } from "../routes";

class ContributeForm extends Component {
    state = {
        value: '',
        loading: false,
        errorMessage: '',
    };

    onSubmit = async event => {
        event.preventDefault();
        this.setState({
            loading: true,
            errorMessage: '',
        });

        try {
            const campaign = await LoadCampaign(this.props.campaignAddress);
            const accounts = await web3.eth.getAccounts();

            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(this.state.value, 'ether')
            })

            Router.replaceRoute(`/campaigns/${this.props.campaignAddress}`)

        } catch (err) {
            this.setState({
                errorMessage: err.message,
            })
            console.log('State after error', this.state)
        }

        this.setState({
            loading: false,
            value: ''
        })
    }

    render = () => {
        return (
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                <Form.Field>
                    <label>Amount to contribute</label>
                    <Input
                        value={this.state.value}
                        onChange={(event) => this.setState({ value: event.target.value })}
                        label="Ether"
                        labelPosition="right"
                        placeholder='Ether'
                    />
                </Form.Field>

                <Message error header='Oops!' content={this.state.errorMessage}></Message>
                <Button primary loading={this.state.loading}>
                    Contribute!
                </Button>
            </Form>
        );
    }
}

export default ContributeForm;
