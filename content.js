// Wait until the tweets are loaded
window.addEventListener('load', function () {
    // Function to add save icon to each tweet
if (window.location.hostname.includes('x.com')) {
    function addSaveIcons() {
        let tweets = document.querySelectorAll('article');  // Adjust if needed for tweet structure
        // let tweets = document.querySelector('article');  // Adjust if needed for tweet structure

        tweets.forEach((tweet) => {
            if (!tweet.querySelector('.save-tweet-icon')) {
                let saveIcon = document.createElement('button');
                saveIcon.innerHTML = '💾';  // Save icon (you can replace it with an image or font icon)
                saveIcon.classList.add('save-tweet-icon');
                saveIcon.style.cssText = 'position:absolute; left:20px; bottom:10px; z-index:1000; cursor:pointer;';

                // Append the icon to the tweet
                tweet.appendChild(saveIcon);
                let usernamee = ''
                let datetime = ''
                // Attach event listener
                saveIcon.addEventListener('click', () => {
                    // let tweetText = tweet.innerText;
                    let tweetText = tweet.querySelector('div[data-testid="tweetText"]').innerText;
                    let allLinks = tweet.querySelectorAll('a'); // Select all <a> tags
                    if (allLinks.length > 1) {
                        let secondLink = allLinks[2]; // Access the second <a> tag
                        let thirdLink = allLinks[3]; // Access the second <a> tag
                        let usernameElementt = secondLink.querySelector('div span'); // Modify if necessary based on the structure
                        let datelementt = thirdLink.querySelector('time'); // Modify if necessary based on the structure
                        usernamee = usernameElementt ? usernameElementt.textContent : null; // Extract the username text
                        datetime = datelementt ? datelementt.getAttribute('datetime') : null; // Extract the username text
                        // alert('if')
                        // alert(usernamee)
                        // alert('and')
                        // alert(datetime)

                    }
                    // let usernameElement = tweet.querySelector('a[role="link"] div span span'); // Select the first <a> tag
                    // console.log('tweet:',usernameElement)
                    // let username = usernameElement ? usernameElement.innerText : ''; // Extract the username from the <a> tag
                    // alert(usernameElement.innerText)

                    // console.log(username)
                    storeTweet(tweetText,usernamee,datetime);
                    // alert(tweetText)
                    saveIcon.innerHTML = '✔'; 

                });
            }
        });
    }
    setInterval(addSaveIcons, 3000);

} 
if(window.location.hostname.includes('linkedin.com')) {

    function addSaveIconsForLinkedInPosts() {
        const posts = document.querySelectorAll('.feed-shared-update-v2'); // Target LinkedIn posts

        posts.forEach((post) => {
            if (!post.querySelector('.save-post-icon')) {  // Prevent duplicate save buttons
                let saveIcon = document.createElement('button');
                saveIcon.innerHTML = '💾';  // Save icon (you can replace it with an image or font icon)
                saveIcon.classList.add('save-post-icon');
                saveIcon.style.cssText = 'position:absolute; right:10px; top:50px; z-index:1000; cursor:pointer; background:none; border:none;';

                // Append the icon to the LinkedIn post
                post.style.position = 'relative';  // Ensure post has relative positioning for absolute icon placement
                post.appendChild(saveIcon);

                // Attach event listener
                saveIcon.addEventListener('click', () => {
                    // Extract LinkedIn post text, username, and posted at datetime
                    let postText = post.querySelector('span.break-words')?.innerText || '';  // Extract LinkedIn post text
                    let postUsername = post.querySelector('.update-components-actor__meta-link')?.href || 'Unknown';  // Extract username
                    let postDatetime = post.querySelector('time')?.getAttribute('datetime') || new Date().toISOString();  // Extract post timestamp

                    //adding for time
                    const relativeTimeElement = post.querySelector('.update-components-actor__sub-description');
                    const timeText = relativeTimeElement.textContent.trim();
                    console.log(timeText)
                    const match = timeText.match(/(\d+)([hd])/);
                    console.log(match)

                    if (match) {
                        const value = parseInt(match[1]);
                        console.log(value)

                        const unit = match[2];
                        
                        const now = new Date();
                        
                        if (unit === 'h') {
                            now.setHours(now.getHours() - value);
                        } else if (unit === 'd') {
                            now.setDate(now.getDate() - value);
                        }
                        console.log(now)

                        postDatetime = now;
                    }
                    //ending adding for time


                    if (postText) {
                        storeLinkedinPosts(postText, postUsername, postDatetime);
                        saveIcon.innerHTML = '✅';  // Change to "saved" icon after storing
                    } else {
                        console.log('Failed to extract post text.');
                    }
                });
            }
        });
    }
    setInterval(addSaveIconsForLinkedInPosts, 3000);  // For LinkedIn

}
    // Continuously monitor for new tweets being loaded

});

// Store tweet in local storage
function storeTweet(tweetText,username,datetime) {

    chrome.storage.local.get('tweets', function (result) {
        if (chrome.runtime.lastError) {
            console.error("Error retrieving tweets:", chrome.runtime.lastError);
        } else {
            let tweets = result.tweets || []; // Retrieve the 'tweets' array or set it as an empty array if not present
            tweets.push({tweetText,username,datetime});
            chrome.storage.local.set({ 'tweets': tweets }, function () {
                    console.log('Tweet saved!');
                });

                const urll = "https://api.sniff.so/api/data/save/tweets";
                const options = {
                  method: "POST",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                  },
                  body: JSON.stringify({
                    tweetText,username,datetime
                  }),
                };
                fetch(urll, options)
                  .then((response) => response.json())
                  .then((data) => {
                    console.log(data);
                  });
            
            // Perform actions with the stored tweets
        }
    });
    
    // chrome.storage.local.get('tweets', function (result) {
    //     let tweets = result.tweets || [];
    //     tweets.push({tweetText,username});
    //     alert(tweets);
    //     chrome.storage.local.set({ 'tweets': tweets }, function () {
    //         console.log('Tweet saved!');
    //     });
    // });
}

function storeLinkedinPosts(post,username,datetime) {

    chrome.storage.local.get('posts', function (result) {
        if (chrome.runtime.lastError) {
            console.error("Error retrieving posts:", chrome.runtime.lastError);
        } else {
            let tweets = result.tweets || []; // Retrieve the 'tweets' array or set it as an empty array if not present
            tweets.push({post,username,datetime});
            chrome.storage.local.set({ 'posts': tweets }, function () {
                    console.log('posts saved!');
                });

                const urll = "https://api.sniff.so/api/data/save/linkedin/posts";
                const options = {
                  method: "POST",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                  },
                  body: JSON.stringify({
                    post,username,datetime
                  }),
                };
                fetch(urll, options)
                  .then((response) => response.json())
                  .then((data) => {
                    console.log(data);
                  });
            
            // Perform actions with the stored tweets
        }
    });
    
    // chrome.storage.local.get('tweets', function (result) {
    //     let tweets = result.tweets || [];
    //     tweets.push({tweetText,username});
    //     alert(tweets);
    //     chrome.storage.local.set({ 'tweets': tweets }, function () {
    //         console.log('Tweet saved!');
    //     });
    // });
}
