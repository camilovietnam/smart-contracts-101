import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { Link } from '../../../routes'
import Layout from '../../../components/Layout'

class RequestIndex extends Component {
    static async getInitialProps(props) {
        const { address } = props.query

        return { address }
    }

    render = () => (
        <Layout>
            <h3>List of Requests for this campaign:</h3>
            <Link route={`/campaigns/${this.props.address}/requests/new`}>
                <a>
                    <Button primary>Add Request</Button>
                </a>
            </Link>
        </Layout>
    )
}

export default RequestIndex