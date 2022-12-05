//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Wordle {
    address public host;
    bytes1[5] word;
    mapping(string => bool) isInDictionary;

    constructor() {
        host = msg.sender;
    }

    modifier onlyHost() {
        require(msg.sender == host, "you are not allowed to do this");
        _;
    }

    modifier dictionaryCheck(string calldata _word) {
        require(isInDictionary[_word], "this word is not appropriate");
        _;
    }

    function manuallyUpdateWord(
        string calldata _word
    ) external onlyHost dictionaryCheck(_word) {
        word = _wordToB1Array(_word);
    }

    // function autoUpdateWord() external onlyHost {
    //     bytes1[5] memory newWord = _wordToB1Array(dictionary[totalGames]);
    //     word = newWord;
    //     totalGames++;
    // }

    function updateDictionary(string[] calldata words) external onlyHost {
        uint length = words.length;
        for (uint i = 0; i < length; i++) {
            string memory _word = words[i];
            if (bytes(_word).length == 5)
                isInDictionary[_word] = !isInDictionary[_word];
        }
    }

    function submitAttempt(
        string calldata userWord
    )
        external
        view
        dictionaryCheck(userWord)
        returns (bool[5] memory, bool[5] memory)
    {
        bool[5] memory isCorrectPlace; // green light
        bool[5] memory isInWord; // yellow light

        bytes1[5] memory arrayishUserWord = _wordToB1Array(userWord);

        for (uint8 i = 0; i < 5; ) {
            if (arrayishUserWord[i] == word[i]) isCorrectPlace[i] = true;
            else {
                for (uint8 j = 0; j < 5; ) {
                    if (arrayishUserWord[j] == word[i]) {
                        isInWord[j] = true;
                        break;
                    }
                    unchecked {
                        j += 1;
                    }
                }
            }
            unchecked {
                i += 1;
            }
        }

        return (isCorrectPlace, isInWord);
    }

    function _wordToB1Array(
        string calldata word_
    ) internal pure returns (bytes1[5] memory) {
        bytes1[5] memory _word;
        for (uint8 i = 0; i < 5; ) {
            _word[i] = bytes1(bytes(word_)[i:(i + 1)]);
            unchecked {
                i += 1;
            }
        }
        return _word;
    }
}
