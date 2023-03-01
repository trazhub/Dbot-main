const Discord = require('discord.js');

const Schema = require('../../database/models/userBans');

const webhookClientLogs = new Discord.WebhookClient({
    id: "",
    token: "",
});

module.exports = async (client, interaction, args) => {
    const boolean = interaction.options.getBoolean('new');
    const member = interaction.options.getUser('user');

    if (boolean == true) {
        Schema.findOne({ User: member.id }, async (err, data) => {
            if (data) {
                return client.errNormal({
                    error: `<@!${member.id}> (${member.id}) has already been banned from the bot`,
                    type: `editreply`
                }, interaction);
            }
            else {
                new Schema({
                    User: member.id
                }).save();

                client.succNormal({
                    text: `<@!${member.id}> (${member.id}) banned from the bot`,
                    type: 'editreply'
                }, interaction)

                let embedLogs = new Discord.MessageEmbed()
                    .setTitle(`🔨・Ban added`)
                    .setDescription(`<@!${member.id}> (${member.id}) banned from the bot`)
                    .addField('👤┆Banned By', `${interaction.user} (${interaction.user.tag})`, true)
                    .setColor(client.config.colors.normal)
                    .setFooter(client.config.discord.footer)
                    .setTimestamp();
                webhookClientLogs.send({
                    username: 'Dbot Bans',
                    embeds: [embedLogs],
                });
            }
        })
    }
    else if (boolean == false) {
        Schema.findOne({ User: member.id }, async (err, data) => {
            if (data) {
                Schema.findOneAndDelete({ User: member.id }).then(() => {
                    client.succNormal({
                        text: `<@!${member.id}> (${member.id}) unbanned from the bot`,
                        type: 'editreply'
                    }, interaction)

                    let embedLogs = new Discord.MessageEmbed()
                        .setTitle(`🔨・Ban removed`)
                        .setDescription(`<@!${member.id}> (${member.id}) unbanned from the bot`)
                        .addField('👤┆Unbanned By', `${interaction.user} (${interaction.user.tag})`, true)
                        .setColor(client.config.colors.normal)
                        .setFooter(client.config.discord.footer)
                        .setTimestamp();
                    webhookClientLogs.send({
                        username: 'Dbot Bans',
                        embeds: [embedLogs],
                    });
                })
            }
            else {
                return client.errNormal({
                    error: `<@!${member.id}> (${member.id}) has not been banned from the bot`,
                    type: `editreply`
                }, interaction);
            }
        })
    }
}

// © Dotwood Media | All rights reserved