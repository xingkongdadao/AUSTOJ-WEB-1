/**
 * 保存一些常量的配置
 */
export class Config {

  // static baseUrl: string = 'http://oj.mrdear.cn/api';
  static baseUrl: string = 'http://localhost:8888/api';
  static baseImageUrl: string = 'http://localhost:8888/';
  /**
   * 获取首页展示用户
   * @type {string}
   */
  static url_indexUsers: string = Config.baseUrl+'/index/users';
  /**
   * 获取排名用户信息
   * @type {string}
   */
  static url_rankUsers: string = Config.baseUrl+'/rank/users';
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
   * 更改用户密码
   * @type {string}
   */
  static url_user_changepwd: string = Config.baseUrl+'/user/changePwd';
  /**
   * 更新用户
   * @type {string}
   */
  static url_user_update: string = Config.baseUrl+'/user/update';
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
  /**
   * 获取文章列表
   * @type {string}
   */
  static url_articles: string = Config.baseUrl+'/articles';
  /**
   * 获取文章详情
   * @type {string}
   */
  static url_articles_detail: string = Config.baseUrl+'/article/';
  /**
   * 文章点赞
   * @type {string}
   */
  static url_articles_vote: string = Config.baseUrl+'/article/vote/';
  /**
   * 获取某一阶段的题目
   * @type {string}
   */
  static url_problem_stage: string = Config.baseUrl+'/problem/stage/';
  /**
   * 得到某一目录下的题目
   * @type {string}
   */
  static url_problem_catelog: string = Config.baseUrl+'/problem/catelog/';
  /**
   * 得到一个题目详情
   * @type {string}
   */
  static url_problem_id: string = Config.baseUrl+'/problem/';
  /**
   * 得到判题结果列表
   * @type {string}
   */
  static url_judge_list: string = Config.baseUrl+'/judge/list';
  /**
   * 得到单个判题结果
   * @type {string}
   */
  static url_judge_one: string = Config.baseUrl+'/judge/';
  /**
   * 提交判题
   * @type {string}
   */
  static url_judge_submit: string = Config.baseUrl+'/judge/problem/';
  /**
   * 判断竞赛是否可以查看
   * @type {string}
   */
  static url_contest_show: string = Config.baseUrl+'/contest/';
  /**
   * 获取竞赛
   * @type {string}
   */
  static url_contest: string = Config.baseUrl+'/contest';
  /**
   * 邮箱验证
   * @type {string}
   */
  static url_email_check: string = Config.baseUrl+'/register/check/token';
  /**
   * 发送邮箱验证码
   * @type {string}
   */
  static url_email_code: string = Config.baseUrl+'/email/send';
  /**
   * 文件上传
   * @type {string}
   */
  static url_upload_img: string = Config.baseUrl+'/user/upload/avatar';


}
