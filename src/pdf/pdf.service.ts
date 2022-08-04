import { Injectable } from '@nestjs/common';
import pdf from 'pdf-creator-node'
import fs from 'fs'
import path from 'path';
const options: any = {
  format: 'A3',
  orientation: 'portrait',
  border: '1mm',
  header: {
    height: '45mm',
    contents: '',
  },
};
@Injectable()
export class PdfService {
  public generatePDF(template: string, data: any) {
    const html = fs.readFileSync(
      path.resolve(__dirname, 'template/test.html'),
      'utf8',
    );
    const now = new Date().getTime();
    const document = {
      html,
      data: { birthAct: data },
      path: path.resolve(__dirname, '..', '..', `./filename ${now}.pdf`),
      type: 'buffer',
    };
    options.phantomPath = process.env.PHANTOMJS_PATH;
    return pdf
      .create(document, options)
      .then((res) => {
        return res;
      })
      .catch((error) => {
        console.error('PDF error', error);
      });
  }
}
