# GitHub Avatar Downloader

Given a GitHub repository name and owner, GitHub Avatar Downloader will download the avatars of all its contributors and save them to subdirectory `./avatars`

## Usage

This program should be executed from the command line, in the following manner:

`node download_avatars.js kaichesterni github-avatar-downloader`

Where `kaichesterni` is the owner of a repository and `github-avatar-downloader` is the name of the repository

## Authorization

Dotenv has been integrated into Github Avatar Downloader in order to authorize requests for contributor lists. Users must create a file with `.env` file extension containing:

`GITHUB_AUTH_CODE=abcdefg`

Where `abcdefg` is an authorization code that the user can generate at https://github.com/settings/tokens

## Dependencies

* Node.js - https://nodejs.org
* Request - https://github.com/request/request
* Dotenv - https://github.com/motdotla/dotenv
