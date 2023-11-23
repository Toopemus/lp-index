import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyHasAssociationMixin,
  HasManyHasAssociationsMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
  HasManySetAssociationsMixin,
  CreationOptional,
} from "sequelize";
import sequelize from "../db/connection";
import Album from "./album";

class Artist extends Model<
  InferAttributes<Artist>,
  InferCreationAttributes<Artist>
> {
  declare id: CreationOptional<number>
  declare name: string;

  declare getAlbums: HasManyGetAssociationsMixin<Album>;
  declare addAlbum: HasManyAddAssociationMixin<Album, number>;
  declare addAlbums: HasManyAddAssociationsMixin<Album, number>;
  declare setAlbums: HasManySetAssociationsMixin<Album, number>;
  declare removeAlbum: HasManyRemoveAssociationMixin<Album, number>;
  declare removeAlbums: HasManyRemoveAssociationsMixin<Album, number>;
  declare hasAlbum: HasManyHasAssociationMixin<Album, number>;
  declare hasAlbums: HasManyHasAssociationsMixin<Album, number>;
  declare countAlbums: HasManyCountAssociationsMixin;
  declare createAlbum: HasManyCreateAssociationMixin<Album, "artist_id">;
}

Artist.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "artists",
  }
);

Artist.hasMany(Album, {
  sourceKey: "id",
  foreignKey: "artist_id",
  as: "albums"
});
Album.belongsTo(Artist, { foreignKey: "artist_id", targetKey: "id", as: "artist" })

export default Artist;
