import * as dotenv from 'dotenv';
import * as envVar from 'env-var';

dotenv.config();

export const env = {
  appName: envVar.get('APP_NAME').required().asString(),
  jwtSecret: envVar.get('JWT_SECRET').required().asString(),
  expiresIn: envVar.get('JWT_DURATION').asString() ?? '5 year',
  databaseUrl: envVar.get('DATABASE_URL').required().asString(),
  port: envVar.get('PORT').asInt() ?? 3000,
  environment: envVar.get('NODE_ENV').required().asString(),
  awsAccessKey: envVar.get('AWS_ACCESS_KEY').required().asString(),
  awsSecretKey: envVar.get('AWS_SECRET_KEY').required().asString(),
  s3BucketName: envVar.get('S3_BUCKET_NAME').required().asString(),
  awsRegion: envVar.get('AWS_REGION').required().asString(),
  cloudinary: {
    cloudName: envVar.get('CLOUDINARY_CLOUD_NAME').required().asString(),
    apiKey: envVar.get('CLOUDINARY_API_KEY').required().asString(),
    apiSecret: envVar.get('CLOUDINARY_API_SECRET').required().asString(),
  },
};
