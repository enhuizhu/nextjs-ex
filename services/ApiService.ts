import { HttpService } from './HttpService';

export class ApiService {
  static getAllProperties() {
    return HttpService.get(this.getPath('properties'));
  }

  static addProperty(data) {
    return HttpService.post(this.getPath('properties'), data);
  }
  
  static getPath(path: string): string {
    return `/api/${path}`;
  } 
}
