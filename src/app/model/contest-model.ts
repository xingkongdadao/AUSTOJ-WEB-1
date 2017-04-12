/**
 * 竞赛主页
 */
export class ContestModel {
  /**
   * 主键
   */
  id: number;
  /**
   * 标题
   */
  title: string;
  /**
   * 开始时间
   */
  startTime: string;
  /**
   * 结束时间
   */
  endTime: string;
  /**
   * 创建人
   */
  createUser: string;

  typeName: string;
  /**
   * 描述
   */
  description: string;
}
