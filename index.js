const { Client, GatewayIntentBits, Guild } = require('discord.js')
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers] })
const { MENTORES, ALUMNOS, CONSULTAS, getAlumnos, isConsulta, whoAreYou, nickName, mentorName, sinRegistrar } = require('./database')

client.on('ready', () => {
  console.log(`Bot is ready as ${client.user.tag}`);
  try {
    getAlumnos()
    console.log('Alumnos cargados correctamente');
  } catch (error) {
    console.log('Error al cargar alumnos');
    console.log(error);
  }
})

client.on('messageCreate', async message => {
  if (message.system) {
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

  if (message.content.includes('!borrar')) {
    // Obtener el canal del mensaje

    try {
      // Obtener los últimos 10 mensajes del canal
      const messages = await channel.messages.fetch({ limit: 100 });

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

  /* if (message.content.includes('!verificar')) {
    if (whoAreYou(message.author.tag).includes('Equipo Académico')) {
      console.log('podes verificar a los alumnos');

      const guild = message.guild;

      // Iterar sobre todos los miembros del servidor
      guild.members.cache.forEach(member => {
        if (member.user.tag.includes("Mart-1#0642")) {
          return
        }
        let discordRoles = whoAreYou(member.user.tag)
        discordRoles.forEach(role => {
          let roleA = member.guild.roles.cache.find(roleF => roleF.name == role)
          member.roles.add(roleA)
          switch (role) {
            case 'Equipo Académico':
              channel.send(`Un nuevo mentor se ha sumado al cohorte!`);
              member.setNickname(mentorName(member.user.tag))
              break;
            case 'Alumno cohort 48':
              member.setNickname(nickName(member.user.tag))
              channel.send(`Bienvenido al curso ${member.nickname}`);
              break;
            case 'Sin registrar':
              member.setNickname(sinRegistrar(member.user.tag))
              channel.send(`Bienvenido al curso ${member.nickname}`);
              break;
            default:
              break;
          }
        })
        message.reply('Usuarios verificados!')
      }
    } else {
      console.log('no tenes permisos para esto');
    }
    return
  } */

  if (message.content.includes('mensaje super secreto, dificil e imposible de saber!')) {
    message.reply('Encontraste el codigo super secreto, dificil e imposible de saber. Lastima que no hallas ganado nada por ello... xD')
    return
  }

  if (message.content === '!seeAll') {
    // Código para manejar el comando '!seeAll'
    message.guild.members.fetch().then(fetchedMembers => {
      message.channel.send(`Total members: ${fetchedMembers.size}`);
      let memberString = '';
      fetchedMembers.forEach(member => {
        let roleString = member.roles.cache.map(role => role.name).join(', ');
        memberString += `${member.user.tag} - Roles: ${roleString}\n`;
        if (memberString.length >= 1900) {
          message.channel.send(memberString);
          memberString = '';
        }
      });
      if (memberString.length > 0) {
        message.channel.send(memberString);
      }
    });
    return; // Se detiene aquí si el comando es '!seeAll'
  }

  /*   if (message.content === '!seeAll') {
      // Verificar si el mensaje proviene de un canal de texto y no es enviado por el bot mismo
      console.log('see all');
      console.log(message.channel.type === 'text');
      console.log(message.channel.type);
      console.log(!message.author.bot);
      if (message.channel.type === 'text' && !message.author.bot) {
        console.log('texto y no bot');
        try {
          // Obtener el servidor actual
          const server = message.guild;
  
          // Obtener todos los miembros del servidor
          await server.members.fetch();
  
          // Obtener todos los miembros del servidor (incluidos los miembros offline)
          const members = server.members.cache;
  
          let memberList = '';
  
          // Iterar a través de la colección de miembros
          members.forEach(member => {
            memberList += `Nombre: ${member.user.username}, ID: ${member.user.id}\n`;
          });
  
          // Enviar la lista de miembros como mensaje directo al usuario que envió el comando
          message.author.send(`Lista de miembros:\n\n${memberList}`)
            .then(() => {
              console.log('Lista de miembros enviada al usuario');
            })
            .catch(error => {
              console.error('Error al enviar la lista de miembros:', error);
            });
        } catch (error) {
          console.error('Error al obtener los miembros del servidor:', error);
        }
      }
      return
    } */

  if (message.content.toLowerCase().includes('atrás abajo adelante piña')) {
    // Código para manejar el comando del movimiento especial de Ryu
    message.channel.send('Ryu: "HADOUKEN!"\nhttps://media.giphy.com/media/A1rZwNM9QVfos/giphy.gif');
    return; // Se detiene aquí si el mensaje incluye 'atrás abajo adelante piña'
  }

  if (message.content.includes('!verificar')) {
    if (whoAreYou(message.author.tag).includes('Equipo Académico')) {
      console.log('Podes verificar');
      const guild = message.guild

      await guild.members.fetch();

      let memberList = '';

      guild.members.cache.forEach(member => {

        memberList += `Nombre: ${member.user.username}, ID: ${member.user.id}\n`;

        if (member.user.tag.includes("Mart-1#0642")) {
          console.log('No cambiar el nombre del bot!');
          return
        }

        if (member.id === member.guild.ownerID) {
          // El miembro es el propietario del servidor
          console.log('No cambiar el nombre del propietario del servidor!');
          return
        }

        let discordRoles = whoAreYou(member.user.tag)
        discordRoles.forEach(role => {
          let roleA = member.guild.roles.cache.find(roleF => roleF.name == role)
          member.roles.add(roleA)
          switch (role) {
            case 'Equipo Académico':
              member.setNickname(mentorName(member.user.tag))
              channel.send(`Se há renombrado a ${member.nickname}`);
              break;
            case 'Alumno cohort 48':
              member.setNickname(nickName(member.user.tag))
              channel.send(`Se há renombrado a ${member.nickname}`);
              break;
            case 'Sin registrar':
              member.setNickname(sinRegistrar(member.user.tag))
              channel.send(`Se há renombrado a ${member.nickname}`);
              member.send('Por favor revisar la situacion personal con los mentores. No tenes roles asignados en el servidor aun!')
              break;
            default:
              break;
          }
        })

        console.log('Cambiar nombre de ' + member.user.tag);
      })

      message.reply(`Lista de miembros:\n\n${memberList}`)
        .then(() => {
          console.log('Lista de miembros enviada al usuario');
        })
        .catch(error => {
          console.error('Error al enviar la lista de miembros:', error);
        });


    } else {
      console.log('No podes verificar');
      channel.send('Tú no puedes realizar esta acción! XD')
    }
    return
  }

  /* if (message.content === '!verificame') {
    try {
      let discordRoles = whoAreYou(message.author.tag)
      discordRoles.forEach(role => {
        let roleA = message.member.guild.roles.cache.find(roleF => roleF.name == role)
        message.member.roles.add(roleA)
        switch (role) {
          case 'Equipo Académico':
            message.member.setNickname(mentorName(message.author.tag))
            channel.send(`Se há renombrado a ${message.member.nickname}`);
            break;
          case 'Alumno cohort 48':
            message.member.members.memberetNickname(nickName(message.author.tag))
            channel.send(`Se há renombrado a ${message.member.nickname}`);
            break;
          case 'Sin registrar':
            message.member.setNickname(sinRegistrar(message.author.tag))
            channel.send(`Se há renombrado a ${message.member.nickname}`);
            message.author.send('Por favor revisar la situacion personal con los mentores. No tenes roles asignados en el servidor aun!')
            break;
        }
      })
    } catch (error) {
      message.reply('No se ha podido verificar!')
      console.log(error);
    }

    return

  } */

  if (message.content === '!verificame') {
    try {
        // Obtiene los roles por su nombre
        const adminRole = message.guild.roles.cache.find(role => role.name === "Administrador");
        const academicTeamRole = message.guild.roles.cache.find(role => role.name === "Equipo Académico");
        const studentRole = message.guild.roles.cache.find(role => role.name === "Alumno cohort 48");
        const unregisteredRole = message.guild.roles.cache.find(role => role.name === "Sin registrar");

        // Usa tu función whoAreYou para determinar los roles del miembro
        const memberRoles = whoAreYou(message.member.user.tag);

        // Elimina los roles antiguos del miembro
        //message.member.roles.remove([adminRole, academicTeamRole, studentRole, unregisteredRole]).catch(err => console.error("Error al eliminar roles antiguos: ", err));

        // Asigna los roles al miembro y cambia su apodo según su rol
        memberRoles.forEach(roleName => {
            if (roleName === 'Administrador') {
                message.member.roles.add(adminRole).catch(err => console.error("Error al agregar el rol de Administrador: ", err));
            } else if (roleName === 'Equipo Académico') {
                message.member.roles.add(academicTeamRole).catch(err => console.error("Error al agregar el rol de Equipo Académico: ", err));
                message.member.setNickname(`Mentor | ${message.member.user.username}`).catch(err => console.error("Error al cambiar el apodo a Mentor: ", err));
            } else if (roleName === 'Alumno cohort 48') {
                message.member.roles.add(studentRole).catch(err => console.error("Error al agregar el rol de Alumno: ", err));
                message.member.setNickname(`Alumno | ${message.member.user.username}`).catch(err => console.error("Error al cambiar el apodo a Alumno: ", err));
            } else if (roleName === 'Sin registrar') {
                message.member.roles.add(unregisteredRole).catch(err => console.error("Error al agregar el rol de Sin registrar: ", err));
                message.member.setNickname(`NR | ${message.member.user.username}`).catch(err => console.error("Error al cambiar el apodo a NR: ", err));
            }
        });
    } catch (error) {
        console.error(`Error general al verificar al miembro: ${error}`);
    }
}


  /* if (!message.author.tag.includes('#0642')) { */
  if (!message.author.bot) {
    /* message.reply(message.channel.name)
    message.reply('Recorda mencionar a @equipo-academico para que resuelvan tu consulta') */
    // Verificar si el mensaje contiene menciones a usuarios
    if (message.mentions.users.size > 0 && channel.name == 'consultas') {
      console.log('El mensaje menciona a usuarios.');
      let nombres = message.mentions.users.map(user => user.nickName)
      message.reply('Menciones: ' + nombres)
    }

    if (channel.name != 'consultas' && isConsulta(message.content)) {
      message.reply(`Recorda que para hacer consultas debes hacerlo en el canal ${consultasChannel.toString()}`)
      return
    }

    if (channel.name == 'consultas' && message.mentions.roles.size == 0 && isConsulta(message.content)) {
      let roleMentor = message.guild.roles.cache.find(r => r.name === 'Equipo Académico')
      let roleAlumno = message.guild.roles.cache.find(r => r.name === 'Alumno cohort 48')
      message.reply(`No mencionaste a nadie en este mensaje, recorda llamar a los ${roleMentor.toString()} o a los ${roleAlumno.toString()}`)
      return
    }
  }
});

client.on('guildMemberAdd', member => {
  console.log(`${member.user.tag} se ha unido al servidor!`);
  // Enviar mensaje de bienvenida al canal general del servidor
  const channel = member.guild.channels.cache.find(channel => channel.name === 'general');
  if (!channel) return console.error(`El canal "general" no se encontró en ${member.guild.name}.`);
  channel.send(`Ola ke ase ${member.user.tag}`);

  let discordRoles = whoAreYou(member.user.tag)
  discordRoles.forEach(role => {
    let roleA = member.guild.roles.cache.find(roleF => roleF.name == role)
    member.roles.add(roleA)
    switch (role) {
      case 'Equipo Académico':
        channel.send(`Un nuevo mentor se ha sumado al cohorte!`);
        member.setNickname(mentorName(member.user.tag))
        /* member.setNickname(nickName('Mentor - ' + member.user.tag)) */
        break;
      case 'Alumno cohort 48':
        member.setNickname(nickName(member.user.tag))
        channel.send(`Bienvenido al curso ${member.nickname}`);
        break;
      case 'Sin registrar':
        member.setNickname(sinRegistrar(member.user.tag))
        channel.send(`Bienvenido al curso ${member.nickname}`);
        break;
      default:
        break;
    }
  })
});

function asignRoles() {

}

const { token } = require('./config.json')

client.login(token)