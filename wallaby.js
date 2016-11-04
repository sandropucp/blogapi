module.exports = function (wallaby) {
    return {
        files: [            
            'server.js',
            'app/**/*.js',
            { pattern: '.env', instrument: false }
        ],

        tests: [
            'tests/**/*Tests.js'
        ],

        env: {
            type: 'node',
        },

        debug: true,
        setup: function (wallaby) {
            console.log('Setup');
            console.log('Current worker id: ' + wallaby.workerId);
            console.log('Current session id: ' + wallaby.sessionId);
            require('dotenv').config(); 
        },
        workers: {
            initial: 1,
            regular: 1,
            recycle: true
        }
    };
};