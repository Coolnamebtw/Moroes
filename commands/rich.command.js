const Discord = require('discord.js');

module.exports = {
    name: 'raid',
    description: 'The raid module for Moroes.',
    args: true,
    minArgs: 1,
    usage: '!raid [create/delete/accept/decline]',
    execute(msg, args) {

        if(args[0] === "create") {
        token = require('crypto').randomBytes(16).toString('hex').toUpperCase();

        const exampleEmbed = new Discord.MessageEmbed()
            .setColor('#B404AE')
            .setTitle('Ny\'alotha Mythic')
            .setAuthor('Moroes', 'https://moroes.dev/backend/moroes/author.jpeg')
            .setThumbnail('https://moroes.dev/backend/images/nyalotha/raidProfile.png')
            .addFields(
                {name: '**Description**', value: 'We\'ll be clearing M Wrathion tonight'},
                {name: '**Tanks (2)**', value: "- Toragash\n- Medrunk", inline: true},
                {name: '**Healers (4)**', value: "- Arlie\n- Palacor\n- HealerGuy\n- HealerThot", inline: true},
                {name: '**Backup**', value: "Kni", inline: true},
                {name: '**DPS (14)**', value: "Röt | Luscifer |  Degar |  Sede |  Röt |  Luscifer |  Degar |  Sede |  Röt |  Luscifer |  Degar |  Sede |  Luscifer |  Degar" },

            )
            .setImage('https://moroes.dev/backend/images/nyalotha/raidHeader.jpeg')
            .setTimestamp()
            .setFooter(`${token}`)

            const event = msg.channel.send(exampleEmbed);
            event.then(msg => {
                msg.react('✅')
                .then(() => msg.react('❌'))
            })
        }
    }
};