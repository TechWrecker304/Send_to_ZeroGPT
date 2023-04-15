chrome.runtime.onInstalled.addListener(() => {
  // Create the context menu item
  chrome.contextMenus.create({
    id: "openZeroGPT",
    title: "Send To ZeroGPT",
    contexts: ["selection"],
  });
});

// Listen for the context menu item click
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "openZeroGPT") {
    // Save the selected text to local storage
    chrome.storage.local.set({ selectedText: info.selectionText }, () => {
      // Open a new tab with the ZeroGPT website
      chrome.tabs.create({ url: "https://www.zerogpt.com/" }, (newTab) => {
        // Wait for the new tab to finish loading
        chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
          if (tabId === newTab.id && changeInfo.status === "complete") {
            // Inject content.js into the new tab
            chrome.tabs.executeScript(newTab.id, { file: "content.js" });
            // Remove the listener to avoid memory leaks
            chrome.tabs.onUpdated.removeListener(listener);
          }
        });
      });
    });
  }
});
