chrome.storage.local.get('playerData', function(data) {
  const playerData = data.playerData || [];
  const tableBody = document.querySelector('#playerTable tbody');
  const copyButton = document.getElementById('copyAllBtn'); // Get the button

  // If no data is found, show a message
  if (playerData.length === 0) {
    tableBody.innerHTML = "<tr><td colspan='4'>No data found</td></tr>";
  }
  
  // Function to format the date
  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options); // Format as "Mar 21, 2025"
  }

  // Populate the table with player data
  playerData.forEach(player => {
    const row = document.createElement('tr');
    const formattedDate = formatDate(player.date);
    
    row.innerHTML = `
      <td>${player.team}</td>
      <td>${player.lastName}, ${player.firstName}</td>
      <td>${player.headline} - ${player.analysis}</td>
      <td>${formattedDate}</td>
    `;
    tableBody.appendChild(row);
  });

  // Function to copy all player data to clipboard (EXCEL COMPATIBLE)
  copyButton.addEventListener('click', function() {
    let allData = "";

    // Loop through player data (Exclude Headers)
    playerData.forEach(player => {
      const formattedDate = formatDate(player.date);
      
      // Use TAB (`\t`) between columns, NEW LINE (`\n`) between rows
      allData += `${player.team}\t${player.lastName}, ${player.firstName}\t${player.headline} - ${player.analysis}\t${formattedDate}\n`;
    });

    // Copy to clipboard
    copyToClipboard(allData);

    // Add "Copied!" text with animation
    copyButton.textContent = "Copied!";
    copyButton.style.transition = "background 0.3s, color 0.3s"; // Smooth effect
    copyButton.style.background = "#4CAF50"; // Green success color
    copyButton.style.color = "#fff";

    // Reset after 2 seconds
    setTimeout(() => {
      copyButton.textContent = "Copy All Info";
      copyButton.style.background = ""; // Revert to default
      copyButton.style.color = "";
    }, 2000);
  });

  // Function to copy text to clipboard
  function copyToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  }
});
