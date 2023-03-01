const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');

module.exports = {
  name: 'about',
  category: 'Information',
  aliases: ['botinfo'],
  description: 'See description about this project',
  args: false,
  usage: '',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  owner: false,
  execute: async (message, args, client, prefix) => {
    const row = new MessageActionRow().addComponents(
      new MessageButton().setLabel('Invite').setStyle('LINK').setURL(client.config.links.invite),
      new MessageButton()
        .setLabel('GitHub')
        .setStyle('LINK')
        .setURL('https://github.com/trazhub'),
      new MessageButton().setLabel('Support').setStyle('LINK').setURL(client.config.links.support),
    );
    const mainPage = new MessageEmbed()
      .setAuthor({
        name: 'Helix',
        iconURL:
          'https://images-ext-1.discordapp.net/external/172C77iljzbJHXudaKpJn91qQu5BmcbUraG1LwzaULo/https/cdn.discordapp.com/avatars/1069607832229515355/a19bb9888cd11158b1caa6a48521fb28.webp',
      })
      .setThumbnail(
        'https://images-ext-1.discordapp.net/external/172C77iljzbJHXudaKpJn91qQu5BmcbUraG1LwzaULo/https/cdn.discordapp.com/avatars/1069607832229515355/a19bb9888cd11158b1caa6a48521fb28.webp',
      )
      .setColor('RANDOM')
      .addField(
        'Creator',
        '[Garv](https://github.com/trazhub)',
        true,
      )
      .addField('Organization', '[Medyno](https://github.com/Medyno)', true)
      .addField('Website', '[Here](https://garvv.me)', true)
      .addField(
        '\u200b',
        `[Helix](https://github.com/trazhub) is [Garv](https://github.com/trazhub)Thanks for using Helix`,
      );
    return message.reply({ embeds: [mainPage], components: [row] });
  },
};