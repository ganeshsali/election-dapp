// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

contract Election {

    struct Candidate {
        uint id;
        string name;
        uint votes;
    }

    uint public candidatesCount;
    address private manager;

    mapping(uint => Candidate) public candidates;
    mapping(address => bool) public voter;

    constructor(){
        manager = msg.sender;
        addCandidate("Donald Trump");
        addCandidate("Barack Obama");
    }

    function addCandidate(string memory name) public {
        require(msg.sender == manager,"You Are Not Manager");
        candidatesCount ++;
        candidates[candidatesCount] = Candidate(candidatesCount,name,0);
    }

    function vote(uint _id) public {
        require(!voter[msg.sender],"You already voted");
        require(candidates[_id].id !=0,"Candidate not found");
        voter[msg.sender] = true;
        candidates[_id].votes += 1;
    }
}
