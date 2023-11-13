export function isAdmin(req, res, next) {

    if (req.session.rol === "admin") {
      next();
    } else {
      res.status(403).send({status: "error",error:"no sos admin"});
    }
  }

  export function isUser(req, res, next) {

    if (req.session.rol === "user") {
      next();
    } else {
      res.status(403).send({status: "error",error:"no sos user"});
    }
  }