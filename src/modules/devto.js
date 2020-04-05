const { MessageEmbed } = require('discord.js')
const fetch = require('node-fetch')

const url = 'https://dev.to/api/articles?page=1&per_page=1&state=rising&top=1'

async function devto () {
  const [article] = await fetch(url)
    .then(response => response.json())
  
  const embed = new MessageEmbed()
    .setColor('#1A2634')
    .setTitle(`Dev.to : ${article.title}`)
    .setThumbnail(article.user.profile_image_90)
    .setURL(article.canonical_url || article.url)
    .addFields(
      {
        name: 'Titre',
        value: article.title
      },
      { 
        name: 'Description',
        value: `${article.description}\n[Dev.to link](${article.url})`
      },
      {
        name: 'Rating',
        value: `${article.positive_reactions_count} :heart:`
      }
    )
    .setTimestamp(article.created_at)
  
  return embed
}

module.exports = devto
