import db from '../database/db.js';
import { empty, addslashes } from '../helper/utils.js';
import md5 from 'md5';

export const register = async (req, res) => {
  let { username, password } = req.body;

  const respon = {
    success: false,
    message: 'Invalid Parameter',
  };

  if (!empty(username) && !empty(password)) {
    username = addslashes(username);
    password = md5(password);

    try {
      const [data] = await db.query(`SELECT username FROM users WHERE username = '${username}'`);

      console.log(data);

      if (data && data.length > 0) {
        respon.message = 'Username Already Taken';
      } else {
        const query = `INSERT INTO users (username, pass, isAdmin) VALUES ('${username}', '${password}', '0')`;
        const sql = await db.query(query, {
          type: db.QueryTypes.INSERT,
        });
        console.log('sql');
        console.log(sql);
        if (sql[1] > 0) {
          respon.success = true;
          respon.message = 'Register Succes';
          respon.username = username;
        } else {
          respon.message = 'Register Failed';
        }
      }
    } catch (error) {
      console.log(error);
      respon.message = 'Server Error';
    }
  }

  return res.send(respon);
};

export const login = async (req, res) => {
  let { username, password } = req.body;

  const respon = {
    success: false,
    error: 'Login Failed',
    message: 'Invalid Parameter',
    data: [],
  };

  if (!empty(username) && !empty(password)) {
    password = addslashes(password);
    password = md5(password);

    try {
      const [data] = await db.query(`SELECT username FROM users WHERE username = '${username}' AND pass = '${password}'`);
      console.log(data);
      if (data && data.length > 0) {
        respon.success = true;
        respon.error = '-';
        respon.message = 'Login Success';
        respon.data = data[0];
      } else {
        respon.message = 'Username / Password Salah';
      }
    } catch (error) {
      console.log(error);
      respon.message = 'Server Error';
    }
  }

  return res.send(respon);
};
