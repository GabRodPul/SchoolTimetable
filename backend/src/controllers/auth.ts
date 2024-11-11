import { Request, Response } from 'express';

export const signin = (req: Request, res: Response): void => {
  const user = req.body.username;
  const pwd = req.body.password;

  // Retorna un estado 400 si falta el nombre de usuario o la contraseña
  if (!user || !pwd) {
    return res.status(400).json({
      error: true,
      message: "Username or Password required."
    });
  }

  // Busca el usuario en la base de datos
  User.findOne({ where: { username: user } })
    .then(data => {
      if (!data) {
        // Retorna un estado 401 si las credenciales no coinciden
        return res.status(401).json({ error: true, message: "Password not valid!" });
      }

      // Compara la contraseña encriptada
      const result = bcrypt.compareSync(pwd, data.password);
      if (!result) {
        return res.status(401).json({ error: true, message: "Password not valid!" });
      }

      // Genera el token
      const token = utils.generateToken(data);

      // Obtiene los detalles básicos del usuario
      const userObj = utils.getCleanUser(data);

      // Retorna el token junto con los detalles del usuario
      return res.json({ user: userObj, access_token: token });
    })
    .catch(err => {
      console.error("Database error:", err);
      res.status(500).json({
        message: err.message || "Some error occurred while retrieving tutorials."
      });
    });
};