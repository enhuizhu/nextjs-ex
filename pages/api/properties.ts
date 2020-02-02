import { sequelize } from '../../database/db';
import { Property } from '../../models/Property';

const createHandler = (req, res) => {
  sequelize.sync().then(() => Property.create(
    req.body
  )).then(property => {
    property.save().then(result => {
      console.log('save result', result);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(property.toJSON()));
    });
  }).catch(e => {
    console.error(e);
    res.end(e);
  });
}

const queryHandler = (req, res) => {
  sequelize.sync().then(() => {
    Property.findAll().then(results => {
      res.end(JSON.stringify(results));
    });
  });
}

const deleteHandler = (req, res) => {
  console.log('req.query', req.query);
  const { id } = req.query;
  sequelize.sync().then(() => {
    Property.destroy({
      where: {
        id
      }
    }).then(result => {
      console.log('result', result);
      res.end(`record with id ${id} has been deleted!`);
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
      res.end(`update recode ${id} successfully!`);
    }).catch(e => {
      res.end(`error on updating record ${id}`);
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