import ScoreBarInfo from "./ScoreBarInfo";
import Player from "./Player";
import pointsInfo from "../data/pointsInfo";
import Enemies from "./Enemies";
export default class Playfield {
    public static levelsImg: string = '../imgs/levels.png';
    public static scoreBar: string = '../imgs/scoreBar.png';
    //public static enimiesImg: string = "../imgs/enemies.png"
    public static plansza = new Image();
    public static scorebar = new Image();
    public static enemiesImg = new Image();

    constructor() {
        Playfield.plansza.src = Playfield.levelsImg;
        Playfield.scorebar.src = Playfield.scoreBar;
        Playfield.enemiesImg.src = "../imgs/enemies.png"
    }

    createNewPlayfield() {
        // Player.ctx.clearRect(0, 0, 320, 200);

        Player.canvas.width = 320;
        // canvas.height = 174;
        Player.canvas.height = 200;
        if (Player.ctx) Player.ctx.clearRect(0, 0, 320, 200)

        Playfield.plansza.onload = function () {
            Player.ctx.drawImage(Playfield.plansza,
                960, 184,   // Start at 70/20 pixels from the left and the top of the image (crop),
                320, 184,   // "Get" a `50 * 50` (w * h) area from the source image (crop),
                0, 0,     // Place the result at 0, 0 in the canvas,
                320, 184); // With as width / height: 100 * 100 (scale)

            ScoreBarInfo.scoredPoints.forEach((pointIndex) => {
                Player.ctx.beginPath();
                Player.ctx.fillStyle = '#191D19';
                Player.ctx.fillRect(pointsInfo[pointIndex].x, pointsInfo[pointIndex].y, 8, 6);
                Player.ctx.stroke();
            })

            Enemies.enemies.forEach(enemy => {
                Player.ctx.drawImage(Playfield.enemiesImg,
                    enemy.frames[enemy.frame].x, enemy.frames[enemy.frame].y,   // Start at 70/20 pixels from the left and the top of the image (crop),
                    16, 8,   // "Get" a `50 * 50` (w * h) area from the source image (crop),
                    enemy.x, enemy.y,     // Place the result at 0, 0 in the canvas,
                    16, 8); // With as width / height: 100 * 100 (scale)
            })


        }

        Playfield.scorebar.onload = function () {
            Player.ctx.drawImage(Playfield.scorebar,
                0, 0,   // Start at 70/20 pixels from the left and the top of the image (crop),
                320, 16,   // "Get" a `50 * 50` (w * h) area from the source image (crop),
                0, 184,     // Place the result at 0, 0 in the canvas,
                320, 16); // With as width / height: 100 * 100 (scale)
        }

        console.log('New Playfield')
    }

}