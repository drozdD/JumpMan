export default class Playfield {
    public static levelsImg: string = '../imgs/levels.png';
    public static scoreBar: string = '../imgs/scoreBar.png';
    public static plansza = new Image();
    public static scorebar = new Image();

    constructor() {
        Playfield.plansza.src = Playfield.levelsImg;
        Playfield.scorebar.src = Playfield.scoreBar;
        this.createNewPlayfield();
    }

    createNewPlayfield() {
        const canvas = document.querySelector('canvas')
        const c = canvas.getContext('2d')

        canvas.width = 320;
        // canvas.height = 174;
        canvas.height = 200;

        Playfield.plansza.onload = function () {
            c.drawImage(Playfield.plansza,
                960, 184,   // Start at 70/20 pixels from the left and the top of the image (crop),
                320, 184,   // "Get" a `50 * 50` (w * h) area from the source image (crop),
                0, 0,     // Place the result at 0, 0 in the canvas,
                320, 184); // With as width / height: 100 * 100 (scale)
        }


        Playfield.scorebar.onload = function () {
            c.drawImage(Playfield.scorebar,
                0, 0,   // Start at 70/20 pixels from the left and the top of the image (crop),
                320, 16,   // "Get" a `50 * 50` (w * h) area from the source image (crop),
                0, 184,     // Place the result at 0, 0 in the canvas,
                320, 16); // With as width / height: 100 * 100 (scale)
        }
    }

}