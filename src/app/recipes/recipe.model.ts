export class Recipe {
    private name: string;
    private description: string;
    private imagePath: string;

    constructor(name: string, description: string, imagePath: string) {
        this.name = name;
        this.description = description;
        this.imagePath = imagePath;
    }

    getName() {
        return this.name;
    }

    getDescription() {
        return this.description;
    }

    getImagePath() {
        return this.imagePath;
    }
}