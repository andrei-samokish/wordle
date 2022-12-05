const hre = require("hardhat");

async function main() {
  const Wordle = await hre.ethers.getContractFactory("Wordle");
  const wordle = await Wordle.deploy();

  await wordle.deployed();

  console.log(`Wordle contract deployed to ${wordle.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
