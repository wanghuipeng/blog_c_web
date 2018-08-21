var merge = require('webpack-merge')
var devEnv = require('./dev.env')

module.exports = {
    NODE_ENV: '"testing"',
    API_ROOT: '"http://192.168.1.128:1030/fjs/"',
    API_TOKEN: '""'
}