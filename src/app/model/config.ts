/**
 * 保存一些常量的配置
 */
export class Config {

  static baseUrl: string = 'http://localhost:8888/api';

  static url_indexUsers: string = Config.baseUrl+'/index/users';

  static url_codeImage: string = Config.baseUrl+'/codeValidate';

  static url_checkEmail: string = Config.baseUrl+'/register/check';

  static url_register: string = Config.baseUrl+'/register';

  static url_login: string = Config.baseUrl+'/login';
}
