const { task, types } = require("hardhat/config");
require("dotenv").config();

task("play", "submit a word and play Wordle")
  .addParam("word", "word that you decided to check", "", types.string)
  .setAction(async ({ word }, { ethers }) => {
    const Wordle = await ethers.getContractFactory("Wordle");
    const wordle = Wordle.attach(process.env.REACT_APP_CONTRACT_ADDRESS);

    let result;
    try {
      result = await wordle.submitAttempt(word);
    } catch (error) {
      console.log(error);
    }

    console.log(`correct places for "${word}": ` + result[0]);
    console.log(`letters of "${word}" in the word: ` + result[1]);
  });
