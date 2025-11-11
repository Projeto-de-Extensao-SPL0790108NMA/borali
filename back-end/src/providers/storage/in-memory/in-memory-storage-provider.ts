import { StorageProvider } from '../storage-provider'

export class InMemoryStorageProvider implements StorageProvider {
  public files: { key: string; content: Buffer }[] = []

  async upload(file: Buffer, fileName: string, folder = ''): Promise<string> {
    const key = folder ? `${folder}/${fileName}` : fileName
    this.files.push({ key, content: file })
    return `in-memory://${key}`
  }
}
