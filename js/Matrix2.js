class Matrix2 {
    constructor(x1, x2, y1, y2) {
        this.x1 = x1;
        this.x2 = x2;
        this.y1 = y1;
        this.y2 = y2;
    }

    static Multiply(matrix, vector) {
        let result = {
            x: matrix.x1 * vector.x + matrix.x2 * vector.y,
            y: matrix.y1 * vector.x + matrix.y2 * vector.y
        };

        return result;
    }

    static rotateCoordinates(middle, matrix, coordinates) {
        let corrected = {
            x: coordinates.x - middle.x,
            y: coordinates.y - middle.y
        };

        corrected = Matrix2.Multiply(matrix, corrected);

        corrected = {
            x: corrected.x + middle.x,
            y: corrected.y + middle.y
        };

        return corrected;
    }
}
