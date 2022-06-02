import Player from "./Player";

export default class ScoreBarInfo {
    public static scoredPoints: Array<number> = [];
    public static bonus: number;
    public static lives: number
    public static pointsValue: number
    public static numberImg = new Image();
    public static livesPostion: { x: number, y: number } = {
        x: 105,
        y: 184
    }
    public static pointsPostion: Array<{ x: number, y: number }> = [
        {
            x: 81,
            y: 192
        },
        {
            x: 89,
            y: 192
        },
        {
            x: 97,
            y: 192
        },
    ]
    public static bonusPostion: Array<{ x: number, y: number }> = [
        {
            x: 273,
            y: 192
        },
        {
            x: 281,
            y: 192
        },
        {
            x: 97,
            y: 192
        },
    ]
    constructor() {
        ScoreBarInfo.bonus = 1500
        ScoreBarInfo.lives = 3
        ScoreBarInfo.pointsValue = 0
        ScoreBarInfo.numberImg.src = "../imgs/numbers.png"
        Player.countBonusInterval = window.setInterval(function () {
            if (!Player.pauseBonusInterval) {
                ScoreBarInfo.bonus -= 100
                new Audio('../mp3/bonus.mp3').play()
                if (ScoreBarInfo.bonus == 0) clearInterval(Player.countBonusInterval)
            }
        }, 5000)
    }

    static updateScoreBar() {
        ScoreBarInfo.resetScoreBar();
        Player.ctx.drawImage(ScoreBarInfo.numberImg,
            ScoreBarInfo.lives * 6, 0,   // Start at 70/20 pixels from the left and the top of the image (crop),
            6, 7,   // "Get" a `50 * 50` (w * h) area from the source image (crop),
            ScoreBarInfo.livesPostion.x, ScoreBarInfo.livesPostion.y,     // Place the result at 0, 0 in the canvas,
            6, 7); // With as width / height: 100 * 100 (scale)

        if (ScoreBarInfo.pointsValue >= 1000) {
            let x = String(ScoreBarInfo.pointsValue).charAt(0);
            let number = Number(x)
            Player.ctx.drawImage(ScoreBarInfo.numberImg,
                6 * number, 0,   // Start at 70/20 pixels from the left and the top of the image (crop),
                6, 7,   // "Get" a `50 * 50` (w * h) area from the source image (crop),
                81, 192,     // Place the result at 0, 0 in the canvas,
                6, 7); // With as width / height: 100 * 100 (scale)
            x = String(ScoreBarInfo.pointsValue).charAt(1);
            number = Number(x)
            Player.ctx.drawImage(ScoreBarInfo.numberImg,
                6 * number, 0,   // Start at 70/20 pixels from the left and the top of the image (crop),
                6, 7,   // "Get" a `50 * 50` (w * h) area from the source image (crop),
                81 + 8, 192,     // Place the result at 0, 0 in the canvas,
                6, 7); // With as width / height: 100 * 100 (scale)
            Player.ctx.drawImage(ScoreBarInfo.numberImg,
                0, 0,   // Start at 70/20 pixels from the left and the top of the image (crop),
                6, 7,   // "Get" a `50 * 50` (w * h) area from the source image (crop),
                81 + 8 * 2, 192,     // Place the result at 0, 0 in the canvas,
                6, 7); // With as width / height: 100 * 100 (scale)
            Player.ctx.drawImage(ScoreBarInfo.numberImg,
                0, 0,   // Start at 70/20 pixels from the left and the top of the image (crop),
                6, 7,   // "Get" a `50 * 50` (w * h) area from the source image (crop),
                81 + 8 * 3, 192,     // Place the result at 0, 0 in the canvas,
                6, 7); // With as width / height: 100 * 100 (scale)
        } else if (ScoreBarInfo.pointsValue >= 100) {
            let x = String(ScoreBarInfo.pointsValue).charAt(0);
            let number = Number(x)
            Player.ctx.drawImage(ScoreBarInfo.numberImg,
                6 * number, 0,   // Start at 70/20 pixels from the left and the top of the image (crop),
                6, 7,   // "Get" a `50 * 50` (w * h) area from the source image (crop),
                81 + 8, 192,     // Place the result at 0, 0 in the canvas,
                6, 7); // With as width / height: 100 * 100 (scale)
            Player.ctx.drawImage(ScoreBarInfo.numberImg,
                0, 0,   // Start at 70/20 pixels from the left and the top of the image (crop),
                6, 7,   // "Get" a `50 * 50` (w * h) area from the source image (crop),
                81 + 8 * 2, 192,     // Place the result at 0, 0 in the canvas,
                6, 7); // With as width / height: 100 * 100 (scale)
            Player.ctx.drawImage(ScoreBarInfo.numberImg,
                0, 0,   // Start at 70/20 pixels from the left and the top of the image (crop),
                6, 7,   // "Get" a `50 * 50` (w * h) area from the source image (crop),
                81 + 8 * 3, 192,     // Place the result at 0, 0 in the canvas,
                6, 7); // With as width / height: 100 * 100 (scale)
        } else {
            Player.ctx.drawImage(ScoreBarInfo.numberImg,
                0, 0,   // Start at 70/20 pixels from the left and the top of the image (crop),
                6, 7,   // "Get" a `50 * 50` (w * h) area from the source image (crop),
                81 + 8 * 3, 192,     // Place the result at 0, 0 in the canvas,
                6, 7); // With as width / height: 100 * 100 (scale)
        }

        if (ScoreBarInfo.bonus >= 1000) {
            let x = String(ScoreBarInfo.bonus).charAt(0);
            let number = Number(x)
            Player.ctx.drawImage(ScoreBarInfo.numberImg,
                6 * number, 0,   // Start at 70/20 pixels from the left and the top of the image (crop),
                6, 7,   // "Get" a `50 * 50` (w * h) area from the source image (crop),
                273, 192,     // Place the result at 0, 0 in the canvas,
                6, 7); // With as width / height: 100 * 100 (scale)
            x = String(ScoreBarInfo.bonus).charAt(1);
            number = Number(x)
            Player.ctx.drawImage(ScoreBarInfo.numberImg,
                6 * number, 0,   // Start at 70/20 pixels from the left and the top of the image (crop),
                6, 7,   // "Get" a `50 * 50` (w * h) area from the source image (crop),
                273 + 8, 192,     // Place the result at 0, 0 in the canvas,
                6, 7); // With as width / height: 100 * 100 (scale)
            Player.ctx.drawImage(ScoreBarInfo.numberImg,
                0, 0,   // Start at 70/20 pixels from the left and the top of the image (crop),
                6, 7,   // "Get" a `50 * 50` (w * h) area from the source image (crop),
                273 + 8 * 2, 192,     // Place the result at 0, 0 in the canvas,
                6, 7); // With as width / height: 100 * 100 (scale)
            Player.ctx.drawImage(ScoreBarInfo.numberImg,
                0, 0,   // Start at 70/20 pixels from the left and the top of the image (crop),
                6, 7,   // "Get" a `50 * 50` (w * h) area from the source image (crop),
                273 + 8 * 3, 192,     // Place the result at 0, 0 in the canvas,
                6, 7); // With as width / height: 100 * 100 (scale)
        } else if (ScoreBarInfo.bonus >= 100) {
            let x = String(ScoreBarInfo.bonus).charAt(0);
            let number = Number(x)
            Player.ctx.drawImage(ScoreBarInfo.numberImg,
                6 * number, 0,   // Start at 70/20 pixels from the left and the top of the image (crop),
                6, 7,   // "Get" a `50 * 50` (w * h) area from the source image (crop),
                273 + 8, 192,     // Place the result at 0, 0 in the canvas,
                6, 7); // With as width / height: 100 * 100 (scale)
            Player.ctx.drawImage(ScoreBarInfo.numberImg,
                0, 0,   // Start at 70/20 pixels from the left and the top of the image (crop),
                6, 7,   // "Get" a `50 * 50` (w * h) area from the source image (crop),
                273 + 8 * 2, 192,     // Place the result at 0, 0 in the canvas,
                6, 7); // With as width / height: 100 * 100 (scale)
            Player.ctx.drawImage(ScoreBarInfo.numberImg,
                0, 0,   // Start at 70/20 pixels from the left and the top of the image (crop),
                6, 7,   // "Get" a `50 * 50` (w * h) area from the source image (crop),
                273 + 8 * 3, 192,     // Place the result at 0, 0 in the canvas,
                6, 7); // With as width / height: 100 * 100 (scale)
        } else {
            Player.ctx.drawImage(ScoreBarInfo.numberImg,
                0, 0,   // Start at 70/20 pixels from the left and the top of the image (crop),
                6, 7,   // "Get" a `50 * 50` (w * h) area from the source image (crop),
                273 + 8 * 3, 192,     // Place the result at 0, 0 in the canvas,
                6, 7); // With as width / height: 100 * 100 (scale)
        }
    }

    static resetScoreBar() {
        Player.ctx.beginPath();
        Player.ctx.fillStyle = '#F7FF6C';
        Player.ctx.fillRect(103, 184, 15, 7);
        Player.ctx.stroke();

        Player.ctx.beginPath();
        Player.ctx.fillStyle = '#FFFFFF';
        Player.ctx.fillRect(81, 192, 30, 7);
        Player.ctx.stroke();

        Player.ctx.beginPath();
        Player.ctx.fillStyle = '#FFFFFF';
        Player.ctx.fillRect(273, 192, 30, 7);
        Player.ctx.stroke();
    }
}