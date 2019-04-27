// This file contains metadata about the game, like title, keywords, etc.  Many
// of the values are injected into index.html's OpenGraph tags to make social
// media shares look nice.  The metadata is also available within the game code
// (import metadata from "./metadata.js") if needed.

module.exports = {
    title: "Ransom", // the title of the
    updateTime: new Date().toISOString(), // the time the game was last updated
    productionUrl: "PRODUCTION URL OF THE GAME", // the URL the app will be deployed to in production
    productionWebsiteName: "NAME OF PRODUCTION WEBSITE",
    description: "DESCRIPTION OF THE GAME",
    thumbUrl: "URL TO A THUMBNAIL OF THE GAME",
    keywords: "fun,games,yes,play,webgame",
    package: require("../package.json"),
};
