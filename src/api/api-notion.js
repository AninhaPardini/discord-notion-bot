const { Client } = require('@notionhq/client');
const { time } = require('discord.js');
const moment = require('moment');
const dotenv = require('dotenv');
const propsTreatment = require('./propsTreatment');
dotenv.config();

let lastChecked = new Date();
lastChecked.setMinutes(lastChecked.getMinutes() - 1);

class NotionClient extends Client {
    constructor() {
        super({
            auth: process.env.NOTION_API_KEY,
        });
    }

    async getDatabase() {
        try {
            console.log('📝 Obtendo a base de dados...');
            const databaseResponse = await this.databases.query({
                database_id: process.env.DATABASE_ID,
                filter: {
                    and: [
                        {
                            timestamp: 'last_edited_time',
                            last_edited_time: {
                                after: lastChecked,
                            },
                        },
                    ],
                },
            });
            lastChecked = new Date();
            // lastChecked.setMinutes(lastChecked.getMinutes() - 1);
            moment(lastChecked).format('YYYY-MM-DD HH:mm:ss');
            time(lastChecked, 'R');
            console.log('Última verificação:', lastChecked);
            const response = databaseResponse.results;
            // console.log(databaseResponse);
            console.log('Dados obtidos:');
            console.log(databaseResponse.results);
            return response;
        }
        catch (error) {
            console.error('Erro ao obter a base de dados:', error.message);
            return [];
        }
    }

    async getDatabaseObjects(page) {
        const properties = page.properties;

        console.log('-------------------------------');
        console.log('Propriedades:');
        console.log(properties);

        const name = properties.Name.title[0].plain_text;
        console.log(name);
        propsTreatment(properties);

        const url = page.url;
        const lastEdited = new Date(page.last_edited_time).toLocaleString();
        const isStatusList = properties.Status;
        const isMoreStatus = isStatusList.status;
        let status = '';

        const propieties = {
            name: `${name}`,
            status: isStatusList,
            last_edit: {
                name: '**Última edição:**',
                emoji: '<:edit:1196275514642546698>',
                item: `${lastEdited}`,
            },
            url: {
                name: '**Link:**',
                emoji: '<:link:1196275565464932372>',
                item: `${url}`,
            },
        };


        if (isStatusList.type === 'select') {
            return status = isStatusList.select.name;
        }
        console.log(status);
    }

    // async formatPageMessage(page) {
    //     const properties = page.properties;

    //     const name = properties.Nome.title[0].plain_text;
    //     // console.log(name);
    //     const url = page.url;
    //     // const tags = properties.Tags.multi_select.map(tag => tag.name);
    //     const status = properties.Status.status.name;
    //     const lastEdited = new Date(page.last_edited_time).toLocaleString();
    //     switch (status) {
    //     case 'Não iniciado':
    //         return {
    //             name: `${name}`,
    //             status: {
    //                 emoji: '<:naoiniciado:1196271537209217024>',
    //                 name: '**Status:**',
    //                 item: `${status}`,
    //             },
    //             last_edit: {
    //                 name: '**Última edição:**',
    //                 emoji: '<:edit:1196275514642546698>',
    //                 item: `${lastEdited}`,
    //             },
    //             url: {
    //                 name: '**Link:**',
    //                 emoji: '<:link:1196275565464932372>',
    //                 item: `${url}`,
    //             },
    //         };
    //         // **Tags:** ${tags.join(', ')}
    //     case 'Em progresso':
    //         return {
    //             name: `${name}`,
    //             status: {
    //                 emoji: '<:emandamento:1196271538928881685>',
    //                 name: '**Status:**',
    //                 item: `${status}`,
    //             },
    //             last_edit: {
    //                 name: '**Última edição:**',
    //                 emoji: '<:edit:1196275514642546698>',
    //                 item: `${lastEdited}`,
    //             },
    //             url: {
    //                 name: '**Link:**',
    //                 emoji: '<:link:1196275565464932372>',
    //                 item: `${url}`,
    //             },
    //         };
    //     case 'Concluído':
    //         return {
    //             name: `${name}`,
    //             status: {
    //                 emoji: '<:concluido:1196271534331924540>',
    //                 name: '**Status:**',
    //                 item: `${status}`,
    //             },
    //             last_edit: {
    //                 name: '**Última edição:**',
    //                 emoji: '<:edit:1196275514642546698>',
    //                 item: `${lastEdited}`,
    //             },
    //             url: {
    //                 name: '**Link:**',
    //                 emoji: '<:link:1196275565464932372>',
    //                 item: `${url}`,
    //             },
    //         };
    //     default:
    //         return {
    //             name: `${name}`,
    //             status: {
    //                 emoji: '',
    //                 name: '**Status:**',
    //                 item: `${status}`,
    //             },
    //             last_edit: {
    //                 name: '**Última edição:**',
    //                 emoji: '<:edit:1196275514642546698>',
    //                 item: `${lastEdited}`,
    //             },
    //             url: {
    //                 name: '**Link:**',
    //                 emoji: '<:link:1196275565464932372>',
    //                 item: `${url}`,
    //             },
    //         };
    //     }
    // }
}

module.exports = NotionClient;