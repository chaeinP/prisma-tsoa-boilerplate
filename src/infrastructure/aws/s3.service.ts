import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { provideSingleton } from '../../ioc/provide-singleton';

@provideSingleton(S3Service)
export class S3Service {
  s3Client: S3Client;
  constructor() {
    this.s3Client = new S3Client({
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
      region: process.env.AWS_S3_REGION!,
      ...(process.env.NODE_ENV !== 'prod' && { endpoint: 'http://127.0.0.1:4567' }),
    });
  }

  async uploadImage({ teamId, id, body, mimetype }: { teamId: string; id: number; body: Buffer; mimetype: string }) {
    const bucket = process.env.AWS_S3_BUCKET!;
    const key = `slidtodo/${teamId}_${id}_${Date.now()}.${mimetype.split('/')[1]}`;
    const url =
      process.env.NODE_ENV === 'prod'
        ? `https://${bucket}.s3.ap-northeast-2.amazonaws.com/${key}`
        : `http://localhost:4567/${bucket}/${key}`;

    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: body,
      }),
    );

    return url;
  }
}
