document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.local.get('playerData', (data) => {
    console.log("Fetched data from storage:", data);

    const playerTable = document.getElementById('playerTable').getElementsByTagName('tbody')[0];

    if (data.playerData && data.playerData.length > 0) {
      data.playerData.forEach(player => {
        const row = playerTable.insertRow();

        const cell1 = row.insertCell(0);
        cell1.textContent = `${player.lastName}, ${player.firstName}`;

        const cell2 = row.insertCell(1);
        cell2.innerHTML = `${player.headline} <br> ${player.analysis}`;

        const cell3 = row.insertCell(2);
        cell3.textContent = player.date;

        const cell4 = row.insertCell(3);
        cell4.textContent = player.team;
      });
    } else {
      console.log("No player data found.");
    }
  });

  // Copy to clipboard
  document.getElementById('copyButton').addEventListener('click', () => {
    let textToCopy = '';

    document.querySelectorAll('#playerTable tbody tr').forEach(row => {
      const columns = row.querySelectorAll('td');

      // Replace <br> with space to keep Headline & Analysis in the same cell
      let headlineAndAnalysis = columns[1].innerHTML.replace(/<br\s*\/?>/gi, ' '); 

      const playerInfo = `${columns[0].textContent}\t${headlineAndAnalysis}\t${columns[2].textContent}\t${columns[3].textContent}`;
      textToCopy += playerInfo + '\n';
    });

    navigator.clipboard.writeText(textToCopy).then(() => {
      console.log("Copied to clipboard:", textToCopy);
      const copyMessage = document.getElementById('copyMessage');
      copyMessage.style.display = 'block';
      setTimeout(() => { copyMessage.style.display = 'none'; }, 2000);
    }).catch(err => {
      console.error("Failed to copy:", err);
    });
  });
});
