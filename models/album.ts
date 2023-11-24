import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
  CreationOptional,
  ForeignKey,
  NonAttribute,
} from "sequelize"
import sequelize from "../db/connection"
import Artist from "./artist"

class Album extends Model<
  InferAttributes<Album>,
  InferCreationAttributes<Album>
> {
  declare id: CreationOptional<number>
  declare name: string
  declare release_date: string
  declare artist_id: ForeignKey<Artist["id"]>
  declare artist?: NonAttribute<Artist>
}

Album.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    release_date: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "albums",
  },
)

export default Album
