require('dotenv').config()
const { Client, MessageEmbed } = require('discord.js')
const fetch = require('node-fetch')
const client = new Client()
const prefix = '!'

client.once('ready', () => {
  console.log('Ready!')
})

client.on('message', async message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return

  const args = message.content.slice(prefix.length).split(/ +/)
  const command = args.shift().toLowerCase()

  if (command === 'ph') {
    const url = 'https://api.producthunt.com/v2/api/graphql'
    const query = `
      {posts {edges { node {description, name, tagline, slug, votesCount, thumbnail {url}}}}}
    `
    const file = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.TOKEN_PH}` }, body: JSON.stringify({ query }) }).then(response => response.json())
    const embed = new MessageEmbed()
      .setColor('#EFFF00')
      .setTitle('Product Hunt Today TOP')
      .setURL('https://www.producthunt.com/posts/' + file.data.posts.edges[0].node.slug)
      .addFields(
        { name: 'Titre :', value: file.data.posts.edges[0].node.name },
        { name: 'Description', value: file.data.posts.edges[0].node.description },
        { name: 'Rating', value: `${file.data.posts.edges[0].node.votesCount} thumbs up` }
      )
    message.channel.send(embed)
  }
})

client.login(process.env.TOKEN_BOT)
