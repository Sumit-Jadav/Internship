export interface IRequest {
  email: string;
  password: string;
  captcha: string;
  captchaId: number;
  remember?: number;
}
