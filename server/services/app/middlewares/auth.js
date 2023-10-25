const { verifyToken } = require("../helpers/jwt");
const { User, Post } = require("../models");

async function authentication(req, res, next) {
  try {
    const { access_token } = req.headers;
    // console.log(access_token);

    const payload = verifyToken(access_token);

    const user = await User.findByPk(payload.id);

    if (!user) {
      throw { name: "Unauthorized" };
    }

    req.users = {
      id: user.id,
      role: user.role
    };
    next();
  } catch (err) {
    next(err);
  }
}

async function authorization(req, res, next) {
  try {
    let { id, role } = req.users;
    let post = await Post.findByPk(req.params.id);
    console.log(role);

    if (!post) {
      throw { name: "NotFound" };
    }

    if (role !== "admin") {
      throw { name: "Forbidden" };
    }
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  authentication,
  authorization,
};
