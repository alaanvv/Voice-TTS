const say = require('say')

module.exports = {
  name: 'set-voice',
  aliases: ['set'],
  
  run: async (bot, message, args) => {
    let voice
    say.getInstalledVoices((_, voices) => {
      voice = voices[Number(args[0])]
      
      if (!voice) return message.channel.send('Invalid index')
      
      bot.voiceDB.set(message.author.id, voice)
      message.channel.send(message.author.username + '\'s Voice: ' + voice)
    })
  }
}