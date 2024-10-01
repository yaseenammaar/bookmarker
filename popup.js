// Load saved tweets from storage
chrome.storage.local.get('tweets', function (result) {
    let tweets = result.tweets || [];
    let tweetsList = document.getElementById('tweetsList');
    
    tweets.forEach(tweet => {
        let listItem = document.createElement('li');
        listItem.textContent = tweet;
        tweetsList.appendChild(listItem);
    });
});

// Export tweets to a JSON file
document.getElementById('export').addEventListener('click', function() {
    chrome.storage.local.get('tweets', function (result) {
        let tweets = result.tweets || [];
        let blob = new Blob([JSON.stringify(tweets, null, 2)], { type: 'application/json' });
        let url = URL.createObjectURL(blob);

        let a = document.createElement('a');
        a.href = url;
        a.download = 'tweets.json';
        a.click();
    });
});
