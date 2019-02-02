module.exports = {
    devServer: {
        proxy: {
            '^/api': {
                target: `http://${process.env.VUE_APP_API_HOST}:${process.env.VUE_APP_API_PORT}`,
                changeOrigin: true
            },
            '^/public': {
                target: `http://${process.env.VUE_APP_API_HOST}:${process.env.VUE_APP_API_PORT}`,
                changeOrigin: true
            }
        }
    }
}