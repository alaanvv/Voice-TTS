const { Collection } = require('discord.js')
const { readdirSync } = require('fs')
const Enmap = require('enmap')
const config = require(process.cwd() + '/config.json')

module.exports = bot => {
  bot.token = config.token
  bot.prefix = config.prefix
  bot.commands = new Collection()
  bot.aliases = new Collection()
  bot.voiceDB = new Enmap({
    name: 'voice',
    dataDir: './db'
  })

  bot.on('ready', bot => console.log('Bot running as ' + bot.user.tag))
  bot.on('messageCreate', async message => {
    console.log(message.author.username + ': ' + message.content)

    if (!message.content.startsWith(bot.prefix)) return
    const args = message.content.slice(bot.prefix.length).trim().split(' ')
    const commandQuery = args.shift()?.toLowerCase()

    const command = bot.commands.get(commandQuery) || bot.commands.get(bot.aliases.get(commandQuery))
    if (!command) return message.reply('Unknown command')

    command.run(bot, message, args)
  })

  readdirSync(process.cwd() + '/lib/commands/').forEach(file => {
    let command = require(process.cwd() + '/lib/commands/' + file)
    bot.commands.set(command.name, command)
    if (command.aliases) command.aliases.forEach(alias => bot.aliases.set(alias, command.name))
  })
}