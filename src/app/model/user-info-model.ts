/**
 * 保存用户基本站点信息
 */
export class UserInfoModel {
  id: number;
  nickname: string;
  avatar: string;
  email: string;
  isEmail:boolean;
  intro: string;
  blog:string;
  language: string;
  //用户历史解题
  aCProblems: number[];
  //用户最近解题
  aCRecents: number[];
  aCTotal: number;
  rank: number;

}
