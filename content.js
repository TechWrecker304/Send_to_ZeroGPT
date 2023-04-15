// Retrieve the selected text from storage
chrome.storage.local.get("selectedText", ({ selectedText }) => {
  if (selectedText) {
    // Find the textarea within the page
    const textArea = document.querySelector("textarea[name='textArea']");

    // If the textarea exists, set its value to the selected text and simulate an input event
    if (textArea) {
      textArea.value = selectedText;

      // Create and dispatch an input event
      const inputEvent = new Event("input", { bubbles: true });
      textArea.dispatchEvent(inputEvent);

      // Find the button with the class 'scoreButton'
      const detectTextButton = document.querySelector("button.scoreButton");

      // If the button exists, simulate a click event
      if (detectTextButton) {
        detectTextButton.click();
      }
    }

    // Clear the selected text from storage
    chrome.storage.local.remove("selectedText");
  }
});
