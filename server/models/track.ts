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
import Album from "./album"

class Track extends Model<
  InferAttributes<Track>,
  InferCreationAttributes<Track>
> {
  declare id: CreationOptional<number>
  declare name: string
  declare album_id: ForeignKey<Album["id"]>
  declare album?: NonAttribute<Album>
}

Track.init(
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
  },
  {
    sequelize,
    tableName: "tracks",
  },
)

export default Track
