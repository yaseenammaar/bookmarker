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
                    
                                        // Extract comments count
                    let commentsCountElement = post.querySelector('.social-details-social-counts__comments span');
                    let commentsCountText = commentsCountElement ? commentsCountElement.innerText.trim() : '0 comments';
                    let commentsCount = parseInt(commentsCountText.match(/\d+/)?.[0] || 0); // Extract the number
                    

                    // Extract the data-urn attribute
                    let dataUrn = post?.getAttribute('data-urn');

                    // Construct the post link
                    let postLink = dataUrn ? `https://www.linkedin.com/feed/update/${dataUrn}/` : 'Unknown';

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
                        storeLinkedinPosts(postText, postUsername, postDatetime, commentsCount,postLink);
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

if(window.location.hostname.includes('reddit.com')){
    
    function addSaveIconsForArticleReddit() {
        // Target all articles that might contain job posts
        let articles = document.querySelectorAll('article');
    
        articles.forEach(article => {
            // Skip if this article already has our button
            if (article.querySelector('.job-data-extractor')) {
                return;
            }
    
            // Find the post title within this article
            const titleElement = article.querySelector('a[slot="title"]') || 
                                 article.querySelector('h3') || 
                                 article.querySelector('h1');
            if (!titleElement) return;
    
            const title = titleElement.textContent;
    
            // Check if it seems like a job post
            // if (/\[(HIRING|JOB|GIG|FOR HIRE|FORHIRE)\]/i.test(title)) {
                // Create extract button
                const extractButton = document.createElement('button');
                extractButton.className = 'job-data-extractor';
                extractButton.innerHTML = '💾';
                extractButton.style.cssText = `
                    background-color: #0079d3; 
                    color: white; 
                    border: none; 
                    border-radius: 4px; 
                    padding: 2px 2px; 
                    margin: 2px 0; 
                    cursor: pointer; 
                    display: block; 
                    
                `;
    
                // Add click handler
                extractButton.addEventListener('click', function(e) {
                    e.stopPropagation(); // Prevent the click from bubbling to parent elements
    
                    // Get post title
                    const title = titleElement.textContent.trim();
    
                    // Get post content
                    const postContent = article.querySelector('[data-post-click-location="text-body"]') || 
                                       article.querySelector('.md') || 
                                       article.querySelector('[data-click-id="text"]');
                    const content = postContent ? postContent.textContent.trim() : "Content not found";
    
                    // Get post link
                    let postLink = window.location.href;
                    const linkElement = article.querySelector('a[slot="full-post-link"]') || 
                                       article.querySelector('a[data-click-id="body"]') || 
                                       article.querySelector('a[data-testid="post_title"]');
                    if (linkElement && linkElement.href) {
                        postLink = linkElement.href;
                    }
    
                    // Get comment count
                    const commentCountElement = article.querySelector('[comment-count]') || 
                                              article.querySelector('[data-test-id="comment-count"]') || 
                                              article.querySelector('[data-click-id="comments"]');
                    let commentCount = "Unknown";
                    if (commentCountElement) {
                        const commentText = commentCountElement.textContent.trim();
                        const commentAttr = commentCountElement.getAttribute('comment-count');
                        if (commentAttr) {
                            commentCount = commentAttr;
                        } else {
                            // Extract just the number if possible
                            const commentMatch = commentText.match(/(\d+)\s*(?:comments?|replies?)/i);
                            if (commentMatch) {
                                commentCount = commentMatch[1];
                            } else {
                                commentCount = commentText;
                            }
                        }
                    }
    
                    const timeElement = article.querySelector('time') || 
                                  article.querySelector('faceplate-timeago');
                    let postTime = "Unknown";
                    if (timeElement) {
                        postTime = timeElement.getAttribute('datetime') || 
                                timeElement.textContent.trim();
                    }

                    // Store the data
                    storePost(title, content, postLink, commentCount, postTime);

        
                    // Show success message
                    alert('Job data saved successfully!');
                });
    
                // Append the button to the end of the article, just before it closes
                article.appendChild(extractButton);
            // }
        });
    }
    setInterval(addSaveIconsForArticleReddit, 3000);  // For LinkedIn

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

function storeLinkedinPosts(post,username,datetime,commentsCount,postLink) {

    chrome.storage.local.get('posts', function (result) {
        if (chrome.runtime.lastError) {
            console.error("Error retrieving posts:", chrome.runtime.lastError);
        } else {
            let tweets = result.tweets || []; // Retrieve the 'tweets' array or set it as an empty array if not present
            tweets.push({post,username,datetime,commentsCount,postLink});
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
                    post,username,datetime,commentsCount,postLink
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

function storePost(title, content, url, commentCount,postTime) {

    const postData = {
        title,
        content,
        url,
        commentCount,
        postTime
        // timestamp: new Date().toISOString()
    };

    // Send to API endpoint
    const apiUrl = "https://api.sniff.so/api/data/save/reddit/posts";
    const options = {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify(postData),
    };
    
    fetch(apiUrl, options)
        .then((response) => response.json())
        .then((data) => {
            console.log("API response:", data);
        })
        .catch((error) => {
            console.error("Error sending data to API:", error);
        });
    
}
