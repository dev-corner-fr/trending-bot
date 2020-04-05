require('dotenv').config()
const { Client } = require('discord.js')
const client = new Client()
const prefix = '!'

const producthunt = require('./modules/producthunt')

client.once('ready', () => console.log('Ready!'))

client.on('message', async message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return

  const args = message.content.slice(prefix.length).split(/ +/)
  const command = args.shift().toLowerCase()

  if (command === 'ph') {
    const embed = await producthunt()
    
    message.channel.send(embed)
  }
})

client.login(process.env.TOKEN_DISCORD_BOT)
