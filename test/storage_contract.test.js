// const Storage = artifacts.require("Storage");

// /*
//  * uncomment accounts to access the test accounts made available by the
//  * Ethereum client
//  * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
//  */
// contract("Storage", (accounts) => {
//   let instance;
//   beforeEach("should setup the contract instance", async () => {
//     instance = await Storage.deployed();
//   });

//   it("should assert true", async () => {
//     return assert.isTrue(true);
//   });

//   it("should store number", async () => {
//     await instance.store(20);
//     const number = await instance.number();
//     return assert.equal(number,20);
//   });

//   it("should return number", async () => {
//     const number = await instance.number();
//     return assert.equal(number,20);
//   });

// });
