const { task, types } = require("hardhat/config");
require("dotenv").config();

task("updateWord", "update word for the game of Wordle")
  .addParam("word", "type in 5-char word", "", types.string)
  .setAction(async ({ word }, { ethers }) => {
    const Wordle = await ethers.getContractFactory("Wordle");
    const wordle = Wordle.attach(process.env.REACT_APP_CONTRACT_ADDRESS);

    try {
      (await wordle.connect(await ethers.getSigner(0)).manuallyUpdateWord(word)).wait();
      console.log(`new word ${word} has been made`);
    } catch (error) {
      console.log(error);
    }
  });
