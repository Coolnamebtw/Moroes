// TODO: Add validation for possible 3rd arg, some realms come with spaces or more than 2 words....
// TODO: Add command so server owner or anyone with 'manage channel' permission can set a default realm.

module.exports = {
    name: 'main',
    description: 'Binds your main character to your Discord account.',
    args: true,
    minArgs: 2,
    usage: '!main <name> <realm>',
    execute(msg, args) {
        msg.channel.send(`Adding ${args[0]}-${args[1]} to ${msg.author}`);
    }
};