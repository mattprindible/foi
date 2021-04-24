require('dotenv').config();
const Airtable = require('airtable');

let base = new Airtable({ apiKey: 'keygfaRWSJgUgmcUz' }).base('appi9lQAVFMGTbT8J');

module.exports = () => {
    return new Promise((resolve, reject) => {
        const allData = [];
        base('Dump')
            .select({ view: 'All' })
            .eachPage(
                function page(records, fetchNextPage) {
                    records.forEach((record) => {
                        allData.push({
                            "id" : record._rawJson.id, ...record._rawJson.fields
                        });
                    });
                    fetchNextPage();
                },
                function done(err) {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(allData);
                    }
                }
            );
    });
};