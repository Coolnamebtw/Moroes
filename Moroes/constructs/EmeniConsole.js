const { Console } = require("console");
const moment = require("moment");
const { inspect } = require("util");


class EmeniConsole extends Console {
    constructor(client) {
        super(process.stdout, process.stderr);

        Object.defineProperty(this, "client", {value: client });
        this.template = "DD-MM-YYYY HH:mm:ss";
    }

    get timestamp() {
        return moment().format(this.template);
    }

    write(data, type = "log") {
        type = type.toLowerCase();
        data = EmeniConsole.parse(data);
        const { time, message } = EmeniConsole.COLOR[type];
        const timestamp = time(`[${this.timestamp}]:`);
        super[EmeniConsole.TYPES[type] || "log"](data.split("\n").map(str => `${timestamp} ${message(str)}`).join("\n"));
    }

    log(...data) {
        this.write(data, "log");
    }

    warn(...data) {
        this.write(data, "warn");
    }

    error(...data) {
        this.write(data, "error");
    }

    debug(...data) {
            this.write(data, "debug");
    }

    static parse(data) {
        if(Array.isArray(data)) return data.map(EmeniConsole.parse).join("\n");
        if(typeof data === "object" && data !== null) return inspect(data, { depth: 0, colors: true});
        if(data && data.constructor === Error) return data.stack || data.message || String(data);
        return String(data);
    }
}

EmeniConsole.TYPES = {
    debug: "log",
    error: "error",
    log: "log",
    warn: "warn"
};

EmeniConsole.COLOR = { 
    debug: {
        time: (str) => `\u001b[45m${str}\u001b[49m`,
        message: (str) => `\u001b[m${str}\u001b[m` 
    },
    error: { 
        time: (str) => `\u001b[41m${str}\u001b[49m`,
        message: (str) => `\u001b[m${str}\u001b[m` 
    },
    log: {
        time: (str) => `\u001b[44m${str}\u001b[49m`,
        message: (str) => `\u001b[m${str}\u001b[m`
    },
    warn: { 
        time: (str) => `\u001b[103;30m${str}\u001b[49;39m`,
        message: (str) => `\u001b[m${str}\u001b[m`
    }
};

module.exports = EmeniConsole;