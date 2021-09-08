// import { LambdaExporter } from './apis/index';
import type { AWS } from '@serverless/typescript';
import { LambdaExporter } from './apis';

const serverlessConfiguration: AWS = {
  service: 'microbreaded',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
    // 'serverless-layers': {
    //   dependenciesPath: './package.json'
    // }
  },
  package: {
    individually: true,
  },
  plugins: [
    'serverless-webpack',
    'serverless-offline',
    'serverless-layers',
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
    lambdaHashingVersion: '20201221',
  },
  functions: {
    ...LambdaExporter.getServerlessFunctions()
  },
};

module.exports = serverlessConfiguration;
