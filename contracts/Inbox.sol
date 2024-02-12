// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Inbox {
    string public message;

    constructor(string memory initMessage) public {
        message = initMessage;
    }

    function setMessage(string memory newMessage) public {
        message = newMessage;
    }
    
    function doMath(int a, int b)public {
        a + b;
        b - a;
        a * b;
        a == 0;
    }
}

