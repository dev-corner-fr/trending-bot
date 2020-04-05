const { MessageEmbed } = require('discord.js')
const { fetchRepositories } = require('@huchenme/github-trending')

async function github () {
  const repositories = await fetchRepositories()
  
  const [repository] = repositories.sort((a, b) => b.currentPeriodStars - a.currentPeriodStars)

  const embed = new MessageEmbed()
    .setColor('#F6F8FA')
    .setTitle(`GitHub : ${repository.name}`)
    .setThumbnail(repository.avatar)
    .setURL(repository.url)
    .addFields(
      {
        name: 'Titre',
        value: `${repository.author}/${repository.name}`
      },
      { 
        name: 'Description',
        value: repository.description
      },
      {
        name: 'Stars',
        inline: true,
        value: `${repository.stars} :star:`
      },
      {
        name: 'Forks',
        inline: true,
        value: `${repository.forks} :twisted_rightwards_arrows:`
      }
    )
    .setTimestamp(new Date())
  
  return embed
}

module.exports = github
