document.addEventListener("DOMContentLoaded", function () {
  const fetchButton = document.getElementById('btn');
  fetchButton.addEventListener('click', fetchHTML);


  function fetchHTML() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript(
        {
          target: { tabId: tabs[0].id },
          func: getHTML
        },
        (results) => {
          console.log("hello");
        }
      );
    });
  }


  function getHTML() {
    const wordDiv = document.getElementById('words');
    const wordDivs = wordDiv.getElementsByClassName('word');
    const typing = [];
    for (let i = 0; i < wordDivs.length; i++) {
      const wordDiv = wordDivs[i];
      const letterTag = wordDiv.getElementsByTagName('letter');
      let string = '';
      for (let i = 0; i < letterTag.length; i++) {
        string += letterTag[i].textContent.trim();
      }
      typing.push(string);
    }
    document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2).click();
    let indexofarray = 0, indexofword = 0;
    document.addEventListener("keydown", function (event) {
      let word = typing[indexofarray];
      let char = word[indexofword];
      if (indexofword === word.length - 1) {
        char = " ";
        document.execCommand('insertText', true, char);
        console.log(char);
        indexofarray++;
        indexofword = 0;
      } else {
        document.execCommand('insertText', true, char);
        indexofword++;
      }
      event.preventDefault();
    })
    return typing;
  };
})

