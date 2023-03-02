const { createAudioPlayer, createAudioResource, joinVoiceChannel } = require('@discordjs/voice')
const { createReadStream } = require('fs')
const say = require('say')

module.exports = {
  name: 'say',
  aliases: ['s'],
  requirements: ['VOICE CHANNEL'],

  run: async (bot, message, args) => {
    const vc = message.member.voice.channel
    if (!vc) message.channel.send('You are not in a voice channel')

    const connection = joinVoiceChannel({
      channelId: vc.id,
      guildId: message.channel.guildId,
      adapterCreator: message.guild.voiceAdapterCreator,
    })

    const player = createAudioPlayer()
    const voice = bot.voiceDB.get(message.author.id)

    say.export(args.join(' '), voice || undefined, 1, 'tts.mp3', err => {
      const resource = createAudioResource(createReadStream('tts.mp3'))
      connection.subscribe(player)
      player.play(resource)
    })
  }
}