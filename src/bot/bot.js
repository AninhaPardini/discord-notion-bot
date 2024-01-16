// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();

class Bot extends Client {
    constructor() {
        super({ intents: [GatewayIntentBits.Guilds] });
    }

    async init() {
        console.log('🤖 Iniciando o bot...');
        this.once(Events.ClientReady, readyClient => {
            console.log(`✅ Pronto! Estou logado ao ${readyClient.user.tag}`);
        });

        await this.login(process.env.DISCORD_BOT_TOKEN);
    }

    async sendMessage(message) {
        try {
            const channel = this.channels.cache.get(process.env.DISCORD_CHANNEL_ID);
            if (channel) {
                const embed = new EmbedBuilder().setTitle(`✨ Nova atualização em ${message.name}`).setDescription(`${message.status.emoji} ${message.status.item}\n${message.url.emoji} *${message.url.item}*`).setURL(message.url.item).setTimestamp(new Date());

                channel.send({ embeds: [embed] });
            }
            else {
                console.error(`Canal com ID ${channel} não encontrado.`);
            }
        }
        catch (error) {
            console.error('Erro ao enviar mensagem:', error);
        }
    }
}

module.exports = Bot;