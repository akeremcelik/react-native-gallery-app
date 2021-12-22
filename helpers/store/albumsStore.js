import mobx, {makeAutoObservable, observable} from "mobx";

class AlbumsStore {
    constructor() {
        makeAutoObservable(this);
    }

    albums = [];
    maxAlbumID = 0;
    editAlbumID = 0;

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

    bringAlbumFromName(name) {
        return this.albums.filter(alb => alb.name == name);
    }

    bringAlbumIndexFromID(id) {
        return this.albums.findIndex(alb => alb.id == id);
    }

    bringAlbumFromID(id) {
        return this.albums.filter(alb => alb.id == id);
    }

    setEditAlbumID(id) {
        this.editAlbumID = id;
    }
}
const albumsStore = new AlbumsStore()
export default albumsStore;