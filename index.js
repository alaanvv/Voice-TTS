const { Client } = require('discord.js')
const setup = require('./lib/setup')

const bot = new Client({ intents: 3276799 })
setup(bot)

bot.login(bot.token)