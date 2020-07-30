require("dotenv").config();
const EmeniClient = require('./constructs/EmeniClient.js');
const Discord = require("discord.js");
const client = new EmeniClient;
const fs = require('fs');

client.commands = new Discord.Collection();
const commandPlugins = fs.readdirSync('./commands').filter(file => file.endsWith('.command.js'));
let reply = `I've been unable to complete your command!`;
let guilds;

for(const plugin of commandPlugins) {
    const command = require(`./commands/${plugin}`);
    client.commands.set(command.name, command);
    client.console.log(`found command package ${command.name}, adding.`);
}

// channelCreate
/* Emitted whenever a channel is created.
PARAMETER   TYPE        DESCRIPTION
channel     Channel     The channel that was created */
client.on('channelCreate', function(channel) {

});

// channelDelete
/* Emitted whenever a channel is deleted.
PARAMETER   TYPE        DESCRIPTION
channel     Channel     The channel that was deleted */
client.on('channelDelete', function(channel) {
    
});

// channelPinsUpdate
/* Emitted whenever the pins of a channel are updated, very limited in scope due to the nature of WebSocket. \
PARAMETER   TYPE        DESCRIPTION
channel     Channel     The channel that the pins update ocurred in.
time        Date        The time of the pins update */
client.on('channelPinsUpdate', function(channel, time) {

});

// clientUserGuildSettingsUpdate
/* Emitted whenever the client user's settings update.
PARAMETER                   TYPE                        DESCRIPTION
clientUserGuildSettings     ClientUserGuildSettings     The new client user guild settings */
client.on('clientUserGuildSettingsUpdate', function (clientUserGuildSettings) {

});

// clientUserSettingsUpdate
/* Emitted whenever the client user's settings update.
PARAMETER                   TYPE                        DESCRIPTION
clientUserSettings     ClientUserSettings     The new client user guild settings */
client.on('clientUserSettingsUpdate', function (clientUserSettings) {

});

// debug
/* Emitted for general debugging information.
PARAMETER   TYPE        DESCRIPTION
info        string      The debug information */
client.on('debug', function(info) {

});

// disconnect
/* Emitted when the client's WebSocket disconnects and will no longer attempt to reconnect.
PARAMETER   TYPE        DESCRIPTION
Event       CloseEvent  The WebSocket close event */
client.on('disconnect', function(event) {

});

// emojiCreate  
/* Emitted whenever a custom emoji is created in a guild.
PARAMETER   TYPE        DESCRIPTION
emoji       Emoji       The emoji that was created */
client.on('emojiCreate', function(emoji) {

});

// emojiDelete  
/* Emitted whenever a custom emoji is deleted in a guild.
PARAMETER   TYPE        DESCRIPTION
emoji       Emoji       The emoji that was deleted */
client.on('emojiDelete', function(emoji) {

});

// emojiUpdate 
/* Emitted whenever a custom emoji is updated in a guild.
PARAMETER   TYPE        DESCRIPTION
oldEmoji    Emoji       The old emoji
newEmoji    Emoji       The new emoji */
client.on('emojiUpdate', function(oldEmoji, newEmoji) {

});

// error
/* Emitted whenever the client's WebSocket encounters a connection error.
PARAMETER    TYPE     DESCRIPTION
error        Error    The encountered error    */
client.on("error", function(error){

});

// guildBanAdd
/* Emitted whenever a member is banned from a guild.
PARAMETER    TYPE          DESCRIPTION
guild        Guild         The guild that the ban occurred in
user         User          The user that was banned    */
client.on("guildBanAdd", function(guild, user){

});

// guildBanRemove
/* Emitted whenever a member is unbanned from a guild.
PARAMETER    TYPE         DESCRIPTION
guild        Guild        The guild that the unban occurred in
user         User         The user that was unbanned    */
client.on("guildBanRemove", function(guild, user){

});

// guildCreate
/* Emitted whenever the client joins a guild.
PARAMETER    TYPE         DESCRIPTION
guild        Guild        The created guild    */
client.on("guildCreate", function(guild){

});

// guildDelete
/* Emitted whenever a guild is deleted/left.
PARAMETER    TYPE         DESCRIPTION
guild        Guild        The guild that was deleted    */
client.on("guildDelete", function(guild){

});

// guildMemberAdd
/* Emitted whenever a user joins a guild.
PARAMETER     TYPE               DESCRIPTION
member        GuildMember        The member that has joined a guild    */
client.on("guildMemberAdd", function(member){

});

// guildMemberAvailable
/* Emitted whenever a member becomes available in a large guild.
PARAMETER     TYPE               DESCRIPTION
member        GuildMember        The member that became available    */
client.on("guildMemberAvailable", function(member){

});

// guildMemberRemove
/* Emitted whenever a member leaves a guild, or is kicked.
PARAMETER     TYPE               DESCRIPTION
member        GuildMember        The member that has left/been kicked from the guild    */
client.on("guildMemberRemove", function(member){

});

// guildMembersChunk
/* Emitted whenever a chunk of guild members is received (all members come from the same guild).
PARAMETER      TYPE                      DESCRIPTION
members        Array<GuildMember>        The members in the chunk
guild          Guild                     The guild related to the member chunk    */
client.on("guildMembersChunk", function(members, guild){

});

// guildMemberSpeaking
/* Emitted once a guild member starts/stops speaking.
PARAMETER     TYPE                DESCRIPTION
member        GuildMember         The member that started/stopped speaking
speaking      boolean             Whether or not the member is speaking    */
client.on("guildMemberSpeaking", function(member, speaking){

});
// guildMemberUpdate
/* Emitted whenever a guild member changes - i.e. new role, removed role, nickname.
PARAMETER    TYPE               DESCRIPTION
oldMember    GuildMember        The member before the update
newMember    GuildMember        The member after the update    */
client.on("guildMemberUpdate", function(oldMember, newMember){

});

// guildUnavailable
/* Emitted whenever a guild becomes unavailable, likely due to a server outage.
PARAMETER    TYPE          DESCRIPTION
guild        Guild         The guild that has become unavailable    */
client.on("guildUnavailable", function(guild){

});

// guildUpdate
/* Emitted whenever a guild is updated - e.g. name change.
PARAMETER     TYPE      DESCRIPTION
oldGuild      Guild     The guild before the update
newGuild      Guild     The guild after the update    */
client.on("guildUpdate", function(oldGuild, newGuild){

});

// message
/* Emitted whenever a message is created.
PARAMETER      TYPE           DESCRIPTION
message        Message        The created message    */
client.on('message', msg => {
    if(!msg.content.startsWith("!") || msg.author.bot) return;
    const args = msg.content.slice(1).trim().split(/ +/);

    const cmdName = args.shift().toLowerCase();
    client.console.debug(`${cmdName} ${args}`)

    if(!client.commands.has(cmdName)) return;
    const cmd = client.commands.get(cmdName);

    if(cmd.args && args.length < cmd.minArgs) {
        let reply = `I've been unable to complete your command!`;
        if(cmd.usage) { 
            reply +=  `\nThe proper usage would be: \`${cmd.usage}\``;
        }
        return msg.author.send(reply);
    }

    try {
        cmd.execute(msg, args);
    } catch(Error) {
        reply += `\nAn internal error ocurred.`
        client.console.error(`something went wrong with ${cmd} :: ${Error}`);
        return msg.author.send(reply);
    }
    
});

// messageDelete
/* Emitted whenever a message is deleted.
PARAMETER      TYPE           DESCRIPTION
message        Message        The deleted message    */
client.on("messageDelete", function(message){

});

// messageDeleteBulk
/* Emitted whenever messages are deleted in bulk.
PARAMETER    TYPE                              DESCRIPTION
messages     Collection<Snowflake, Message>    The deleted messages, mapped by their ID    */
client.on("messageDeleteBulk", function(messages){

});

// messageReactionAdd
/* Emitted whenever a reaction is added to a message.
PARAMETER              TYPE                   DESCRIPTION
messageReaction        MessageReaction        The reaction object
user                   User                   The user that applied the emoji or reaction emoji     */
client.on("messageReactionAdd", function(messageReaction, user){
    console.log(messageReaction.message.embeds.footer);
});

// messageReactionRemove
/* Emitted whenever a reaction is removed from a message.
PARAMETER              TYPE                   DESCRIPTION
messageReaction        MessageReaction        The reaction object
user                   User                   The user that removed the emoji or reaction emoji     */
client.on("messageReactionRemove", function(messageReaction, user){

});

// messageReactionRemoveAll
/* Emitted whenever all reactions are removed from a message.
PARAMETER          TYPE           DESCRIPTION
message            Message        The message the reactions were removed from    */
client.on("messageReactionRemoveAll", function(message){

});

// messageUpdate
/* Emitted whenever a message is updated - e.g. embed or content change.
PARAMETER     TYPE           DESCRIPTION
oldMessage    Message        The message before the update
newMessage    Message        The message after the update    */
client.on("messageUpdate", function(oldMessage, newMessage){

});

// presenceUpdate
/* Emitted whenever a guild member's presence changes, or they change one of their details.
PARAMETER    TYPE               DESCRIPTION
oldMember    GuildMember        The member before the presence update
newMember    GuildMember        The member after the presence update    */
client.on("presenceUpdate", function(oldMember, newMember){

});

// TODO: Rotate some messages displaying general stats and hardcodes !help command.
client.once('ready', () => {

});

// reconnecting
/* Emitted whenever the client tries to reconnect to the WebSocket.    */
client.on("reconnecting", function(){

});

// resume
/* Emitted whenever a WebSocket resumes.
PARAMETER    TYPE          DESCRIPTION
replayed     number        The number of events that were replayed    */
client.on("resume", function(replayed){

});

// roleCreate
/* Emitted whenever a role is created.
PARAMETER    TYPE        DESCRIPTION
role         Role        The role that was created    */
client.on("roleCreate", function(role){

});

// roleDelete
/* Emitted whenever a guild role is deleted.
PARAMETER    TYPE        DESCRIPTION
role         Role        The role that was deleted    */
client.on("roleDelete", function(role){

});

// roleUpdate
/* Emitted whenever a guild role is updated.
PARAMETER      TYPE        DESCRIPTION
oldRole        Role        The role before the update
newRole        Role        The role after the update    */
client.on("roleUpdate", function(oldRole, newRole){

});

// typingStart
/* Emitted whenever a user starts typing in a channel.
PARAMETER      TYPE            DESCRIPTION
channel        Channel         The channel the user started typing in
user           User            The user that started typing    */
client.on("typingStart", function(channel, user){

});

// typingStop
/* Emitted whenever a user stops typing in a channel.
PARAMETER       TYPE           DESCRIPTION
channel         Channel        The channel the user stopped typing in
user            User           The user that stopped typing    */
client.on("typingStop", function(channel, user){

});

// userNoteUpdate
/* Emitted whenever a note is updated.
PARAMETER      TYPE          DESCRIPTION
user           User          The user the note belongs to
oldNote        String        The note content before the update
newNote        String        The note content after the update    */
client.on("userNoteUpdate", function(user, oldNote, newNote){

});

// userUpdate
/* Emitted whenever a user's details (e.g. username) are changed.
PARAMETER      TYPE        DESCRIPTION
oldUser        User        The user before the update
newUser        User        The user after the update    */
client.on("userUpdate", function(oldUser, newUser){

});

// voiceStateUpdate
/* Emitted whenever a user changes voice state - e.g. joins/leaves a channel, mutes/unmutes.
PARAMETER    TYPE             DESCRIPTION
oldMember    GuildMember      The member before the voice state update
newMember    GuildMember      The member after the voice state update    */
client.on("voiceStateUpdate", function(oldMember, newMember){

});

// warn
/* Emitted for general warnings. 
PARAMETER    TYPE       DESCRIPTION
info         string     The warning   */
client.on("warn", function(info){

});

client.login(process.env.TOKEN);