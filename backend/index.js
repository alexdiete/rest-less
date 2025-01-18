'use strict'

const Hapi = require('@hapi/hapi')
const Hoek = require('@hapi/hoek')

const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    await server.register(require("@hapi/vision"));

    server.views({
        engines: {
            html: require('handlebars')
        },
        relativeTo: __dirname,
        path: 'templates',
        partialsPath: 'templates/partials'
    });

    server.route([{
        method: 'GET',
        path: '/headers',
        handler: (request, h) => {
            return h.view('partials/headers')
        }
    }, {
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return { 'status': 'OK' };
        }
    }]);

    await server.start();
    console.log('Server started on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
