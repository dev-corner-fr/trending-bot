const { MessageEmbed } = require('discord.js')
const fetch = require('node-fetch')

const url = 'https://api.producthunt.com/v2/api/graphql'

const query = /* GraphQL */ `{
  posts (first: 1) {
    edges {
      node {
        description
        name
        url
        website
        votesCount
        thumbnail {
          url (width: 80, height: 80)
        }
      }
    }
  }
}`

const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.TOKEN_PRODUCTHUNT}`
  },
  body: JSON.stringify({ query })
}

async function productHunt () {
  const file = await fetch(url, options)
  .then(response => response.json())

  const post = file.data.posts.edges[0].node
  
  const embed = new MessageEmbed()
    .setColor('#DA552f')
    .setTitle(`Product Hunt : ${post.name}`)
    .setThumbnail(post.thumbnail.url)
    .setURL(post.website)
    .addFields(
      {
        name: 'Titre',
        value: post.name
      },
      { 
        name: 'Description',
        value: `${post.description}\n[ProductHunt link](${post.url})`
      },
      {
        name: 'Rating',
        value: `${post.votesCount} :thumbsup:`
      }
    )
    .setTimestamp(new Date())
  
  return embed
}

module.exports = productHunt
