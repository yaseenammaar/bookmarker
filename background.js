chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ tweets: [] });
});

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//     if (request.action === 'postData') {
//         fetch(request.url, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 // Add other headers if required
//             },
//             body: JSON.stringify(request.data) // Send the data
//         })
//         .then(response => response.json())  // Parse response as JSON
//         .then(data => {
//             sendResponse({ status: 'success', data: data });  // Send success response back to content script
//         })
//         .catch(error => {
//             sendResponse({ status: 'error', error: error.message });  // Send error back to content script
//         });

//         // Return true to indicate the response will be sent asynchronously
//         return true;
//     }
// });


