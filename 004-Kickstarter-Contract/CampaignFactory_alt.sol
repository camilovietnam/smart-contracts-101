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
    address [] public campaigns;

    function createCampaign(
        uint minimumContribution
    ) public {
        campaigns.push(new Campaign(minimumContribution, msg.sender));
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

    uint public minimumContribution;
    address public campaignOwner;
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
    ) public {
        require(msg.sender == campaignOwner);
        requests.push(RequestForMoney({
            description: description,
            moneyRequested: moneyRequested,
            moneyDestination: moneyDestination,
            requestPaid: false,
            approvalCount: 0
        }));
    }

    function approveRequest(uint index) public {
        require(approvers[msg.sender] && !requests[index].approvals[msg.sender]);

        requests[index].approvals[msg.sender] = true;
        requests[index].approvalCount++;
    }

    function finalizeRequestForMoney(uint index) public {
        require(msg.sender == campaignOwner && requests[index].approvalCount > approversCount && !requests[index].requestPaid);

        requests[index].moneyDestination.transfer(requests[index].moneyRequested);
    }
}

// Estimated gas fee to deploy: 0.001968ETH
