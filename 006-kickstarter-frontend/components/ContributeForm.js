import { Component } from 'react'
import { Form, Input, Message, Button } from 'semantic-ui-react'
import LoadCampaign from '../ethereum/campaign'

class ContributeForm extends Component { 
    state = {
        value: '',
        loading: false,
    }

    onSubmit(event) { 
        event.preventDefault()
        this.setState({
            loading: true
        })

        const campaign = LoadCampaign(this.props.campaignAddress)
    }

    render() {
        return (
            <Form onSubmit={ this.onSubmit }>
                <Form.Field>
                    <label>Amount to contribute</label>
                    <Input
                        value={this.state.value}
                        onChange={event => this.setState({ value: event.target.value })}
                        label='ether' labelPosition='right' />
                </Form.Field>
                
                <Button primary>
                    Contribute!
                </Button>
            </Form>
        )
    }
}

export default ContributeForm