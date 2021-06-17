const {sequelize} = require('../db/model');
const {generateId} = require('../libs/util');


const findPassengerId = async (account_id) => {
  try {
    let sql = 'select id from passenger ';
    sql += 'where account_id=:account_id; '

    const [results] = await sequelize.query(sql, {
      replacements: {
        account_id
      }
    });

    if (results.length > 0) {
      return results[0].id
    } else {
      return null;
    }
  } catch (err) {
    console.error(err);
    throw new Error(err)
  }
}

const findDriverId = async (account_id) => {
  try {
    let sql = 'select id from driver ';
    sql += 'where account_id=:account_id; '

    const [results] = await sequelize.query(sql, {
      replacements: {
        account_id
      }
    });

    if (results.length > 0) {
      return results[0].id
    } else {
      return null;
    }
  } catch (err) {
    console.error(err);
    throw new Error(err)
  }
}

exports.getAll = async (req, res, next) => {
  let {limit, page, status} = req.query;
  let offset = 0;

  try {
    let sql = 'select * from dispatch ';

    if (status) {
      sql += 'where status = :status ';
    }

    sql += 'order by requested_at desc ';
    sql += 'limit :limit ';
    sql += 'offset :offset ';
    sql += ';'

    if (page && page > 1) {
      offset = limit * (page - 1);
    }

    if (!limit || limit < 0) {
      limit = 10
    }

    const [results] = await sequelize.query(sql, {
      replacements: {
        limit,
        offset,
        status
      },
    });
    res.status(200).json(results)
  } catch (err) {
    console.error(err);
    next(err);
  }
}

exports.post = async (req, res, next) => {
  const {address} = req.body;
  const {account_id} = req.decoded;

  const passengerId = await findPassengerId(account_id)

  try {
    let sql = 'insert into dispatch (id, passenger_id, passenger_location) ';
    sql += 'values (:id, :passenger_id, :passenger_location); '

    const [results] = await sequelize.query(sql, {
      replacements: {
        id: generateId(),
        passenger_id: passengerId,
        passenger_location: address
      }
    });
    res.status(201).json(results)
  } catch (err) {
    console.error(err);
    next(err);
  }
}

exports.put = async (req, res, next) => {
  const {id} = req.params;
  const {address} = req.body;
  const {account_id} = req.decoded;
  const driverId = await findDriverId(account_id)

  try {
    let sql = 'update dispatch set driver_location=:address ';
    sql += ', driver_id = :driver_id ';
    sql += `, status='finished' `;
    sql += `, finished_at=(datetime('now','localtime')) `;
    sql += `, updated_at=(datetime('now','localtime')) `;
    sql += 'where id=:id; ';

    const [results] = await sequelize.query(sql, {
      replacements: {
        driver_id: driverId,
        id,
        address
      }
    });

    res.status(200).json('affected')
  } catch (err) {
    console.error(err);
    next(err);
  }
}

