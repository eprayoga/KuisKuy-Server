const Category = require("./model");

module.exports = {
  index: async (req, res) => {
    try {
      const alert = { message: alertMessage, status: alertStatus };
      const category = await Category.find();

      res.render("admin/category/view_category", {
        category,
        alert,
        name: req.session.user.name,
        title: "Halaman Kategori",
      });
    } catch (err) {
      res.redirect("/category");
    }
  },

  viewCreate: async (req, res) => {
    try {
      res.render("admin/category/create", {
        name: req.session.user.name,
        title: "Halaman Tambah Kategori",
      });
    } catch (err) {
      res.redirect("/category");
    }
  },

  actionCreate: async (req, res) => {
    try {
      const { name } = req.body;

      let category = await Category({ name });
      await category.save();
      res.redirect("/category");
    } catch (err) {
      res.redirect("/category");
    }
  },

  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;

      const category = await Category.findOne({ _id: id });

      res.render("admin/category/edit", {
        category,
        name: req.session.user.name,
        title: "Halaman Ubah Kategori",
      });
    } catch (err) {
      res.redirect("/category");
    }
  },

  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;

      await Category.findOneAndUpdate({ _id: id }, { name });

      res.redirect("/category");
    } catch (err) {
      res.redirect("/category");
    }
  },

  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;

      await Category.findOneAndRemove({ _id: id });

      res.redirect("/category");
    } catch (err) {
      res.redirect("/category");
    }
  },
};
