const needle = require('needle');
const fs = require('fs');

const args = process.argv.slice(2);
const url = args[0];
const filePath = args[1];

if (!url || !filePath) {
  console.error("Please provide URL and file path")
  process.exit(1);
}

needle.get(url, (error, response, body) => {
  if (error) {
    console.error('Error:', error);
    return;
  }

  if (response.statusCode !== 200) {
    console.error(`Failed to fetch. Status Code: ${response.statusCode}`);
    return;
  }

  // Save the data to the file
  fs.writeFile(filePath, body, (err) => {
    if (err) {
      console.error('Error writing to file:', err);
      return;
    }
    console.log(`Downloaded and saved ${body.length} bytes to ${filePath}`);
  });
});