const { Collection, Client } = require('discord.js');
const EmeniConsole = require('./EmeniConsole');


class EmeniClient extends Client {
    constructor(options) {
        super(options);

        this.console = new EmeniConsole(this);
    }
}
module.exports = EmeniClient;