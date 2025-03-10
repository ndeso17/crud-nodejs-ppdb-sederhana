const index = (req, res) => {
  try {
    return res.status(200).render("index");
  } catch (error) {
    const datas = {
      title: "Internal Error",
      description: "Index Page!",
      keywords: "500",
    };
    return res.status(500).render("error", { datas });
  }
};

module.exports = index;
