require("dotenv").config();
const { ShardingManager } = require('discord.js');
const manager = new ShardingManager('./bot.js', { token: process.env.TOKEN })
const EmeniConsole = require('./constructs/EmeniConsole');
const log = new EmeniConsole();

manager.spawn();
manager.on('shardCreate', shard => log.log(`shard ${shard.id} launched.`));

