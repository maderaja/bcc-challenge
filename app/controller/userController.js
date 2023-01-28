import db from '../database/db.js';
import { empty, addslashes } from '../helper/utils.js';
import md5 from 'md5';

export const editProfile = async (req, res) => {
  let { id_user, username, new_password, old_password } = req.body;

  const respon = {
    success: false,
    error: '-',
    message: 'Failed Edited',
  };

  if (!empty(id_user) && !empty(username)) {
    // cek kalo ganti password
    if (!empty(new_password)) {
      new_password = md5(new_password);
      // cek pasword lama
      if (!empty(old_password)) {
        old_password = md5(old_password);
        try {
          const [user] = await db.query(`SELECT username FROM users WHERE id_user = '${id_user}' AND pass = '${old_password}'`);
          if (user && user.length > 0) {
            const sqlUpdate = await db.query(`UPDATE users SET username = '${username}', pass = '${new_password}' WHERE id_user = '${id_user}'`, {
              type: db.QueryTypes.UPDATE,
            });

            if (sqlUpdate[1] > 0) {
              respon.success = true;
              respon.message = 'Successfully Edited';
            }
          } else {
            respon.error = 'Incorrect Password';
          }
        } catch (error) {
          respon.error = 'Server Error';
        }
      } else {
        respon.error = 'Please Enter Old Password';
      }
    } else {
      try {
        const sqlUpdate = await db.query(`UPDATE users SET username = '${username}' WHERE id_user = '${id_user}'`, {
          type: db.QueryTypes.UPDATE,
        });

        if (sqlUpdate[1] > 0) {
          respon.success = true;
          respon.message = 'Successfully Edited';
        }
      } catch (error) {
        respon.error = 'Server Error';
      }
    }
  } else {
    respon.error = 'Invalid Parameter';
  }

  return res.send(respon);
};
