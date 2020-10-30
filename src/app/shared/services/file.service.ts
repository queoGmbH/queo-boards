import {Injectable} from '@angular/core';

@Injectable()
export class FileService {

  private static multiplicator = 1024;
  private static decimals = 2;
  private static units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  constructor() {}

  formatBytes(bytes: number): string {
    const i = Math.floor(Math.log(bytes) / Math.log(FileService.multiplicator));
    return parseFloat((bytes / Math.pow(FileService.multiplicator, i)).toFixed(FileService.decimals)) + ' ' + FileService.units[i];
  }
}
