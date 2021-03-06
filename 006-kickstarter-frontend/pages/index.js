import React, {Component} from 'react'
import factory from '../ethereum/factory'
import { Card, Button } from 'semantic-ui-react'
import Layout from '../components/Layout'
import { Link } from '../routes'

class Index extends Component{
    static async getInitialProps() {
        const campaigns = await factory.methods.getCampaigns().call()
        return { campaigns }
    }

    renderCampaigns () {
        const items = this.props.campaigns.map(address => {
            return {
                header: address,
                description: 
                    <Link route={`campaigns/${address}`}>
                        <a>View Campaign</a>
                    </Link>,
                meta: "Nothing",
                fluid: true,
            }
        })

        return <Card.Group items={ items } />
    }

    render() {
        return (
            <Layout>
                <h3>Open Campaigns</h3>
                <Link route="/campaigns/new">
                    <a>
                        <Button as={'a'} content={"Create campaign"}
                        icon={"add circle"}
                        primary
                        floated={"right"}
                        href={"/campaigns/new"} />
                    </a> 
                </Link>
                { this.renderCampaigns() }
            </Layout>
        )
    }
}

export default Index