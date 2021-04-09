const withLess = require('@zeit/next-less');
const withSass = require('@zeit/next-sass');
const webpack = require('webpack');

module.exports = withSass(
  withLess({
    lessLoaderOptions: {
      javascriptEnabled: true,
    },
    env: {
      API_ENDPOINT: process.env.API_ENDPOINT,
      API_KEY: process.env.API_KEY,
    },
    webpack: (config) => {
      config.module.rules.push({
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
      });

      config.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/));

      config.module.rules.push({
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              svgoConfig: {
                plugins: {
                  removeViewBox: false,
                },
              },
            },
          },
        ],
      });

      return config;
    },
  }),
);
