const hre = require("hardhat");
const fs = require("fs/promises");

async function readWords() {
  let words = [];

  try {
    const data = (await fs.readFile("/Users/andrejsamokis/wordle/words.txt")).toString();

    let word = "";

    for (let i = 0; i < data.length; i++) {
      if (word.length === 5) {
        words.push(word);
        word = "";
        continue;
      }
      word += data[i];
    }
  } catch (err) {
    console.log(err);
  }

  return words;
}

async function main() {
  const Wordle = await hre.ethers.getContractFactory("Wordle");
  const wordle = Wordle.attach(process.env.CONTRACT_ADDRESS);

  const words = await readWords();

  await wordle.updateDictionary(words);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
