// Wait until the tweets are loaded
window.addEventListener('load', function () {
    // Function to add save icon to each tweet
    function addSaveIcons() {
        let tweets = document.querySelectorAll('article');  // Adjust if needed for tweet structure

        tweets.forEach((tweet) => {
            if (!tweet.querySelector('.save-tweet-icon')) {
                let saveIcon = document.createElement('button');
                saveIcon.innerHTML = '💾';  // Save icon (you can replace it with an image or font icon)
                saveIcon.classList.add('save-tweet-icon');
                saveIcon.style.cssText = 'position:absolute; right:10px; top:10px; z-index:1000; cursor:pointer;';

                // Append the icon to the tweet
                tweet.appendChild(saveIcon);

                // Attach event listener
                saveIcon.addEventListener('click', () => {
                    let tweetText = tweet.innerText;
                    storeTweet(tweetText);
                });
            }
        });
    }

    // Continuously monitor for new tweets being loaded
    setInterval(addSaveIcons, 3000);
});

// Store tweet in local storage
function storeTweet(tweetText) {
    chrome.storage.local.get('tweets', function (result) {
        let tweets = result.tweets || [];
        tweets.push(tweetText);
        chrome.storage.local.set({ 'tweets': tweets }, function () {
            console.log('Tweet saved!');
        });
    });
}
