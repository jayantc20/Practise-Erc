const PractiseErc = artifacts.require("PractiseErc");

module.exports = function(_deployer) {
    _deployer.deploy(PractiseErc);
};
