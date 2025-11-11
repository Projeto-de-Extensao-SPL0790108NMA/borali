import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { StorageProvider } from '../storage-provider'
import { env } from '@/env'
import { randomUUID } from 'crypto'
import path from 'path'

export class S3StorageProvider implements StorageProvider {
  private client: S3Client
  private bucket: string

  constructor() {
    this.bucket = env.AWS_S3_BUCKET
    this.client = new S3Client({
      region: env.AWS_REGION,
      credentials: {
        accessKeyId: env.AWS_ACCESS_KEY_ID,
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
      },
    })
  }

  async upload(file: Buffer, fileName: string, folder = ''): Promise<string> {
    const uniqueName = `${randomUUID()}${path.extname(fileName)}`
    const key = folder ? `${folder}/${uniqueName}` : uniqueName

    await this.client.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: file,
        ContentType: this.getContentType(fileName),
      }),
    )

    return `https://${this.bucket}.s3.${env.AWS_REGION}.amazonaws.com/${key}`
  }

  private getContentType(fileName: string): string {
    const ext = path.extname(fileName).toLowerCase()
    switch (ext) {
      case '.jpg':
      case '.jpeg':
        return 'image/jpeg'
      case '.png':
        return 'image/png'
      case '.gif':
        return 'image/gif'
      case '.webp':
        return 'image/webp'
      default:
        return 'application/octet-stream'
    }
  }
}
