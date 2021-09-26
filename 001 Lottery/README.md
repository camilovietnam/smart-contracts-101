# Compile and deploy contracts
The contract code is inside the file `/contracts/Lottery.sol`
Available operations: 

**Compile and deploy**: Run command `node deploy.js`. The output of the terminal will show the contract's ABI and the address (assuming it was successful). 

Example:

```
$> node deploy.js
About to deploy
[{"constant":false,"inputs":[],"name":"pickWinner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},
{"constant":true,"inputs":[],"name":"getOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view",
"type":"function"},{"constant":true,"inputs":[],"name":"getPlayers","outputs":[{"name":"","type":"address[]"}],"payable":false, 
"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"enter","outputs":[],"payable":true,
"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"players",
"outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],
"payable":false,"stateMutability":"nonpayable","type":"constructor"}]
Deployed to address:  0x631C5611d7bC0669C4494FBe069ff3886A0Eaa94
```

You will need this ABI and address for the code in folder "002 ...". 

**Run tests**: run the command `npm run test`. If by any chance you have deactivated npm scripts (by running `npm config set ignore-scripts true`) then make sure you enable them before running tests, otherwise it will just not work. 

Example: 

```
$>npm run test

> lottery@1.0.0 test /home/user/erase/smart-contracts-101/001 Lottery
> ./node_modules/mocha/bin/mocha test



  Lottery Contract
    ✔ deploys a contract
    ✔ allows one account to enter (97ms)
    ✔ allows multiple account to enter (199ms)
    ✔ requires a minimum amount of ether to enter
    ✔ requires manager to pick a winner
    ✔ sends money to winner and resets set (129ms)

```
