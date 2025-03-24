// Function to scrape all player news
function scrapePlayerNews() {
  let playerData = [];

  let playerPosts = document.querySelectorAll('.PlayerNewsPost'); // Select all posts

  playerPosts.forEach(post => {
    let lastName = post.querySelector('.PlayerNewsPost-lastName')?.textContent.trim() || "";
    let firstName = post.querySelector('.PlayerNewsPost-firstName')?.textContent.trim() || "";
    let team = post.querySelector('.PlayerNewsPost-team-abbr')?.textContent.trim() || "";
    let headline = post.querySelector('.PlayerNewsPost-headline')?.textContent.trim() || "";
    let analysis = post.querySelector('.PlayerNewsPost-analysis')?.textContent.trim() || "";
    let date = post.querySelector('.PlayerNewsPost-date')?.textContent.trim() || "";

    playerData.push({ lastName, firstName, team, headline, analysis, date });
  });

  console.log('Updated Player Data:', playerData); // Log updated data

  // Save updated data to Chrome storage
  chrome.storage.local.set({ playerData });
}

// Initial scrape when the page first loads
window.addEventListener('load', scrapePlayerNews);

// Detect when new content is loaded (MutationObserver for dynamic elements)
const observer = new MutationObserver(() => {
  scrapePlayerNews(); // Re-run scraping when new elements are added
});

// Start observing the body for changes
observer.observe(document.body, { childList: true, subtree: true });
