document.getElementById('loginForm').addEventListener('submit', async function(event) {
  event.preventDefault();
  document.getElementById('result').innerHTML = "";
  const loginname = document.getElementById('loginname').value;
  const password = document.getElementById('password').value;
  if(loginname === "masnsa" && password === "masnsa_pass") {
    document.getElementById('result').innerHTML = '<span class="text-success">Login Successful</span>';
    setTimeout(() => {
      debugger;
      document.getElementById('result').innerHTML = "";
      document.getElementById('loginForm').classList.add('collapse');
      document.getElementById('mbtiForm').classList.remove('collapse');
    }, 1000);
  } else {
    document.getElementById('result').innerHTML = '<span class="text-danger">Failed to login</span>';
  }
})

document.getElementById('mbtiForm').addEventListener('submit', async function(event) {
  event.preventDefault(); // Prevent default form submission
  document.getElementById('result').innerHTML = "";

  const username = document.getElementById('username').value.toLowerCase();
  try {
    const response = await fetch('./input.csv');
    const data = await response.text();
    const mbtiData = parseCSV(data);
    const userMBTI = mbtiData.find(data => data.username.toLowerCase() === username);

    if (userMBTI) {
      document.getElementById('result').innerHTML = `Hello ${username}, your MBTI is: <b class="text-primary">${userMBTI.mbti.toUpperCase()}</b>`;
    } else {
      document.getElementById('result').innerHTML = `<span class="text-danger">Sorry, no MBTI found for <b>${username}</b></span>`;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    document.getElementById('result').innerHTML = '<span class="text-danger">An error occurred. Please try again later.</span>';
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
