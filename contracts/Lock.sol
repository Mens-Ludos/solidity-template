// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Import this file to use console.log
import "hardhat/console.sol";

/**
 * @author Illia Kubariev <kubarievilya@gmail,com>
 * @title Kind of safe place for coins.
 * @notice You can use this contract for storing money until some time.
 * @dev Create PRs for this contract.
 */
contract Lock {
    /**
     * @return time when withdraw will be able.
     */
    uint256 public unlockTime;

    /**
     * @return address of money's owner.
     */
    address payable public owner;

    /**
     * @param amount withrawed amount of coins.
     * @param when timestamp when withdrawal was made.
     */
    event Withdrawal(uint256 amount, uint256 when);

    /**
     * @param _unlockTime timestamp when owner will be able to withdraw.
     * @notice Sender of transaction will be owner of locked coins.
     */
    // solhint-disable-next-line func-visibility
    constructor(uint256 _unlockTime) payable {
        // solhint-disable-next-line reason-string
        require(
            // solhint-disable-next-line not-rely-on-time
            block.timestamp < _unlockTime,
            "Unlock time should be in the future"
        );

        unlockTime = _unlockTime;
        owner = payable(msg.sender);
    }

    /**
     * @notice Withdraw locked coins.
     */
    function withdraw() public {
        // Uncomment this line to print a log in your terminal
        // console.log("Unlock time is %o and block timestamp is %o", unlockTime, block.timestamp);

        // solhint-disable-next-line not-rely-on-time
        require(block.timestamp >= unlockTime, "You can't withdraw yet");
        require(msg.sender == owner, "You aren't the owner");

        // solhint-disable-next-line not-rely-on-time
        emit Withdrawal(address(this).balance, block.timestamp);

        owner.transfer(address(this).balance);
    }
}
