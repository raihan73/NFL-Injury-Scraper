// background.js (can be empty for now if you don't need background tasks)
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.playerData) {
      chrome.storage.local.set({ playerData: request.playerData }, function() {
        console.log('Data saved to storage:', request.playerData);
      });
    }
  });
  