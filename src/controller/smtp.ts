import SMTP from 'smtp-server';
import AuthController from '@controller/auth';

const SMTPSServer = new SMTP.SMTPServer({
  secure: true,
  key: Buffer.from(process.env.SMTP_KEY, 'base64').toString('utf8'),
  cert: Buffer.from(process.env.SMTP_CERT, 'base64').toString('utf8'),
  onAuth: AuthController.SMTPAuth(true),
  name: 'Thi Loi System',
  banner: 'Made by Huong Da Group.',
});
const SMTPServer = new SMTP.SMTPServer({
  onAuth: AuthController.SMTPAuth(false),
  name: 'Thi Loi System',
  banner: 'Made by Huong Da Group.',
  disabledCommands: ['STARTTLS'],
});
SMTPSServer.on('error', console.error);
SMTPServer.on('error', console.error);
// SMTPSServer.listen(465)
SMTPServer.listen(25)
