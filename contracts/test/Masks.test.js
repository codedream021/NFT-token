const { web3 } = require("@openzeppelin/test-environment");
require("@openzeppelin/test-helpers/configure")({
  provider: web3.currentProvider,
  singletons: {
    abstraction: "truffle",
  },
});

const {
    BN,
    time,
    expectEvent,
    expectRevert,
  } = require("@openzeppelin/test-helpers");
  const { assertion } = require("@openzeppelin/test-helpers/src/expectRevert");
  const { use, expect } = require("chai");
  use(require("chai-bn")(BN));

  const Masks = artifacts.require("Masks_For_Test");
  const NameChangeToken = artifacts.require("NameChangeToken");
  const Utils = require("./Utils.js");

  contract("Mask Test", function (accounts){
    describe("Mask contract test", function() {
        const governance = accounts[0];
        const user = accounts[1];
        let mask, namechangetoken;

        beforeEach(async function() {
            namechangetoken = await NameChangeToken.new("testNCT", "TNCT",{from: governance});
            mask = await Masks.new("testCollection", "TC", namechangetoken.address, {from: governance});
            await mask.start(true);
        });

    it("random number generation test", async function () {
        const duration = 86400 * 14;
        await time.increase(duration);
        await Utils.advanceNBlock(100);
        await mask.mintNFT(1, {from: user});
        await mask.finalizeStartingIndex({from: user});
        console.log(
            `Starting Index Block: ${await mask.showStartingIndexBlock()}`
          );
          console.log(
            `Finalized Starting Index: ${await mask.showStartingIndex()}`
          );
    });
    });
  });