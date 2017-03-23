import packageJSON from './package.json';
import { resolve } from 'path';

const getAppConfig = (env) => {
  const envVars = [
    'ANALYTICS_WRITE_KEY',
    'CIRCLE_BRANCH',
    'CIRCLE_SHA1',
    'FACEBOOK_ID',
    'GITHUB_ID',
    'GOOGLE_ID',
    'SENTRY_DSN',
    'STRIPE_PUBLISHABLE_KEY',
    'SYNCANO_BASE_DOMAIN',
    'SYNCANO_BILLING_EMAIL',
    'SYNCANO_DEMO_APPS_ACCOUNT_KEY',
    'SYNCANO_SUPPORT_EMAIL',
    'SYNCANO_BASE_URL'
  ];
  const config = {
    ENV: Object.keys(env)[0],
    VERSION: packageJSON.version,
    SYNCANO_BASE_URL: 'https://api.syncano.io'
  };

  envVars.forEach((key) => {
    const envName = `${config.ENV.toUpperCase()}_${key}`;
    const value = process.env[envName] || process.env[key];

    if (value) {
      config[key] = value;
    }
  });

  return config;
};

const getS3Config = (env) => {
  const { CIRCLE_BRANCH } = process.env;

  if (!CIRCLE_BRANCH) {
    throw new Error('"CIRCLE_BRANCH" env variable is required');
  }

  const branch = CIRCLE_BRANCH.toLowerCase();
  const config = {
    'syn4-devel': {
      directory: resolve('dist'),
      s3Options: {
        region: 'us-west-2'
      },
      s3UploadOptions: {
        Bucket: process.env.STAGING_AWS_BUCKET_NAME
      },
      cloudfrontInvalidateOptions: {
        DistributionId: process.env.STAGING_AWS_DISTRIBUTION_ID,
        Items: ['/*']
      }
    },
    'syn4-master': {
      directory: resolve('dist'),
      s3Options: {
        region: 'us-west-2'
      },
      s3UploadOptions: {
        Bucket: process.env.PRODUCTION_AWS_BUCKET_NAME
      },
      cloudfrontInvalidateOptions: {
        DistributionId: process.env.PRODUCTION_AWS_DISTRIBUTION_ID,
        Items: ['/*']
      }
    },
    default: {
      directory: resolve('dist'),
      s3Options: {
        region: 'us-west-2'
      },
      s3UploadOptions: {
        Bucket: process.env.STAGING_AWS_BUCKET_NAME
      },
      basePath: branch
    }
  };

  return config[branch] || config.default;
};

export {
  getAppConfig,
  getS3Config
};
