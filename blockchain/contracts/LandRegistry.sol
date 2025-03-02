// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract LandRegistry {
    struct Property {
        uint256 id;
        string location;
        uint256 area;
        address owner;
        bool forSale;
        uint256 price;
    }

    mapping(uint256 => Property) public properties;
    mapping(address => uint256[]) public userProperties;
    uint256 public propertyCount;

    event PropertyRegistered(uint256 id, string location, address owner);
    event PropertyTransferred(uint256 id, address from, address to);
    event PropertyListedForSale(uint256 id, uint256 price);

    function registerProperty(string memory _location, uint256 _area) public {
        propertyCount++;
        properties[propertyCount] = Property(propertyCount, _location, _area, msg.sender, false, 0);
        userProperties[msg.sender].push(propertyCount);
        emit PropertyRegistered(propertyCount, _location, msg.sender);
    }

    function transferProperty(uint256 _id, address _newOwner) public {
        require(properties[_id].owner == msg.sender, "Not the owner");
        properties[_id].owner = _newOwner;
        emit PropertyTransferred(_id, msg.sender, _newOwner);
    }

    function listForSale(uint256 _id, uint256 _price) public {
        require(properties[_id].owner == msg.sender, "Not the owner");
        properties[_id].forSale = true;
        properties[_id].price = _price;
        emit PropertyListedForSale(_id, _price);
    }

    function buyProperty(uint256 _id) public payable {
        require(properties[_id].forSale, "Not for sale");
        require(msg.value >= properties[_id].price, "Insufficient payment");

        address seller = properties[_id].owner;
        payable(seller).transfer(msg.value);
        properties[_id].owner = msg.sender;
        properties[_id].forSale = false;
        properties[_id].price = 0;
        emit PropertyTransferred(_id, seller, msg.sender);
    }
}
