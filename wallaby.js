module.exports = function (wallaby) {
    return {
        files: [
            'app.js',
            'Controllers/*.js',
            'models/*.js',
            'Routes/*.js'            
        ],

        tests: [
            'Tests/*Tests.js'
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