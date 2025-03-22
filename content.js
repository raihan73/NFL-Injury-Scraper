// content.js
console.log("NFL Player Scraper running...");

const waitForElements = async (selector, timeout = 10000) => {
  const startTime = Date.now();
  while (Date.now() - startTime < timeout) {
    const elements = document.querySelectorAll(selector);
    if (elements.length > 0) return elements;
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  return [];
};

const scrapePlayerInfo = async () => {
  console.log("Scraping player data...");
  const playerData = [];

  const playerFirstNames = await waitForElements('.PlayerNewsPost-firstName');
  const playerLastNames = await waitForElements('.PlayerNewsPost-lastName');
  const playerHeadlines = await waitForElements('.PlayerNewsPost-headline');
  const playerAnalyses = await waitForElements('.PlayerNewsPost-analysis');
  const playerDates = await waitForElements('.PlayerNewsPost-date');
  const playerTeams = await waitForElements('.PlayerNewsPost-team-abbr');

  console.log("Players found:", playerFirstNames.length);

  for (let i = 0; i < playerFirstNames.length; i++) {
    const playerFirstName = playerFirstNames[i]?.innerText || "Not found";
    const playerLastName = playerLastNames[i]?.innerText || "Not found";
    const playerHeadline = playerHeadlines[i]?.innerText || "Not found";
    const playerAnalysis = playerAnalyses[i]?.innerText || "Not found";
    let updateDate = playerDates[i]?.innerText || "Not found";
    const playerTeam = playerTeams[i]?.innerText || "Not found";

    const dateParts = updateDate.split(',');
    if (dateParts.length >= 2) {
      updateDate = dateParts[0] + ',' + dateParts[1];
    }

    playerData.push({
      firstName: playerFirstName,
      lastName: playerLastName,
      headline: playerHeadline,
      analysis: playerAnalysis,
      date: updateDate.trim(),
      team: playerTeam
    });
  }

  chrome.storage.local.set({ playerData }, () => {
    console.log("Player data saved!", playerData);
  });
};

window.addEventListener("load", () => {
  console.log("Page loaded, running scrape...");
  scrapePlayerInfo();
});
