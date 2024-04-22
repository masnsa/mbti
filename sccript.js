document.getElementById('mbtiForm').addEventListener('submit', async function(event) {
  event.preventDefault(); // Prevent default form submission

  const username = document.getElementById('username').value;

  try {
    const response = await fetch('URL_TO_YOUR_CSV_FILE');
    const data = await response.text();
    const mbtiData = parseCSV(data);
    const userMBTI = mbtiData.find(data => data.username === username);

    if (userMBTI) {
      document.getElementById('result').innerText = `Hello ${username}, your MBTI is: ${userMBTI.MBTI}`;
    } else {
      document.getElementById('result').innerText = `Sorry, no MBTI found for ${username}`;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    document.getElementById('result').innerText = 'An error occurred. Please try again later.';
  }
});

function parseCSV(csvData) {
  const lines = csvData.split('\n');
  const result = [];

  const headers = lines[0].split(',');
  for (let i = 1; i < lines.length; i++) {
    const obj = {};
    const currentLine = lines[i].split(',');
    for (let j = 0; j < headers.length; j++) {
      obj[headers[j].trim()] = currentLine[j].trim();
    }
    result.push(obj);
  }

  return result;
}
