import { Router, Request, Response } from "express";
import Artist from "../models/artist";
import { TypedRequest } from "../utils/validation";

const artistController: Router = Router();

interface IArtistRequest {
  name: string;
}

artistController.post(
  "/",
  async (req: TypedRequest<IArtistRequest>, res: Response) => {
    try {
      const name = req.body.name;
      const newArtist = await Artist.create({
        name,
      });

      res.json(newArtist.toJSON());
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({error: error.message});
      } else {
        res.status(400)
      }
    }
  }
);

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
