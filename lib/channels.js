"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("@feathersjs/transport-commons");
function default_1(app) {
    if (typeof app.channel !== 'function') {
        // If no real-time functionality has been configured just return
        return;
    }
    app.on('connection', (connection) => {
        // On a new real-time connection, add it to the anonymous channel
        app.channel('anonymous').join(connection);
    });
    app.on('login', (authResult, { connection }) => {
        if (connection) {
            app.channel('anonymous').leave(connection);
            app.channel('authenticated').join(connection);
        }
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    app.publish((data, hook) => {
        console.log('Publishing all events to all authenticated users. See `channels.js` and https://docs.feathersjs.com/api/channels.html for more information.'); // eslint-disable-line
        return app.channel('authenticated');
    });
}
exports.default = default_1;
