const { Op } = require("sequelize");
const { user } = require("../../db/models");

const getURI = (req, res) => {
  const { id } = req.params;

  user
    .findOne({ where: { id } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const get = (req, res) => {
  const { search, limit, offset } = req.query;

  const where = search ? { caption: { [Op.getLike()]: `%${search}%` } } : null;

  user
    .findAndCountAll({
      where,
      ...(limit ? { limit } : {}),
      ...(offset ? { offset } : {}),
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

module.exports = (router) => {
  router.get("/", get);
  router.get("/:id", getURI);

  return true;
};
