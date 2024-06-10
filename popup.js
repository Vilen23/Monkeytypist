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
          if (results && results[0] && results[0].result) {
            words = results[0].result;
            console.log('Fetched words:', words); // Display the fetched words in the console
          }
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
      typing.push(" ");
    }
    document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2).click();
    let index = 0;
    setInterval(() => {
      if (index < typing.length) {
        let word = typing[index];
        for (let i = 0; i < word.length; i++) {
          let char = word[i];
          document.execCommand('insertText', false, char);
        }
      }
      index++;
    }, 100)
    console.log(typing.length)
    return typing;
  };
})

