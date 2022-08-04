import * as ejs from 'ejs';
import * as path from 'path';
const VIEWS = 'views/mails-templates';
export class TemplatingView {
  public getTemplate(name: string, data: any): Promise<string> {
    const filePath = path.resolve(__dirname, `${VIEWS}/${name}.ejs`);
    return new Promise<string>((resolve, reject) => {
      ejs.renderFile(filePath, data, {}, (err, str) => err ? reject(err) : resolve(str));
    });
  }
}
