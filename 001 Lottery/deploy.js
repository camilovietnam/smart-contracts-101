const HDWalletProvider = require('truffle-hdwallet-provider')
const Web3 = require('web3')
const { interface, bytecode } = require('./compile')
require('dotenv').config()

const provider = new HDWalletProvider(
  process.env.WALLET_SECRET,
  'https://rinkeby.infura.io/v3/283b88436bcc4577af31a2f2ac1493e6',
)

async function deploy() {
  const web3 = new Web3(provider)
  const gasPrice = await web3.eth.getGasPrice()
  const accounts = await web3.eth.getAccounts()
  const inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
    })
    .send({
      from: accounts[0],
      gas: '1000000',
      gasPrice: gasPrice,
    })

  console.log(interface)
  console.log('Deployed to address: ', inbox.options.address)
}

deploy()
