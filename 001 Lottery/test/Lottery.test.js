const assert = require('assert')
const ganache = require('ganache-cli') // test network
const Web3 = require("web3")
const web3 = new Web3(ganache.provider())

const {interface, bytecode} = require('../compile')

let lottery
let accounts

beforeEach(async () => {
    accounts = await web3.eth.getAccounts()
    lottery = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({from: accounts[0], gas : '1000000'})
})

describe("Lottery Contract", () => {
    it('deploys a contract', () => {
        assert.ok(lottery.options.address)
    })

    it('allows one account to enter', async () => {
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('0.11', 'ether')
        })

        players = await lottery.methods.getPlayers().call({
            from: accounts[0]
        });

        assert.ok(players.indexOf(accounts[0]) > -1)
        assert.strictEqual(1, players.length)
    })

    it('allows multiple account to enter', async () => {
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('0.11', 'ether')
        })
        await lottery.methods.enter().send({
            from: accounts[1],
            value: web3.utils.toWei('0.11', 'ether')
        })
        await lottery.methods.enter().send({
            from: accounts[2],
            value: web3.utils.toWei('0.11', 'ether')
        })

        const players = await lottery.methods.getPlayers().call({
            from: accounts[0]
        })

        assert.ok(players.indexOf(accounts[0]) > -1)
        assert.ok(players.indexOf(accounts[1]) > -1)
        assert.ok(players.indexOf(accounts[2]) > -1)
        assert.strictEqual(3, players.length)
    })

    it('requires a minimum amount of ether to enter', async () => {
        try {
            await lottery.methods.enter().send({
                from: accounts[0],
                value: 200
            })
            assert(false)
        }  catch (err) {
            assert(err)
        }
    })

    it('requires manager to pick a winner', async () => {
        try {
            await lotteryy.methods.pickWinner.call({
                from: accounts[1]
            })
            assert(false)
        }  catch (err) {
            assert(err)
        }
    })

    it('sends money to winner and resets set', async () => {
        await lottery.methods.enter().send({
            from: accounts[1],
            value: web3.utils.toWei("1", "ether")
        })

        lowBalance = await web3.eth.getBalance(accounts[1])
        await lottery.methods.pickWinner().send({
            from: accounts[0]
        })
        highBalance = await web3.eth.getBalance(accounts[1])

        const players = await lottery.methods.getPlayers().call({
            from: accounts[0]
        })

        assert(players.length == 0)
        assert(highBalance > lowBalance)
    })
})
