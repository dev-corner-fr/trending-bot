const { MessageEmbed } = require('discord.js')
const fetch = require('node-fetch')
const snoowrap = require('snoowrap')
const getExcerpt = require('../utils/getExcerpt')
const pkg = require('../../package.json')

const client = new snoowrap({
  userAgent: `${pkg.name}-${pkg.author}-${pkg.version}`,
  clientId: process.env.REDDIT_CLIENT_ID,
  clientSecret: process.env.REDDIT_CLIENT_SECRET,
  username: process.env.REDDIT_USERNAME,
  password: process.env.REDDIT_PASSWORD
})

async function reddit () {
  const top = await client.getSubreddit('javascript')
    .getTop({
      limit: 1
    })

  const [post] = top.toJSON()

  let description = ''
  const permalink = `[Reddit direct link](https://reddit.com${post.permalink})`

  if (post.selftext) {
    description = `${getExcerpt(post.selftext, 300)}\n${permalink}`
  } else {
    description = permalink
  }

  const embed = new MessageEmbed()
    .setColor('#FF4500')
    .setTitle(`${post.subreddit_name_prefixed} : ${post.title}`)
    .setThumbnail(post.thumbnail)
    .setURL(post.url)
    .addFields(
      {
        name: 'Titre',
        value: `${post.title}, by ${post.author}`
      },
      { 
        name: 'Description',
        value: description
      },
      {
        name: 'Rating',
        value: `${post.ups} :arrow_up_small:`
      }
    )
    .setTimestamp(post.created_utc * 1000)
  
  return embed
}


module.exports = reddit