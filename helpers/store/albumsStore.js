import mobx, {makeAutoObservable, observable} from "mobx";

class AlbumsStore {
    constructor() {
        makeAutoObservable(this);
    }

    albums = [];

    setAlbums(incAlbums) {
        this.albums = incAlbums;
    }

    addAlbum(album) {
        this.albums = [album, ...this.albums];
    }

    deleteAlbum(album) {
        this.albums = this.albums.filter(alb => alb != album);
    }
}
const albumsStore = new AlbumsStore()
export default albumsStore;