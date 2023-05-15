// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract NameWall {
    struct SignedName {
        address signer;
        string name;
    }

    SignedName[] private signedNames;
    mapping(address => bool) public hasSigned;

    event NameSigned(address indexed signer, string name);

    function signName(string memory _name) public {
        require(!hasSigned[msg.sender], "You have already signed your name.");

        SignedName memory newName = SignedName(msg.sender, _name);
        signedNames.push(newName);
        hasSigned[msg.sender] = true;

        emit NameSigned(msg.sender, _name);
    }

    function getSignedNames() public view returns (SignedName[] memory) {
        return signedNames;
    }
}