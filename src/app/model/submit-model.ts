/**
 * 判题结果实体
 */
export class SubmitModel {
  id: number;
  problemId: number;
  problemTitle: number;
  userId: number;
  memory: number;
  time: number;
  codeLength: number;
  language: string;
  contestId: number;
  verdict: string;
  verdictCode: number;
  testcase: number;
  createdate: string;
}
