export interface IStorageService {
  uploadFile(file: File, folder?: string): Promise<string>;
  deleteFile(url: string): Promise<boolean>;
}

// Factory to get the configured storage service
export const getStorageService = async (): Promise<IStorageService> => {
  // Currently defaulting to GridFS as requested.
  // In the future, this can be switched based on an environment variable.
  // const storageProvider = process.env.STORAGE_PROVIDER || 'gridfs';
  
  const { GridFSStorageService } = await import('./gridfs');
  return new GridFSStorageService();
  
  /*
  if (storageProvider === 'hostinger') {
    const { HostingerStorageService } = await import('./hostinger');
    return new HostingerStorageService();
  }
  */
};
