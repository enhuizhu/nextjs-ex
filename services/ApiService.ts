import { HttpService } from './HttpService';

export class ApiService {
  static getAllProperties() {
    return HttpService.get(this.getPath('properties'));
  }
  
  static getPath(path: string): string {
    return `/api/${path}`;
  } 
}
