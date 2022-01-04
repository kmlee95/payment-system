import got from 'got';
import * as FormData from 'form-data';
import { MailModuleOptions, EmailVar } from './mail.interface';
import { Inject, Injectable } from '@nestjs/common';
import { CONFIG_OPTIONS } from 'src/commo/commo.constants';

@Injectable()
export class MailService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: MailModuleOptions,
  ) {}

  async sendEmail(
    subject: string,
    template: string,
    emailVars: EmailVar[],
  ): Promise<any> {
    const form = new FormData();
    form.append('from', `Kyungmin from Eats <mailgun@${this.options.domain}>`);
    form.append('to', `kmlee95@naver.com`);
    form.append('subject', subject);
    form.append('template', template);

    emailVars.forEach((eVar) => form.append(`v:${eVar.key}`, eVar.value));

    try {
      await got(`https://api.mailgun.net/v3/${this.options.domain}/messages`, {
        method: 'post',
        headers: {
          Authorization: `Basic ${Buffer.from(
            `api:${this.options.apiKey}`,
          ).toString('base64')}`,
        },
        body: form,
      });
    } catch (error) {
      console.log(error);
    }
  }

  sendVerificationEmail(email: string, code: string) {
    this.sendEmail('verify Your Email', 'verify-email', [
      { key: 'code', value: code },
      { key: 'username', value: email },
    ]);
  }
}
