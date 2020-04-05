require('dotenv').config()
const { Client } = require('discord.js')
const client = new Client()
const prefix = '!'

const producthunt = require('./modules/producthunt')
const github = require('./modules/github')
const devto = require('./modules/devto')

client.once('ready', () => console.log('Ready!'))

client.on('message', async message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return

  const args = message.content.slice(prefix.length).split(/ +/)
  const command = args.shift().toLowerCase()

  if (command === 'ph') {
    const embed = await producthunt()
    
    message.channel.send(embed)
  }

  if (command === 'gh') {
    const embed = await github()

    message.channel.send(embed)
  }

  if (command === 'dt') {
    const embed = await devto()

    message.channel.send(embed)
  }
})

client.login(process.env.TOKEN_DISCORD_BOT)
