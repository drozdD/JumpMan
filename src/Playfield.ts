export default class Playfield {
    public static levelsImg: string = '../imgs/levels.png';
    static createNewPlayfield() {
        const canvas = document.querySelector('canvas')
        const c = canvas.getContext('2d')

        canvas.width = 610;
        canvas.height = 348;

        const image = new Image()
        image.src = Playfield.levelsImg;

        image.onload = function () {
            c.drawImage(image,
                968, 192,   // Start at 70/20 pixels from the left and the top of the image (crop),
                305, 174,   // "Get" a `50 * 50` (w * h) area from the source image (crop),
                0, 0,     // Place the result at 0, 0 in the canvas,
                610, 348); // With as width / height: 100 * 100 (scale)
        }
    }
}