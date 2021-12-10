const HDWalletProvider = require('truffle-hdwallet-provider')
const Web3 = require('web3')
const compiledFactory = require("./build/CampaignFactory.json")
require('dotenv').config()

const provider = new HDWalletProvider(
    process.env.WALLET_SECRET,
    'https://rinkeby.infura.io/v3/283b88436bcc4577af31a2f2ac1493e6',
)

async function deploy() {
    const web3 = new Web3(provider)
    const gasPrice = await web3.eth.getGasPrice()
    const accounts = await web3.eth.getAccounts()

    const inbox = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({
            data: compiledFactory.bytecode,
        })
        .send({
            from: accounts[0],
            gas: '1000000',
            gasPrice,
        })

    console.log('Deployed to address: ', inbox.options.address)
}

deploy().then(() => {
    console.log('Finished!')
})

