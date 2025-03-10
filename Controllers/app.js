const pageIndex = require("./index");
const index = async (req, res) => {
  return pageIndex(req, res);
};

const pagePpdb = require("./ppdb");
const ppdb = async (req, res) => {
  return pagePpdb(req, res);
};

const pageDashboard = require("./dashboard");
const dashboard = async (req, res) => {
  return pageDashboard(req, res);
};

const deleteData = require("./delete");
const deleteSis = async (req, res) => {
  return deleteData(req, res);
};

const updateData = require("./update");
const updateSis = async (req, res) => {
  return updateData(req, res);
};

module.exports = { index, ppdb, dashboard, deleteSis, updateSis };
