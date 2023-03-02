const say = require('say')

module.exports = {
  name: 'voices',
  aliases: ['v'],
  description: 'Show all available voices.',

  run: async (bot, message, args) => {
    say.getInstalledVoices((_, voices) => {
      for (i = 0; i < voices.length; i++) {
        message.channel.send(i + '. ' + voices[i])
      }
    })
  }
}