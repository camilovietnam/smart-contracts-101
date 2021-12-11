pragma solidity ^0.4.17;

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

//// Estimated gas fee to deploy: 0.002026
