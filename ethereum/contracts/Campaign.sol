pragma solidity ^0.4.17;

contract CampaignFatory {
    address[] public deployedCampaigns;

    function createCampaign(uint minimum) public {
        address newCampaign = new Campaign(minimum,msg.sender);
        deployedCampaigns.push(newCampaign);
    }

    function getCampaigns() public view returns(address[]) {
        return deployedCampaigns;
    }
}
 
contract Campaign {
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint countApprovals;
        mapping(address=>bool) approvals;
    }

    address public manager;
    uint public minimumContribution;
    mapping(address=>bool) public approvers;
    Request[] public requests;
    uint public aprroversCount;

    constructor(uint minAmount,address creator) public {
        manager = creator;
        minimumContribution = minAmount;
    }

    function contribute() public payable {
        require(msg.value > minimumContribution);
        approvers[msg.sender]=true;
        aprroversCount++;
    }

    function createRequest(string description,uint value,address recipient) public restricted{
        Request memory newRequest = Request({
            description: description,
            value: value,
            recipient: recipient,
            complete: false,
            countApprovals: 0
        });

        requests.push(newRequest);
    }

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    function approveRequest(uint index) public {
        Request storage request = requests[index];

        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);

        request.approvals[msg.sender]=true;
        request.countApprovals++;

    }

    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];

        require(!request.complete);
        require(request.countApprovals > ( aprroversCount/ 2));

        request.recipient.transfer(request.value);
        request.complete = true;
    }

    function getSummary() public view returns(
        uint, uint, uint, uint, address
        ) {
        return (
            minimumContribution,
            this.balance,
            requests.length,
            aprroversCount,
            manager
        );
    }

    function getRequestsCount() public view returns (uint) {
        return requests.length; 
    }
}