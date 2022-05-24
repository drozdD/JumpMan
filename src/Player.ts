export default class Player {
    public playerImg: string = '../imgs/player.png';
    public static position: { x: number, y: number }
    //public canvas = document.querySelector('canvas')
    // public c = this.canvas.getContext('2d')
    constructor() {
        Player.position = {
            x: 152,
            y: 70
        }
        this.drawPlayerOnStart();
    }

    drawPlayerOnStart() {
        const image = new Image()
        image.src = this.playerImg;

        image.onload = function () {
            let canvas = document.querySelector('canvas')
            let c = canvas.getContext('2d')
            c.drawImage(image,
                0, 22,   // Start at 70/20 pixels from the left and the top of the image (crop),
                16, 10,   // "Get" a `50 * 50` (w * h) area from the source image (crop),
                Player.position.x, Player.position.y,     // Place the result at 0, 0 in the canvas,
                16, 10); // With as width / height: 100 * 100 (scale)
        }
    }
}