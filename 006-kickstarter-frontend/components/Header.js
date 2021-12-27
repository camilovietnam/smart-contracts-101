import React, {Component} from 'react'
import {Menu} from "semantic-ui-react";

class Header extends Component {
    render () {
        return (
            <Menu style={{ marginTop: '10px'}}>
                <Menu.Item
                    name={"Campaigns"}
                >Crowdcoin</Menu.Item>

                <Menu.Menu position={"right"}>
                    <Menu.Item
                    name={"Link"}
                    >Campaigns
                    </Menu.Item>

                    <Menu.Item>
                        +
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        )
    }
}

export default Header