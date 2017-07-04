/*jshint esversion: 6 */
const request = require("request");
const fs = require("fs");
console.log("Welcome to GitHub Avatar Downloader v1.0.0");

// Gets all contributors of a repo
function getContributors(repoOwner, repoName, callback) {
  // Define options for requesting contributor list of a repo
  const options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      "User-Agent": "github-avatar-downloader"
    }
  };

  // Request contributor list of a repo
  request(options, (error, response, body) => {
    if (error) {
      return console.log("Error: failed to request contributor list");
    } else {
      console.log("Response Status Code:", response.statusCode);
      callback(JSON.parse(body));
    }
  });
}

// Downloads avatars of all contributors
function downloadAvatars(body) {
  // Create ./avatars directory if it does not already exists
  if (!fs.existsSync("./avatars")) {
    fs.mkdir("./avatars", (error) => {
      if (error) {
        return console.log("Error: failed to create avatar directory");
      }
    });
  }

  // Save the avatar of each user into the ./avatars directory
  for (var user in body) {
    request(body[user].avatar_url).pipe(fs.createWriteStream(`./avatars/${body[user].login}.jpg`));
  }
}

// Takes in repoOwner and repoName then runs functions
const repoOwner = process.argv[2];
const repoName = process.argv[3];
if (repoOwner && repoName) {
  getContributors(repoOwner, repoName, downloadAvatars);
} else {
  console.log("Missing arguments. Syntax: node download_avatars.js <Repo Owner> <Repo Name>");
}
