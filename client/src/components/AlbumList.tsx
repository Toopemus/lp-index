import { useEffect, useState } from "react"
import albumService from "../services/albumService";

// TODO: share type or interface with server?
type Album = {
  artist: {
    id: number,
    name: string,
  },
  id: number,
  name: string,
  release_date: string,
  tracks: [object],
  createdAt: string,
  updatedAt: string,
}

const AlbumListItem = ({ album }: { album: Album }) => {
  return (
    <tr>
      <td>{album.name}</td>
      <td>{album.release_date}</td>
      <td>{album.artist.name}</td>
    </tr>
  )
}

const AlbumList = () => {
  const [albums, setAlbums] = useState<Album[]>([]);

  useEffect(() => {
    const fetchAlbums = async () => {
      const albums = await albumService.getAll()
      setAlbums(albums)
    }

    fetchAlbums()
  }, [])

  return (
    <>
      <h2>Albumit</h2>
      <table>
        <tbody>
          {albums.map((album: Album) => (
            <AlbumListItem key={album.id} album={album}/>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default AlbumList
