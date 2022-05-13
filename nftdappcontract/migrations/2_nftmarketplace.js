const nftmarketplace = artifacts.require("nftmarketplace");

module.exports = function (deployer) {
  deployer.deploy(nftmarketplace);
};
