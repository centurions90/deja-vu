function lerp(a, b, t) {
    return (1 - t) * a + t * b;
}

class Scene1 extends Phaser.Scene {
    page = 0;

    constructor() {
        super("reader");
    }

    preload() {
        this.load.image("Panel1", "assets/Panel1.jpg");
        this.load.image("Panel2", "assets/Panel2.jpg");
        this.load.image("Panel3", "assets/Panel3.jpg");
        this.load.image("Panel4", "assets/Panel4.jpg");
        this.load.image("Panel5", "assets/Panel5.jpg");
        this.load.image("Panel6", "assets/Panel6.jpg");
        this.load.image("Panel7", "assets/Panel7.jpg");
        this.load.image("Panel8", "assets/Panel8.jpg");
    }

    create() {
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.scale = 0.6;

        this.panelContainers = [
            new PanelContainer(647, 1447, 1.618, 5, 0),
            new PanelContainer(400, 400, 1, 4, 1),
            new PanelContainer(1047, 247, 0.6175, 3, 1),
            new PanelContainer(1142, 647, 0.38125, 2, 1),
            new PanelContainer(895, 705, 0.23625, 1, 1),
            new PanelContainer(859, 553, 0.14625, 0, 0)
        ];

        this.panels = [
            new Panel(this.add.image(-400, -400, "Panel1")),
            new Panel(this.add.image(-400, -400, "Panel2")),
            new Panel(this.add.image(-400, -400, "Panel3")),
            new Panel(this.add.image(-400, -400, "Panel4")),
            new Panel(this.add.image(-400, -400, "Panel5")),
            new Panel(this.add.image(-400, -400, "Panel6")),
            new Panel(this.add.image(-400, -400, "Panel7")),
            new Panel(this.add.image(-400, -400, "Panel8"))
        ];

        this.panels[7].moveTarget(this.panelContainers[0]);
        this.panels[0].moveTarget(this.panelContainers[1]);
        this.panels[1].moveTarget(this.panelContainers[2]);
        this.panels[2].moveTarget(this.panelContainers[3]);
        this.panels[3].moveTarget(this.panelContainers[4]);
        this.panels[4].moveTarget(this.panelContainers[5]);

        this.panels[7].move(1);

        this.matrices = [
            new Matrix2(0, -this.scale, this.scale, 0),
            new Matrix2(0, -1 / this.scale, 1 / this.scale, 0)
        ];

        this.backmatrices = [
            new Matrix2(0, this.scale, -this.scale, 0),
            new Matrix2(0, 1 / this.scale, -1 / this.scale, 0)
        ];

        this.matrix = 0;

        this.inView = 0;

        this.left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.middle = {
            x: config.width / 2,
            y: config.height / 2
        };
    }

    update(delta) {
        if (Phaser.Input.Keyboard.JustDown(this.right)) {
            this.page++;
            this.inView = (this.inView + 1) % 8;

            for (let panelContainer of this.panelContainers) {
                panelContainer.setCoord(Matrix2.rotateCoordinates(this.middle, this.matrices[this.matrix], panelContainer.getCoord()));
                if (this.matrix == 0) {
                    panelContainer.setScale(this.scale);
                } else {
                    panelContainer.setScale(1 / this.scale);
                }
            }

            this.matrix = (this.matrix + 1) % 2;

            if (this.inView - 1 < 0) {
                this.panels[7].moveTarget(this.panelContainers[0]);
            } else {
                this.panels[this.inView - 1].moveTarget(this.panelContainers[0]);
            }
            this.panels[this.inView].moveTarget(this.panelContainers[1]);
            this.panels[(this.inView + 1) % 8].moveTarget(this.panelContainers[2]);
            this.panels[(this.inView + 2) % 8].moveTarget(this.panelContainers[3]);
            this.panels[(this.inView + 3) % 8].moveTarget(this.panelContainers[4]);
            this.panels[(this.inView + 4) % 8].moveTarget(this.panelContainers[5]);
        } else if (Phaser.Input.Keyboard.JustDown(this.left) && this.page != 0) {
            this.page--;
            this.inView--;

            if (this.inView < 0) {
                this.inView = 7;
            }

            for (let panelContainer of this.panelContainers) {
                panelContainer.setCoord(Matrix2.rotateCoordinates(this.middle, this.backmatrices[this.matrix], panelContainer.getCoord()));
                if (this.matrix == 0) {
                    panelContainer.setScale(this.scale);
                } else {
                    panelContainer.setScale(1 / this.scale);
                }
            }

            this.matrix--;

            if (this.matrix < 0) {
                this.matrix = 1;
            }

            if (this.inView - 1 < 0) {
                this.panels[7].moveTarget(this.panelContainers[0]);
            } else {
                this.panels[this.inView - 1].moveTarget(this.panelContainers[0]);
            }
            this.panels[this.inView].moveTarget(this.panelContainers[1]);
            this.panels[(this.inView + 1) % 8].moveTarget(this.panelContainers[2]);
            this.panels[(this.inView + 2) % 8].moveTarget(this.panelContainers[3]);
            this.panels[(this.inView + 3) % 8].moveTarget(this.panelContainers[4]);
            this.panels[(this.inView + 4) % 8].moveTarget(this.panelContainers[5]);
        }

        for (let panel of this.panels) {
            panel.move(0.15);
        }
    }
}
