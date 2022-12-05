const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Lock", function () {
  async function deployFixture() {
    const [host, player] = await ethers.getSigners();

    const Wordle = await ethers.getContractFactory("Wordle");
    const wordle = await Wordle.deploy();

    return { wordle, host, player };
  }

  describe("Deployment", function () {
    it("owner assigned", async function () {
      const { wordle, host } = await loadFixture(deployFixture);
      expect(await ethers.provider.getStorageAt(wordle.address, 0)).to.eq(
        ethers.utils.hexZeroPad(host.address, 32).toLowerCase()
      );
    });

    it("word update & dictionary fill", async function () {
      const { wordle } = await loadFixture(deployFixture);
      await wordle.updateDictionary([
        "more than 5 digit",
        "also more",
        "pirate",
        "ocean",
      ]);

      expect(await wordle.isInDictionary("ocean")).to.eq(true);
      expect(await wordle.isInDictionary("pirate")).to.eq(false);

      await expect(wordle.manuallyUpdateWord("pirate")).to.be.revertedWith(
        "this word is not appropriate"
      );
      await wordle.manuallyUpdateWord("ocean");

      expect(await ethers.provider.getStorageAt(wordle.address, 3)).to.eq(
        ethers.utils.hexZeroPad(1, 32)
      );
    });

    it("word submit feedback works as expected", async function () {
      const { wordle, player } = await loadFixture(deployFixture);

      await wordle.updateDictionary([
        "ocean",
        "axiom",
        "apple",
        "block",
        "niece",
      ]);

      await wordle.manuallyUpdateWord("ocean");

      await expect(
        wordle.connect(player).submitAttempt("black")
      ).to.be.revertedWith("this word is not appropriate");

      const output = await wordle.connect(player).submitAttempt("niece");

      const expectedOutput = [
        [false, false, true, false, false],
        [true, false, false, true, false],
      ];

      expect(output.join()).to.eq(expectedOutput.join());
    });
  });
});
