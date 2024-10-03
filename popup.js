// Load saved tweets from storage
chrome.storage.local.get('tweets', function (result) {
    let tweets = result.tweets || [];
    let tweetsList = document.getElementById('tweetsList');
    console.log(tweetsList)
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
        console.log('tweets:',tweets)

        const urll = "http://13.50.119.185/api/data/save/tweets";
        const options = {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
          },
          body: JSON.stringify({
           tweets
          }),
        };
        fetch(urll, options)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
          });

        // axios.post('http://13.50.119.185/api/data/save/tweets', tweets)
        //     .then(function (response) {
        //         console.log('Data successfully sent', response);
        //         alert('success')
        //     })
        //     .catch(function (error) {
        //         console.error('Error sending data', error);
        //         alert('failed')
        //     });

        let blob = new Blob([JSON.stringify(tweets, null, 2)], { type: 'application/json' });
        let url = URL.createObjectURL(blob);

        let a = document.createElement('a');
        a.href = url;
        a.download = 'tweets.json';
        a.click();
    });
});
