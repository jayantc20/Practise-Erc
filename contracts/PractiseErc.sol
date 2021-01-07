//SPDX-License-Identifier: UNLICENSED
pragma solidity >0.6.0;

 import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

//import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.3.0/contracts/token/ERC20/ERC20.sol";

contract PractiseErc is ERC20 {

    constructor() ERC20("ERC20PRACTISE", "ERPR") public {
        _mint(msg.sender, 1000000 * (10 ** uint256(decimals())));
    }
    
}