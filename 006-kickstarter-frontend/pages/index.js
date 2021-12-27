import React, {Component} from 'react'
import factory from '../ethereum/factory'
import { Card, Button } from 'semantic-ui-react'
import Layout from '../components/Layout'

class Index extends Component{
    // We don't need this because we are using NextJS
    // async componentDidMount() {
    //
    // }

    static async getInitialProps() {
        const campaigns = await factory.methods.getCampaigns().call()
        return { campaigns }
    }

    renderCampaigns () {
        const items = this.props.campaigns.map(address => {
            return {
                header: address,
                description: <a>View Campaign</a>,
                meta: "Nothing",
                fluid: true,
            }
        })

        return <Card.Group items={ items } />
    }

    render() {
        return (
            <Layout>
                <link href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css" rel="stylesheet" />
                <h3>Open Campaigns</h3>
                <Button content={"Create campaign"}
                    icon={"add circle"}
                    primary
                    floated={"right"}
                />
                { this.renderCampaigns() }
            </Layout>
        )
    }
}

export default Index