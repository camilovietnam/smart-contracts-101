pragma solidity ^0.4.17;

// SPDX-License-Identifier: Unlicense

/**
    This is a practice contract.

    The original contract was part of the following solidity course:
    https://www.udemy.com/course/ethereum-and-solidity-the-complete-developers-guide

    I have tried to adapt the code, not just copy it, in order to make it a little
    bit different to the original (and avoid possible copyright conflict with the
    original material). You should watch that course if you're beginning your path
    of learning Solidity.
*/

/**
    The CampaignFactory is tasked with creating instances of the Campaign contract,
    and keep an array of all instances created.
*/
contract CampaignFactory {
    address [] private campaigns;

    function createCampaign(
        uint minimumContribution
    ) public {
        address newCampaign = new Campaign(minimumContribution, msg.sender);
        campaigns.push(newCampaign);
    }

    function getCampaigns() public view returns (address []) {
        return campaigns;
    }
}

/**
    The Campaign contract creates a donation campaign that people can send money to.

    Additionally, the creator of the campaign can create requests to fund an external
    Ethereum address (for example, the address of a service provider). Every person who
    contributes to the campaign is allowed to vote to approve the requests for funds
    (we call these people approvers).

    To have the funds transfered, the creator of the campaign must have the approval
    from over 50% of all the approvers.
*/
contract Campaign {

    struct RequestForMoney {
        string description;
        uint moneyRequested;
        address moneyDestination;
        bool requestPaid;
        uint approvalCount;
        mapping (address => bool) approvals;
    }

    RequestForMoney[] public requests;
    address public campaignOwner;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    uint approversCount;

    function Campaign(uint min, address creator) public {
        minimumContribution = min;
        campaignOwner = creator;
    }

    function contribute() public payable {
        require(msg.value > minimumContribution);
        approvers[msg.sender] = true;
    }

    function createRequestForMoney (
        string description,
        uint moneyRequested,
        address moneyDestination
    ) public restrictedToOwner {
        RequestForMoney memory newRequest = RequestForMoney({
            description: description,
            moneyRequested: moneyRequested,
            moneyDestination: moneyDestination,
            requestPaid: false,
            approvalCount: 0
        });

        requests.push(newRequest);
    }

    function approveRequest(uint index) public {
        RequestForMoney storage request = requests[index];

        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function finalizeRequestForMoney(uint index) public restrictedToOwner {
        RequestForMoney storage request = requests[index];

        require(request.approvalCount > approversCount);
        require(!request.requestPaid);

        request.moneyDestination.transfer(request.moneyRequested);
        request.requestPaid = true;
    }

    modifier restrictedToOwner() {
        require(msg.sender == campaignOwner);
        _;
    }
}

// Estimated gas fee to deploy: 0.002026
