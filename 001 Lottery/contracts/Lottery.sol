pragma solidity ^0.4.17;

contract Lottery {
    address[] public players;
    address private owner;

    function Lottery() public {
        owner = msg.sender;
    }

    function enter() public payable {
        require(msg.value > 0.1 ether);

        players.push(msg.sender);
    }

    function pickWinner() public restricted {
        uint winner = random() % players.length;
        players[winner].transfer(this.balance);
        players = new address[](0);
    }

    function random () private view returns (uint256) {
        return uint(keccak256(block.difficulty, now, players));
    }

    modifier restricted() {
        require(msg.sender == owner);
        _;
    }

    function getPlayers () public view returns (address []) {
        return players;
    }
}