pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract RandomAccounts {
    address[] public chosenParticipants;
    address[] public participants;
    address public manager;
    bool public isOpenForParticipation = true;

    constructor() {
        manager = msg.sender;
    }

    function join() public {
        require(isOpenForParticipation, 'The lottery is closed for participation');

        for (uint i = 0; i < participants.length; i++) {
            if (participants[i] == msg.sender) {
                revert('You are already a participant');
            }
        }

        participants.push(msg.sender);
    }

    function leave() public {
        require(isOpenForParticipation, 'The lottery is closed for participation');

        for (uint i = 0; i < participants.length; i++) {
            if (participants[i] == msg.sender) {
                delete participants[i];
                removeEmptyGapInArray(i);
            }
        }
    }

    function getParticipants() public view returns (address[] memory) {
        return participants;
    }

    function getChosenParticipants() public view returns (address[] memory) {
        return chosenParticipants;
    }

    function drawParticipant() public restrictedToManager {
        address chosenParticipant = participants[random() % participants.length];

        chosenParticipants.push(chosenParticipant);
        isOpenForParticipation = false;
    }

    function reset() public restrictedToManager {
        isOpenForParticipation = true;
        participants = new address[](0);
        chosenParticipants = new address[](0);
    }

    function removeEmptyGapInArray(uint index) private {
        for (uint i = index; i < participants.length - 1; i++) {
            participants[i] = participants[i + 1];
        }

        participants.pop();
    }

    function random() private view returns (uint) {
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, participants)));
    }

    modifier restrictedToManager() {
        require(msg.sender == manager, 'You aren\'t contract manager');
        _;
    }
}
