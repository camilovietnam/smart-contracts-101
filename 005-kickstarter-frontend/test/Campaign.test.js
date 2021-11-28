const assert = require('assert')
const ganache = require('ganache-cli')
const Web3 = require('web3')
const web3 = new Web3(ganache.provider())

const compiledFactory = require('../ethereum/build/CampaignFactory.json')
const compiledCampaign = require('../ethereum/build/Campaign.json')

let accounts
let factory
let campaignAddress
let campaign

beforeEach(async() => {
    accounts = await web3.eth.getAccounts()
    factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({ data: compiledFactory.bytecode})
        .send({from: accounts[0], gas: 1000000})

    await factory.methods.createCampaign(1000000).send({
        from: accounts[0],
        gas: 1000000
    }) // min: 1 million wei

    const addresses = await factory.methods.getCampaigns().call()
    campaignAddress = addresses[0]

    campaign = await new web3.eth.Contract(
        JSON.parse(compiledCampaign.interface),
        campaignAddress
    )
})

describe('Campaigns', () => {
    it('deploys a factory and a campaign', () => {
        assert.ok(factory.options.address)
        assert.ok(campaign.options.address)
    })

    it('assigns caller as a manager', async () => {
        const owner = await campaign.methods.campaignOwner().call()
        assert.strictEqual(accounts[0], owner)
    })

    it('allows people to send money and become an approver', async () => {
        await campaign.methods.contribute().send({
            from: accounts[1],
            value: 2000000,
        })

        const isApprover = campaign.methods.approvers(accounts[1])
        assert.ok(isApprover)
    })

    it('requires a minimum contribution', async () => {
        try {
            await campaign.methods.contribute().send({
                from: accounts[1],
                value: 999999
            })
            assert(false)
        } catch (err) {
            assert(err)
        }
    })

    it('allows manager to create a payment request', async () => {
        await campaign.methods.createRequestForMoney('Buy food',
            '5000000',
            accounts[1]).send(
            {
                from: accounts[0],
                gas: '1000000'
            }
        )

        const request = await campaign.methods.requests(0).call()
        assert.strictEqual('Buy food', request.description)
    })
})