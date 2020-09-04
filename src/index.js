require('dotenv').config()
const { Client, ClientUser } = require('discord.js')
const CronJob = require('cron').CronJob

const config = require('../config')
const client = new Client()

if (!config.trendingChannelId) {
  throw new Error('"config.trendingChannelId" is empty, it should be a channel id.')
}

const modules = require('./modules')

client.once('ready', () => console.log('Ready!'))

const job = new CronJob('0 0 20 * * *', sendTrendingPosts)
  .start()

async function sendTrendingPosts () {
  const trendingFetches = modules.map(module => module())

  const results = await Promise.all(trendingFetches)
  
  const channel = client.channels.cache.get(config.trendingChannelId)
  
  for (const embed of results) {
    channel.send(embed)
  }

  channel.send(`That's all for today folks ! :man_technologist: :woman_technologist: `)
}

client.login(process.env.TOKEN_DISCORD_BOT)
