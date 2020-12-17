const {sequelize} = require('../db/model');
const {generateId} = require('../libs/util');
const {generateToken, generateHash, compareHashedPassword} = require('../libs/middleware');

const findAccount = async (email) => {
  try {
    let sql = 'select id, email, password from account ';
    sql += 'where email=:email; '

    const [results] = await sequelize.query(sql, {
      replacements: {
        email: email
      }
    });

    if (results.length > 0) {
      return {
        id: results[0].id,
        email: results[0].email,
        password: results[0].password
      }
    } else {
      return null;
    }
  } catch (err) {
    console.error(err);
    return new Error(err)
  }
}

const createAccount = async (email, password) => {
  try {
    const passwordHash = await generateHash(password);
    const accountId = generateId();

    let sql = 'insert into account(id, email, password) values(:id, :email, :password); ';
    await sequelize.query(sql, {
      replacements: {
        id: accountId,
        email,
        password: passwordHash
      }
    });

    return accountId;
  } catch (err) {
    console.error(err);
    return new Error(err)
  }
}

const createDriver = async (accountId) => {
  try {
    const id = generateId();

    let sql = 'insert into driver(id, account_id) values(:id, :account_id); ';

    await sequelize.query(sql, {
      replacements: {
        id,
        account_id: accountId
      }
    });

    return id;
  } catch (err) {
    console.error(err);
    return new Error(err)
  }
}

const createPassenger = async (accountId) => {
  try {
    const id = generateId();

    let sql = 'insert into passenger(id, account_id) values(:id, :account_id); ';

    await sequelize.query(sql, {
      replacements: {
        id,
        account_id: accountId
      }
    });

    return id;
  } catch (err) {
    console.error(err);
    return new Error(err)
  }
}

exports.join = async (req, res, next) => {
  const {email, password, role} = req.body;

  try {
    const exAccount = await findAccount(email);

    if (exAccount) {
      return next({
        status: 409,
        message: 'Email already exists!'
      });
    }

    const accountId = await createAccount(email, password);

    if (role === 'passenger') {
      await createPassenger(accountId)
    } else if (role === 'driver') {
      await createDriver(accountId)
    }

    const token = await generateToken({
      account_id: accountId,
      email,
      role
    });

    res.status(200).send(token);

  } catch (err) {
    console.error(err);
    next(err);
  }
};


exports.login = async (req, res, next) => {
  const {email: inputEmail, password: inputPassword} = req.body;

  try {
    const exAccount = await findAccount(inputEmail);

    if (!exAccount) {
      return next({
        status: 404,
        message: 'Account not exists!',
      });
    }

    const {id: exAccountId, email: exAccountEmail, password: exAccountPasswordHash} = exAccount;

    const passwordMatched = await compareHashedPassword(inputPassword, exAccountPasswordHash);

    if (!passwordMatched) {
      return next({
        status: 401,
        message: 'Login Failed: Password not matched',
      });
    }

    const token = await generateToken({
      account_id: exAccountId,
      email: exAccountEmail
    });

    return res.status(200).json({
      message: 'success',
      token
    });
  } catch (err) {
    return next(err);
  }
};