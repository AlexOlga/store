const path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        static: { directory: path.join(__dirname, 'dist') },
        historyApiFallback: true,
        allowedHosts: 'auto',
        compress: true,
        open: true,
        hot: false,
        port: 8080,
    },
};
