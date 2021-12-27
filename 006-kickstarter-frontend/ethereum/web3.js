import Web3 from 'web3'

let web3;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
    // browser, and user is running metamask
    web3 =  new Web3(window.web3.currentProvider)
} else {
    const provider = new Web3.providers.HttpProvider(
        'https://rinkeby.infura.io/v3/283b88436bcc4577af31a2f2ac1493e6',
    )

    web3 = new Web3(provider)
}

export default web3
