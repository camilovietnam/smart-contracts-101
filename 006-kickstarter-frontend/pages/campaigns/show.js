import React, { Component } from 'react'
import { Card, Grid } from 'semantic-ui-react'
import Layout from '../../components/Layout'
import LoadCampaign from '../../ethereum/campaign'
import web3 from '../../ethereum/web3'
import ContributeForm from '../../components/ContributeForm'

class CampaignShow extends Component {
    state = {
        minimumContribution: 0,
        balance: 0,
        pendingRequests: 0,
        countContributors: 0,
        manager: null,
    }

    static async getInitialProps(props) {
        const campaign = await LoadCampaign(props.query.address)
        const summary = await campaign.methods.getSummary().call()

        return {
            minimumContribution: summary[0],
            balance: summary[1],
            countPendingRequests: summary[2],
            countContributors: summary[3],
            manager: summary[4],
            campaignAddress: props.query.address,
        }
    }

    render() {
        return (
            <Layout>
                <Grid>
                    <Grid.Column width={9}>
                        {this.renderCards()}
                    </Grid.Column>
                    <Grid.Column width={7}>
                        <ContributeForm campaignAddress={this.props.campaignAddress} />
                    </Grid.Column>
                </Grid>
            </Layout>
        )
    }

    renderCards() {
        const items = [
            {
                header: this.props.manager,
                description: 'Manager Address',
                meta: 'The address of the person who manages this campaign and creates requests',
                style: { overflowWrap: 'break-word' },
            },
            {
                header: this.props.minimumContribution,
                description: 'Minimum Contribution',
                meta: 'This is the minimum amount of Wei you need to send to become a contributor',
            },
            {
                header: web3.utils.fromWei(this.props.balance, 'ether') + ' Ξ',
                description: 'Campaign Balance (Eth)',
                meta: 'This is the balance of the current Campaign (as donated by contributors)',
            },
            {
                header: this.props.countPendingRequests,
                description: 'Pending Requests',
                meta: 'Count of pending money requests to withdraw money from the contract',
            },
            {
                header: this.props.countContributors,
                description: 'Total Contributors',
                meta: 'Count of campaign contributors',
            },
        ]

        return <Card.Group items={items} />
    }
}

export default CampaignShow