/**
 * 保存一些常量的配置
 */
export class Config {

  // static baseUrl: string = 'http://oj.mrdear.cn';
  static baseUrl: string = 'http://localhost:8888/api';
  /**
   * 获取首页展示用户
   * @type {string}
   */
  static url_indexUsers: string = Config.baseUrl+'/index/users';
  /**
   * 获取验证码
   * @type {string}
   */
  static url_codeImage: string = Config.baseUrl+'/codeValidate';
  /**
   * 邮箱有效检查
   * @type {string}
   */
  static url_checkEmail: string = Config.baseUrl+'/register/check';
  /**
   * 用户注册
   * @type {string}
   */
  static url_register: string = Config.baseUrl+'/register';
  /**
   * 用户登录
   * @type {string}
   */
  static url_login: string = Config.baseUrl+'/login';
  /**
   * 获取一个用户的基本信息
   * @type {string}
   */
  static url_userInfo: string = Config.baseUrl+'/user/';
  /**
   * 获取网站通知
   * @type {string}
   */
  static url_tips: string = Config.baseUrl+'/tips';
  /**
   * 获取全部目录
   * @type {string}
   */
  static url_catelogs: string = Config.baseUrl+'/catelogs';
  /**
   * 获取点击量前30最高的标签
   * @type {string}
   */
  static url_tags_aside: string = Config.baseUrl+'/tags';
  /**
   * 获取文章侧边栏
   * @type {string}
   */
  static url_article_aside: string = Config.baseUrl+'/articles/aside';
}
