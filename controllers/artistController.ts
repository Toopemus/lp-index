import { Router, Request, Response } from "express";
import Artist from "../models/artist";
import Album from "../models/album";

const artistController: Router = Router();

artistController.post("/", async (req: Request, res: Response) => {
  const newArtist = await Artist.create({
    ...req.body,
  });

  res.json(newArtist.toJSON());
});

artistController.get("/", async (req: Request, res: Response) => {
  const artists = await Artist.findAll({
    include: {
      association: "albums",
      attributes: ["id", "name", "release_date"],
    },
  });

  res.json(artists);
});

artistController.put("/:id", (req: Request, res: Response) => {
  res.send("update artist");
});

artistController.delete("/:id", (req: Request, res: Response) => {
  res.send("delete artist");
});

export default artistController;
