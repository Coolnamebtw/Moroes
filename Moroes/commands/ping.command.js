module.exports = {
    name: 'ping',
    description: 'A very basic command to verify bot responsiveness.',
    args: false,
    minArgs: 0,
    usage: '',
    execute(msg, args) {
        msg.channel.send("pong!");
    }
};