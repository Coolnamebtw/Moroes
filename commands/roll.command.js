module.exports = {
    name: 'roll',
    description: 'A basic command to emulate ingame /roll functionality.',
    args: true,
    minArgs: 0,
    usage: '!roll [Number]',
    execute(msg, args) {
        if(args.length === 0){
            args[0] = 100;
        }
        if(!isNaN(args[0])){
            if(args[0] > 0){
                msg.channel.send(`${msg.author} rolled ${Math.floor(Math.random() * args[0]) + 1} (1-${args[0]})`);
            }else{
                msg.channel.send('Please enter a number greater than 0!');
            }
        }else{
            msg.channel.send('Please enter a valid whole number!');
        }
    }
};