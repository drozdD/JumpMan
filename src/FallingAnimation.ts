import Player from "./Player"
import ScoreBarInfo from "./ScoreBarInfo";

class FallingAnimation {
    static run: boolean = false;
    static bongStatus: string = "none";
    static yOnBongStart = 0;
    static bongDirection: string;
    static done: boolean = false;
    static doneLvl: number = 0;
    static animationDone: boolean = false;
    public static fall() {
        if (FallingAnimation.animationDone) return
        if (FallingAnimation.run == false) {
            let randomPostition = Math.floor(Math.random() * (13 - 10)) + 10;
            Player.info.frame = randomPostition;
            FallingAnimation.run = true
            FallingAnimation.animationDone = false
        }

        if (Player.checkIfCanGoHorizontally() && FallingAnimation.bongStatus == "none" && !FallingAnimation.done) {
            FallingAnimation.yOnBongStart = Player.info.y
            FallingAnimation.bongStatus = "up";
            new Audio('../mp3/bong.mp3').play()
            let random = Math.random()
            if (random <= 0.33) {
                FallingAnimation.bongDirection = "right"
            } else if (random > 0.33 && random <= 0.66) {
                FallingAnimation.bongDirection = "straight"
            } else {
                FallingAnimation.bongDirection = "left"
            }
        }
        if (FallingAnimation.bongStatus != "none" && !FallingAnimation.done) {
            if (Player.info.y - FallingAnimation.yOnBongStart < 1) {
                switch (Player.info.frame) {
                    case 10:
                        Player.info.frame = 12
                        break;
                    case 12:
                        Player.info.frame = 13
                        break;
                    case 13:
                        Player.info.frame = 11
                        break;
                    case 11:
                        Player.info.frame = 10
                        break;
                }
            }

            if (FallingAnimation.bongStatus == "up") {
                Player.info.y -= 3
                if (FallingAnimation.bongDirection == "right") Player.info.x += 2
                if (FallingAnimation.bongDirection == "left") Player.info.x -= 2
                if (FallingAnimation.yOnBongStart - Player.info.y == 9) {
                    FallingAnimation.bongStatus = "down"
                }
            } else if (FallingAnimation.bongStatus == "down") {
                Player.info.y += 3
                if (FallingAnimation.bongDirection == "right") Player.info.x += 2
                if (FallingAnimation.bongDirection == "left") Player.info.x -= 2
                if (Player.info.y - FallingAnimation.yOnBongStart == 9) {
                    FallingAnimation.bongStatus = "none"
                }
            }
        }

        if (FallingAnimation.bongStatus == "none" && !FallingAnimation.done) Player.info.y += Player.info.speed
        if (Player.info.y >= 170 && FallingAnimation.done == false) {
            Player.info.y = 172
            FallingAnimation.done = true
            if (!Player.fallAudio.paused) Player.fallAudio.pause()
            new Audio('../mp3/death.mp3').play()
            console.log('ge')
        }
        if (FallingAnimation.done) {
            if (Player.info.frame != 14 && Player.info.frame != 15) Player.info.frame = 14
            else if (Player.info.frame == 14) Player.info.frame = 15
            else if (Player.info.frame == 15) Player.info.frame = 14
            FallingAnimation.doneLvl++
            if (FallingAnimation.doneLvl == 100) {
                FallingAnimation.doneLvl = 0
                FallingAnimation.run = false
                FallingAnimation.done = false;
                FallingAnimation.bongStatus = "none"
                FallingAnimation.animationDone = false
                Player.info.falling = false
                ScoreBarInfo.lives -= 1
                if (ScoreBarInfo.lives <= 0) {
                    if (confirm("You lost, points: " + ScoreBarInfo.pointsValue + "\nWant to play again?") == true) {
                        location.reload();
                    } else {
                        clearInterval(Player.countBonusInterval)
                        window.cancelAnimationFrame(Player.animation)
                        return
                    }
                }
                window.cancelAnimationFrame(Player.animation);
                Player.animation = undefined
                new Player();
            }
        }
    }
}

export default FallingAnimation.fall