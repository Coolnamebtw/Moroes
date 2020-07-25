module.exports = {
    name: 'bind',
    description: 'Bind bot notifications to specific channels',
    args: true,
    minArgs: 1,
    usage: '',
    execute(msg, args) {
        if(msg.member.hasPermission('MANAGE_GUILD')) {
            msg.channel.send(`Binding \`${args[0]}\` messages to ${args[1]}.`)
        } else {
            msg.channel.send('This command would fail, you have depression!');
        }
    }
};