export const getMainPage = (req, res, next) => {
    res.render("admin/addDistrict", {
      isEdit: false,
      name: null,
      imageURL: null,
      oldName: "",
      error: null,
    });
  };