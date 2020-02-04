import { sequelize } from '../../database/db';
import { Property } from '../../models/Property';
import { apiResponse } from '../../utils/api.utils';

const createHandler = (req, res) => {
  sequelize.sync().then(() => Property.create(
    req.body
  )).then(property => {
    property.save().then(result => {
      res.end(apiResponse(true, property.toJSON))
    });
  }).catch(e => {
    res.end(apiResponse(false, e));
  });
}

const queryHandler = (req, res) => {
  sequelize.sync().then(() => {
    Property.findAll().then(results => {
      res.end(apiResponse(true, results));
    });
  });
}

const deleteHandler = (req, res) => {
  const { id } = req.query;
  sequelize.sync().then(() => {
    Property.destroy({
      where: {
        id
      }
    }).then(result => {
      res.end(apiResponse(true, id));
    }).catch(e => {
      res.end(apiResponse(false, e));
    });
  });
}

const updateHandler = (req, res) => {
  const { id } = req.query;
  sequelize.sync().then(() => {
    Property.update(req.body, {
      where: {
        id
      }
    }).then(result => {
      res.end(apiResponse(true, result));
    }).catch(e => {
      res.end(apiResponse(false, e));
    });
  });
}

export default (req, res) => {
  switch(req.method) {
    case 'POST':
      createHandler(req, res);
      break;
    case 'DELETE':
      deleteHandler(req, res);
      break;
    case 'PUT':
      updateHandler(req, res);
      break;
    default:
      queryHandler(req, res);
      break;
  }
};