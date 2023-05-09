const { Client, GatewayIntentBits, Guild } = require('discord.js')
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers] })
const { MENTORES, ALUMNOS, CONSULTAS } = require('./database')

client.on('ready', () => {
  console.log(`Bot is ready as ${client.user.tag}`);
})

client.on('messageCreate',async message => {
  if(message.system){
    return
  }
  console.log(`${message.author.tag} dijo: ${message.content}`);
  if (message.content.includes('!ping')) {
    message.reply('Pong')
    return
  }



  //Borrar mensajes
  const channel = message.channel;
  const consultasChannel = message.guild.channels.cache.find(ch => ch.name === 'consultas')
  /* console.log(channel.name);
  return */
  if (message.content.includes('!borrar')) {
    // Obtener el canal del mensaje

    try {
      // Obtener los últimos 10 mensajes del canal
      const messages = await channel.messages.fetch({ limit: 10 });

      // Borrar los mensajes
      channel.bulkDelete(messages);

      // Enviar un mensaje indicando que se borraron los mensajes
      message.reply(`Se han borrado ${messages.size} mensajes.`);
      return
    } catch (error) {
      console.error('Error al borrar los mensajes:', error);
      message.reply('Ocurrió un error al borrar los mensajes.');
    }
    return
  }
  if (!message.author.tag.includes('#0642')) {
    /* message.reply(message.channel.name)
    message.reply('Recorda mencionar a @equipo-academico para que resuelvan tu consulta') */
    // Verificar si el mensaje contiene menciones a usuarios
    if (message.mentions.users.size > 0 && channel.name == 'consultas') {
      console.log('El mensaje menciona a usuarios.');
      let nombres = message.mentions.users.map(user => user.nickName)
      message.reply('Menciones: ' + nombres)
    }

    let isConsulta = false
    CONSULTAS.forEach(word => {
      if(message.content.includes(word)){
        isConsulta = true
      }
    })

    if(channel.name != 'consultas' && isConsulta){
      message.reply(`Recorda que para hacer consultas debes hacerlo en el canal ${consultasChannel.toString()}`)
      return
    }

    if (message.mentions.roles.size > 0) {
      console.log('El mensaje menciona a un rol dentro del servidor.');
    } else {
      let roleMentor = message.guild.roles.cache.find(r => r.name === 'Mentores')
      let roleAlumno = message.guild.roles.cache.find(r => r.name === 'Alumnos')
      message.reply(`No mencionaste a nadie en este mensaje, recorda llamar a los ${roleMentor.toString()} o a los ${roleAlumno.toString()}`)
    }

    // Verificar si el mensaje contiene menciones a canales
    if (message.mentions.channels.size > 0) {
      console.log('El mensaje menciona a canales.');
      message.reply('Menciones: ' + JSON.stringify(message.mentions.channels.join("/")))
    }
  }

  


});

client.on('guildMemberAdd', member => {
  console.log(`${member.user.tag} se ha unido al servidor!`);
  // Enviar mensaje de bienvenida al canal general del servidor

  const channel = member.guild.channels.cache.find(channel => channel.name === 'general');
  if (!channel) return console.error(`El canal "general" no se encontró en ${member.guild.name}.`);
  channel.send(`Ola ke ase ${member.user.tag}`);


  if (member.user.tag.includes('#5872')) {
    console.log('Entro el colo!');
    channel.send(`Le Entró al Colo`);
    member.setNickname('El Colo')
  }
  if (member.user.tag.includes('#0467')) {
    console.log('Entro el Ema');
    channel.send(`Entro el Ema`);
    member.setNickname('Emmanuel [Mentor]')
  }
  if (member.user.tag.includes('#8481')) {
    console.log('Entro el Guille');
    channel.send(`Entro el Guille`);
    member.setNickname('El Guille')
  }
  if (member.user.tag.includes('#4880')) {
    console.log('Ingreso la Flor');
    channel.send(`Ingreso la Flor`);
    member.setNickname('Floricienta [Mentor]')
  }
  let isMentor = false
  let isAlumno = false
  MENTORES.forEach(tag => {
    if(member.user.tag.includes(tag)){
      isMentor = true
    }
  })

  ALUMNOS.forEach(tag => {
    if(member.user.tag.includes(tag)){
      isAlumno = true
    }
  })
  
  let role = null
  let roleString = 'Anonimo'
  if(isMentor){
    roleString = 'Mentores'
    channel.send(`Un nuevo Crack ha aparecido para salvar las papas.`);
  } else if(isAlumno) {
    roleString = 'Alumnos'
    channel.send(`Mensaje bonito de bienvenida para el alumno!`);
  }
  role = member.guild.roles.cache.find(role => role.name == roleString)
  member.roles.add(role)
  if(roleString == 'Anonimo'){
    channel.send(`Al parecer sos un indocumentado. Si no arreglas tu situacion seras deportado!!!`);
    member.setNickname(member.user.username + ' - Indocumentado')
  }
});

const { token } = require('./config.json')

client.login(token)