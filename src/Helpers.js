import wordle from "./ETHconnect/contract";

export async function submitHandler(setAttempt, setWord, setCurrentBox, word, order) {
  try {
    const newResult = await wordle.submitAttempt(word[order].join(""));
    setAttempt((prev) => prev + 1);
    setWord((prev) => [...prev, ["", "", "", "", ""]]);
    setCurrentBox(0);
    return newResult;
  } catch {
    return [];
  }
}

export function usedLetterSetter(isInWord, result, word, order) {
  let updateIsInWord = JSON.parse(JSON.stringify(isInWord));
  if (result.length)
    for (let i = 0; i < word[order].length; i++) {
      if (result[0][i]) updateIsInWord[word[order][i]] = [true, false];
      else if (result[1][i] && !updateIsInWord[word[order][i]][0])
        updateIsInWord[word[order][i]] = [false, true];
      else if (!updateIsInWord[word[order][i]].length)
        updateIsInWord[word[order][i]] = [false, false];
    }
  return updateIsInWord;
}
