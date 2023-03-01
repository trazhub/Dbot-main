const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { ChannelType } = require('discord-api-types/v9');
const Discord = require('discord.js');
const ms = require('ms');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('giveaway')
        .setDescription('Host a giveaway in your server')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Get information about the giveaway category commands')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('start')
                .setDescription('Start a giveaway')
                .addChannelOption(option => option.setName('channel').setDescription('Channel where the giveaway should be').setRequired(true).addChannelType(ChannelType.GuildText))
                .addStringOption(option => option.setName('duration').setDescription('Duration of the giveaway').setRequired(true))
                .addNumberOption(option => option.setName('winners').setDescription('The number of giveaway winners').setRequired(true))
                .addStringOption(option => option.setName('prize').setDescription('The giveaway prize').setRequired(true)),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('drop')
                .setDescription('Start a drop giveaway')
                .addChannelOption(option => option.setName('channel').setDescription('Channel where the giveaway should be').setRequired(true).addChannelType(ChannelType.GuildText))
                .addStringOption(option => option.setName('duration').setDescription('Duration of the giveaway').setRequired(true))
                .addNumberOption(option => option.setName('winners').setDescription('The number of giveaway winners').setRequired(true))
                .addStringOption(option => option.setName('prize').setDescription('The giveaway prize').setRequired(true)),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('reroll')
                .setDescription('Reroll a giveaway')
                .addStringOption(option => option.setName('message').setDescription('Giveaway message ID').setRequired(true)),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('end')
                .setDescription('End a giveaway')
                .addStringOption(option => option.setName('message').setDescription('Giveaway message ID').setRequired(true)),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('edit')
                .setDescription('Edit the time of a giveaway')
                .addStringOption(option => option.setName('message').setDescription('Giveaway message ID').setRequired(true)),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('delete')
                .setDescription('Delete a giveaway')
                .addStringOption(option => option.setName('message').setDescription('Giveaway message ID').setRequired(true)),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('pause')
                .setDescription('Pause a giveaway')
                .addStringOption(option => option.setName('message').setDescription('Giveaway message ID').setRequired(true)),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('unpause')
                .setDescription('Unpause a giveaway')
                .addStringOption(option => option.setName('message').setDescription('Giveaway message ID').setRequired(true)),
        ),

    /** 
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
        const perms = await client.checkUserPerms({
            flags: [Discord.Permissions.FLAGS.MANAGE_MESSAGES],
            perms: ["MANAGE_MESSAGES"]
        }, interaction)

        if (perms == false) return;

        client.loadSubcommands(client, interaction, args);
    },
};

// © Dotwood Media | All rights reserved