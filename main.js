const tmi = require("tmi.js");

var newViewers = [];

var client = new tmi.Client({
  options: { debug: true },
  connection: {
    secure: true,
    reconnect: true
  },
  identity: {
    username: "<yourUsername>",
    password: "oauth:<yourOauth>"
  },
  channels: [ "<channelToListen>" ]
});

client.on("close", function () {
    client.connect()
});

client.connect();

async function main() {
    client.on("join", async function (channel, username) {
    if (!newViewers.includes(username)) {
        newViewers.push(username);
        console.log(`${new Date()}: New viewer joined: ${username}`);
    }
    });
}

main()
