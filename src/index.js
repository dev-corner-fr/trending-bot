require('dotenv').config()
const { Client, ClientUser } = require('discord.js')
const CronJob = require('cron').CronJob

const config = require('../config')
const client = new Client()

if (!config.trendingChannelId) {
  throw new Error('"config.trendingChannelId" is empty, it should be a channel id.')
}

const modules = require('./modules')

client.once('ready', () => {
  console.log(`${client.user.username} is ready.`)
  client.user.setPresence({
    activity: {
      type: 'WATCHING',
      name: 'trending posts'
    }
  })
})

const job = new CronJob('0 0 20 * * *', sendTrendingPosts)
  .start()

async function sendTrendingPosts () {
  const trendingFetches = modules.map(module => module())

  const results = await Promise.allSettled(trendingFetches)
  
  const channel = client.channels.cache.get(config.trendingChannelId)

  for (const result of results) {
    if (result.status !== 'fulfilled') {
      console.error(`A module rejected : ${result.reason}`)
      continue
    }

    await delay(1000)
    await channel.send(result.value)
  }

  await channel.send(`That's all for today folks ! :man_technologist: :woman_technologist: `)
}

async function delay (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

client.login(process.env.TOKEN_DISCORD_BOT)
