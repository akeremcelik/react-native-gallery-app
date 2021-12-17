import mobx, {makeAutoObservable, observable} from "mobx";

class ImagesStore {
    constructor() {
        makeAutoObservable(this);
    }

    images = [];

    setImages(incImgs) {
        this.images = incImgs;
    }

    addImage(pic) {
        this.images = [...this.images, pic];
    }

    deleteImage(pic) {
        this.images = this.images.filter(img => img != pic);
    }
}
const imagesStore = new ImagesStore()
export default imagesStore;