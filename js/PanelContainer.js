class PanelContainer {
    constructor(x, y, size, depth, alpha) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.depth = depth;
        this.alpha = alpha;
    }

    getCoord() {
        let vector = {
            x: this.x,
            y: this.y
        };

        return vector;
    }

    setCoord(vector) {
        this.x = vector.x;
        this.y = vector.y;
    }

    setScale(scale) {
        this.size *= scale;
    }
}
