window.addEventListener('load', function() {
  let playerData = [];

  let playerPosts = document.querySelectorAll('.PlayerNewsPost'); // Check if this matches the correct selector

  playerPosts.forEach(post => {
    let lastName = post.querySelector('.PlayerNewsPost-lastName')?.textContent.trim() || "";
    let firstName = post.querySelector('.PlayerNewsPost-firstName')?.textContent.trim() || "";
    let team = post.querySelector('.PlayerNewsPost-team-abbr')?.textContent.trim() || "";
    let headline = post.querySelector('.PlayerNewsPost-headline')?.textContent.trim() || "";
    let analysis = post.querySelector('.PlayerNewsPost-analysis')?.textContent.trim() || "";
    let date = post.querySelector('.PlayerNewsPost-date')?.textContent.trim() || "";

    playerData.push({ lastName, firstName, team, headline, analysis, date });
  });

  console.log('Scraped Player Data:', playerData); // Log the data to check if it's being scraped

  // Send the data to background.js
  chrome.runtime.sendMessage({ playerData: playerData });
});
