/**
 * 文章实体
 */
export class ArticleModel {
  id: number;
  title: string;
  keyword: string;
  viewcount: number;
  likecount: number;
  isTop: number;
  year: number;
  month: number;
  day: number;
  isVote: number;
  nickname: string;
  summary: string;

  //内容字段
  htmlContent: string;

}
