import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import { Id, UserData } from "../../../common/@types/models";
import { defineId } from "../utils/id";

// Define la conexión directamente aquí
const sequelize = new Sequelize(process.env.DB_CONNECTION_STRING as string, {
  dialect: 'postgres',
  logging: false,
});

// Define los atributos del usuario
interface UserAttributes extends UserData, Id {
  username: string;  // Agregar el campo username
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
}

// Atributos necesarios para crear un usuario (sin `id` ya que es autogenerado)
interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

class UserModel extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;  // Asegurarse de que esté definido aquí
  public name!: string;
  public email!: string;
  public password!: string;
  public phoneNumber!: string;

  // Campos de timestamps (si usas `timestamps`)
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Inicializa el modelo con Sequelize
UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      ...defineId,
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: false, // Asegúrate de que sea obligatorio
      unique: true,     // Opcional, si deseas que el username sea único
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        len: [8, 255],
      },
    },
    phoneNumber: {
      type: DataTypes.STRING(15),
      allowNull: false,
      validate: {
        is: /^\+(?:[0-9] ?){6,14}[0-9]$/,
      },
    },
  },
  {
    sequelize,           // Pasa la instancia de Sequelize
    tableName: "users",  // Nombre de la tabla
    timestamps: true,    // Si usas createdAt y updatedAt
    modelName: "User",   // Nombre del modelo
  }
);

// Sincroniza el modelo con la base de datos (opcional)
sequelize.sync()
  .then(() => console.log("Database synchronized successfully."))
  .catch((error) => console.error("Failed to synchronize database:", error));

export { UserModel, sequelize };