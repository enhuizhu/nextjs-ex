import { HttpService } from './HttpService';

export class ApiService {
  static getAllProperties() {
    return HttpService.get(this.getPath('properties'));
  }

  static addProperty(data) {
    return HttpService.post(this.getPath('properties'), data);
  }

  static deleteProperty(id) {
    return HttpService.delete(this.getPath(`properties?id=${id}`)) 
  }
  
  static getPath(path: string): string {
    return `/api/${path}`;
  } 
}
