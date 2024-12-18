import { SMTPServerAuthentication, SMTPServerAuthenticationResponse, SMTPServerSession } from 'smtp-server';
import DB from '@model/config';
import { IAddress } from '@model/address';
import { IAccount } from '@model/account';
import bcryptjs from 'bcryptjs';

const Login = async (username: string, password: string): Promise<string> => {
  try {
    const query: {
      address: IAddress,
      account: IAccount
    } = await DB.query(`FOR ad IN address FOR ac in account FILTER ad._key == @username && ac._key == ad.accountId LIMIT 1 RETURN {address: ad, account: ac}`, {
      username,
    }).then((cursor) => cursor.next());
    if (!query || !bcryptjs.compareSync(password, query.account.password)) {
      return null;
    }

    return query.account._key;
  } catch (error) {
    console.log(error);
    return null;
  }
};


const SMTPAuth = (secure: boolean) => {
  return async (auth: SMTPServerAuthentication, session: SMTPServerSession, callback: (err: Error | null | undefined, response?: SMTPServerAuthenticationResponse) => void) => {
    const user = await Login(auth.username, auth.password);
    if (!user) {
      return callback(new Error('Invalid username or password'));
    }
    callback(null, {
      user,
    });
  };
};

export default {
  SMTPAuth,
};
