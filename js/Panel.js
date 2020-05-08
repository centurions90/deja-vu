class Panel {
    constructor(image) {
        this.image = image
        this.target = {
            x: image.x,
            y: image.y,
            size: 1,
            depth: 0,
            alpha: 0
        };
    }

    moveTarget(panelContainer) {
        this.target = {
            x: panelContainer.x,
            y: panelContainer.y,
            size: panelContainer.size,
            depth: panelContainer.depth,
            alpha: panelContainer.alpha
        };
    }

    move(speed) {
        this.image.x = (1 - speed) * this.image.x + speed * this.target.x;
        this.image.y = (1 - speed) * this.image.y + speed * this.target.y;
        this.image.scale = (1 - speed) * this.image.scale + speed * this.target.size;
        this.image.depth = this.target.depth;
        this.image.alpha = (1 - speed) * this.image.alpha + speed * this.target.alpha;
    }
}
