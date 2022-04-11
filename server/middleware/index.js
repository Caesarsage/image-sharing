import jwt from "jsonwebtoken"

export const authenticateUser = async (req, res, next) => {
  try {
    // check if there is an authorization token
    console.log(req.headers);
    if (!req.headers.authorization) {
      return res.status(401).json({ message: "authorization header required" });
    }
    let splittedHeader = await req.headers.authorization.split(" ");
    if (splittedHeader[0] !== "Bearer") {
      return res
        .status(401)
        .json({ message: "authorization format is Bearer <token>" });
    }
    let token = await splittedHeader[1];
    // decode user
    const userToken = await jwt.verify(token, process.env.SECRET);
    if (!userToken)
      return res
        .status(403)
        .json({ message: "Invalid authorization token, please login" });
    // allow to continue with request
    console.log(userToken);
    req.user = userToken;
    next();
  } catch (error) {
    res.status(501).json({ message: "error, bad request.", err: error });
  }
};