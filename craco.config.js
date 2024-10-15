// craco.config.js
module.exports = {
    jest: {
        transform: {
            "^.+\\.[t|j]sx?$": "babel-jest",
            "^.+\\.jsx?$": "babel-jest"
        },
        transformIgnorePatterns: [],
        globals: {
            "babel-jest": {
                useESModules: true
            }
        }
    }
};
