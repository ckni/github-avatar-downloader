/*jshint esversion: 6 */

const request = require("request");
const fs = require("fs");

console.log("Welcome to the GitHub Avatar Downloader!");

// Gets and saves the avatars of all contributors to a repo

function getAvatarLinks(repoOwner, repoName) {
  const options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      "User-Agent": "github-avatar-downloader"
    }
  };

  request(options, (error, response, body) => {
    if (error) {
      return console.log("Error retrieving contributor list.");
    } else {
      const body = JSON.parse(response.body);

      if (!fs.existsSync("./avatars")) {
        fs.mkdir("./avatars", (error) => {
          if (error) {
            return console.log("Error:", error);
          }
        });
      }

      body.forEach((user, i) => {
        request(user.avatar_url).pipe(fs.createWriteStream(`./avatars/${i}.jpg`));
      });
    }
  });
}

// Takes in repoOwner and repoName then runs functions

const repoOwner = "jquery";
const repoName = "jquery";

if (repoOwner && repoName) {
  getAvatarLinks(repoOwner, repoName);
} else {
  console.log("Error: missing arguments. Syntax: node download_avatars.js <Repo Owner> <Repo Name>");
}
