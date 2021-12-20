import mobx, {makeAutoObservable, observable} from "mobx";

class AlbumsStore {
    constructor() {
        makeAutoObservable(this);
    }

    albums = [];
    maxAlbumID = 0;

    setAlbums(incAlbums) {
        this.albums = incAlbums;
    }

    addAlbum(album) {
        this.albums = [...this.albums, album];
    }

    deleteAlbum(album) {
        this.albums = this.albums.filter(alb => alb.id != album);
    }

    setMaxAlbumID(id) {
        this.maxAlbumID = id;
    }
}
const albumsStore = new AlbumsStore()
export default albumsStore;