import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
  CreationOptional,
  ForeignKey,
  NonAttribute,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyHasAssociationsMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
  HasManySetAssociationsMixin,
} from "sequelize"
import sequelize from "../db/connection"
import Artist from "./artist"
import Track from "./track"

class Album extends Model<
  InferAttributes<Album>,
  InferCreationAttributes<Album>
> {
  declare id: CreationOptional<number>
  declare name: string
  declare release_date: string
  declare artist_id: ForeignKey<Artist["id"]>
  declare artist?: NonAttribute<Artist>

  declare getTracks: HasManyGetAssociationsMixin<Track>
  declare addTrack: HasManyAddAssociationMixin<Track, number>
  declare addTracks: HasManyAddAssociationsMixin<Track, number>
  declare setTracks: HasManySetAssociationsMixin<Track, number>
  declare removeTrack: HasManyRemoveAssociationMixin<Track, number>
  declare removeTracks: HasManyRemoveAssociationsMixin<Track, number>
  declare hasTrack: HasManyHasAssociationMixin<Track, number>
  declare hasTracks: HasManyHasAssociationsMixin<Track, number>
  declare countTracks: HasManyCountAssociationsMixin
  declare createTrack: HasManyCreateAssociationMixin<Track, "album_id">
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

Album.hasMany(Track, {
  sourceKey: "id",
  foreignKey: "album_id",
  as: "tracks",
})
Track.belongsTo(Album, {
  foreignKey: "album_id",
  targetKey: "id",
  as: "album",
})

export default Album
