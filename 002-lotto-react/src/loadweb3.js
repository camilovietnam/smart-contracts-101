import Web3 from 'web3'
import detectEthereumProvider from '@metamask/detect-provider'

function loadWeb3() {
  return new Promise(async (resolve, reject) => {
    const provider = await detectEthereumProvider()
    const web3 = new Web3(provider)

    resolve(web3)
  })
}

export default loadWeb3
