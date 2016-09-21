module.exports = function (wallaby) {
    return {
        files: [
            'app.js',
            'app/**/*.js'            
        ],

        tests: [
            'tests/**/*Tests.js'
        ],

        env: {
            type: 'node',            
        },

        debug: true,
        workers: {
            initial: 1,
            regular: 1,
            recycle: true
        }
    };
};