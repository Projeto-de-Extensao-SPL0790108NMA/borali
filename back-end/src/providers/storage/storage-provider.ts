export interface StorageProvider {
  upload(file: Buffer, fileName: string, folder?: string): Promise<string>;
}
