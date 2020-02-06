module.exports = {
    devServer: {
        proxy: {
            "/api": {
                target: "http://127.0.0.1:5500",
                pathRewrite: {'^/api': ''},
                changeOrigin: true,
                secure: false
            }
        }
    },

    lintOnSave: false
}