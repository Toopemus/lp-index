import { Router, Request, Response } from "express";
import Album from "../models/album";
import Artist from "../models/artist";
import { TypedRequest } from "../utils/validation";

const albumController: Router = Router();

interface IAlbumRequest {
  name: string;
  release_date: string;
  artist_id: number;
}

/*
 * Get artist from supplied id
 * -> use Artist method createAlbum to add to database
 */
albumController.post(
  "/",
  async (req: TypedRequest<IAlbumRequest>, res: Response) => {
    try {
      const { name, release_date, artist_id } = req.body;
      const artist = await Artist.findByPk(artist_id, { rejectOnEmpty: true });

      if (!artist) {
        return res.status(400);
      }

      const newAlbum = await artist.createAlbum({
        name,
        release_date,
      });

      res.json(newAlbum.toJSON());
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({error: error.message});
      } else {
        res.status(400);
      }
    }
  }
);

albumController.get("/", async (req: Request, res: Response) => {
  const albums = await Album.findAll({
    attributes: ["id", "name", "release_date", "createdAt", "updatedAt"],
    include: { association: "artist", attributes: ["id", "name"] },
  });
  res.json(albums);
});

albumController.put("/:id", (req: Request, res: Response) => {
  res.send("update album");
});

albumController.delete("/:id", (req: Request, res: Response) => {
  res.send("delete album");
});

export default albumController;
