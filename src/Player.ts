import Playfield from "./Playfield";
import laddersInfo from "../data/laddersInfo";
import platformsInfo from "../data/platformsInfo";
import fall from "./FallingAnimation"
import pointsInfo from "../data/pointsInfo";
import ScoreBarInfo from "./ScoreBarInfo";
import Enemies from "./Enemies";

export default class Player {
    public static animation: any;
    public static walkingAudio = new Audio('../mp3/step.mp3');
    public static fallAudio = new Audio('../mp3/fall.mp3');
    public playerImg: string = '../imgs/player.png';
    public static pauseBonusInterval = false;
    public static info: { x: number, y: number, speed: number, immortal: number, frame: number, moving: Boolean, currentLadder: number, currentPlatform: number, falling: boolean, jump: { jumping: boolean, xStart: number, yStart: number, direction: string, jumpStatus: string } }
    public static settings: { fpsInterval: number, startTime: number, now: number, then: number, elapsed: number };
    public playfield = new Playfield();
    public static playerSheet = new Image()
    public static ctx: any;
    public static canvas = document.querySelector('canvas');
    public static keys: Array<Boolean> = [];
    public static countBonusInterval: any;
    public static frames = [
        {
            //na wprost
            x: 0,
            y: 22
        },
        {
            //lewo
            x: 18,
            y: 33
        },
        {
            //lewo 2
            x: 0,
            y: 33
        },
        {
            //prawo
            x: 54,
            y: 33
        },
        {
            //prawo 2
            x: 36,
            y: 33
        },
        {
            //ręce do góry
            x: 18,
            y: 44
        },
        {
            //drabina 1
            x: 0,
            y: 44
        },
        {
            //drabina 2
            x: 36,
            y: 55
        },
        { //skok w lewo
            x: 0,
            y: 44
        },
        { //skok w prawo
            x: 36,
            y: 44
        },
        {//spdanie dol  10
            x: 0,
            y: 77
        },
        {//spadanie prawo  11
            x: 18,
            y: 77
        },
        {//spadanie lewo  12
            x: 54,
            y: 77
        },
        {//spadanie góra  13
            x: 36,
            y: 77
        },
        { //gwiazdki 1 14
            x: 0,
            y: 88
        },
        { //gwiazdki 2 15
            x: 18,
            y: 88
        }
    ]
    constructor() {
        Player.info = {
            x: 152,
            y: 70,
            speed: 4,
            immortal: 20,
            frame: 0,
            moving: false,
            currentLadder: -1,
            currentPlatform: -1,
            falling: false,
            jump: {
                jumping: false,
                xStart: 0,
                yStart: 0,
                direction: "none",
                jumpStatus: "none"
            }
        }
        //var canvas = document.querySelector('canvas')
        Player.ctx = Player.canvas.getContext('2d')
        Player.playerSheet.src = this.playerImg;
        this.playfield.createNewPlayfield();
        Player.drawPlayerOnStart();
    }

    static drawPlayerOnStart() {
        var xCut: number, yCut: number;
        let i = 0;
        new Audio('../mp3/start.mp3').play()
        var animatePlayerOnStart = window.setInterval(function () {
            switch (i) {
                case 0:
                    xCut = 0;
                    yCut = 0;
                    break;
                case 1:
                    xCut = 18;
                    yCut = 0;
                    break;
                case 2:
                    xCut = 36;
                    yCut = 0;
                    break;
                case 3:
                    xCut = 54;
                    yCut = 0;
                    break;
                case 4:
                    xCut = 72;
                    yCut = 0;
                    break;
                case 5:
                    xCut = 0;
                    yCut = 11;
                    break;
                case 6:
                    xCut = 18;
                    yCut = 11;
                    break;
                case 7:
                    xCut = 36;
                    yCut = 11;
                    break;
                case 8:
                    xCut = 54;
                    yCut = 11;
                    break;
                case 9:
                    xCut = 0;
                    yCut = 22;
                    break;
            }

            Player.ctx.drawImage(Player.playerSheet,
                xCut, yCut,   // Start at 70/20 pixels from the left and the top of the image (crop),
                16, 10,   // "Get" a `50 * 50` (w * h) area from the source image (crop),
                Player.info.x, Player.info.y,     // Place the result at 0, 0 in the canvas,
                16, 10); // With as width / height: 100 * 100 (scale)

            if (i >= 9) {
                clearInterval(animatePlayerOnStart);
                Player.addKeyboardsEvents();
                Player.startAnimating(20)
                Player.pauseBonusInterval = false;
            }
            i++
        }, 70)
    }

    static addKeyboardsEvents() {
        var left: any;

        window.addEventListener("keydown", function (e) {
            Player.keys[e.keyCode] = true;
        });
        window.addEventListener("keyup", function (e) {
            Player.info.moving = false;
            delete Player.keys[e.keyCode];
        });
    }

    static movePlayer() {
        if (Player.info.falling) {
            Player.pauseBonusInterval = true;
            Player.scorePoint();
            fall();
            return
        }
        //góra skok
        if (Player.keys[32] && Player.keys[38] && Player.info.jump.jumping == false) {
            new Audio('../mp3/jump.mp3').play()
            Player.info.jump.jumping = true;
            Player.info.moving = true;
            Player.info.jump.xStart = Player.info.x
            Player.info.jump.yStart = Player.info.y
            Player.info.jump.direction = "up"
            Player.info.jump.jumpStatus = "up"
        }
        //góra
        else if (Player.keys[38] && Player.info.y > 2 && Player.checkIfCanGoVertically("move") && Player.info.jump.jumping == false) {
            if (Player.info.y - Player.info.speed - laddersInfo[Player.info.currentLadder].y < laddersInfo[Player.info.currentLadder].height && Player.info.y - Player.info.speed - laddersInfo[Player.info.currentLadder].y >= -6) {
                Player.info.y -= Player.info.speed / 2;
                if (Player.info.x != laddersInfo[Player.info.currentLadder].x) {
                    Player.info.x = laddersInfo[Player.info.currentLadder].x
                }

                if (Player.info.frame != 6 && Player.info.frame != 7) Player.info.frame = 6;
                else if (Player.info.frame == 6) Player.info.frame = 7;
                else if (Player.info.frame == 7) Player.info.frame = 6;
                Player.info.moving = true
                Player.walkingAudio.play()
            }
        }
        //lewo
        if (Player.keys[32] && Player.keys[37] && Player.info.jump.jumping == false) {
            new Audio('../mp3/jump.mp3').play()
            Player.info.jump.jumping = true;
            Player.info.moving = true;
            Player.info.jump.xStart = Player.info.x
            Player.info.jump.yStart = Player.info.y
            Player.info.jump.direction = "left"
            Player.info.jump.jumpStatus = "up"
        }
        else if (Player.keys[37] && Player.info.jump.jumping == false) {
            if (Player.checkIfCanGoHorizontally()) {
                Player.info.x -= Player.info.speed;
                if (platformsInfo[Player.info.currentPlatform].y - Player.info.y < 10) {
                    Player.info.y -= Player.info.speed / 2
                }
                if (Player.info.frame != 1 && Player.info.frame != 2) Player.info.frame = 1;
                else if (Player.info.frame == 1) Player.info.frame = 2;
                else if (Player.info.frame == 2) Player.info.frame = 1;
                Player.info.moving = true
                Player.walkingAudio.play()
            }
            if (Player.info.x < platformsInfo[Player.info.currentPlatform].x - 8) {
                Player.info.x -= Player.info.speed;
                Player.info.falling = true
                Player.fallAudio.currentTime = 0;
                Player.fallAudio.play()
            }

        }
        //prawo skok
        if (Player.keys[32] && Player.keys[39] && Player.info.jump.jumping == false) {
            new Audio('../mp3/jump.mp3').play()
            Player.info.jump.jumping = true;
            Player.info.moving = true;
            Player.info.jump.xStart = Player.info.x
            Player.info.jump.yStart = Player.info.y
            Player.info.jump.direction = "right"
            Player.info.jump.jumpStatus = "up"
        }
        //prawo
        else if (Player.keys[39] && Player.info.jump.jumping == false) {
            if (Player.checkIfCanGoHorizontally()) {
                Player.info.x += Player.info.speed;
                if (platformsInfo[Player.info.currentPlatform].y - Player.info.y < 10) {
                    Player.info.y -= Player.info.speed / 2
                }
                if (Player.info.frame != 3 && Player.info.frame != 4) Player.info.frame = 3;
                else if (Player.info.frame == 3) Player.info.frame = 4;
                else if (Player.info.frame == 4) Player.info.frame = 3;
                Player.info.moving = true
                Player.walkingAudio.play()
            }
            if (Player.info.x >= platformsInfo[Player.info.currentPlatform].x + platformsInfo[Player.info.currentPlatform].width - 4) {
                Player.info.x += Player.info.speed + 2;
                Player.info.falling = true
                Player.fallAudio.currentTime = 0;
                Player.fallAudio.play()
            }
        }
        //dół
        if (Player.keys[40] && Player.info.y < 184 - 10 && Player.checkIfCanGoVertically("move") && Player.info.jump.jumping == false) {
            if (Player.info.y + Player.info.speed - laddersInfo[Player.info.currentLadder].y < laddersInfo[Player.info.currentLadder].height && Player.info.y + Player.info.speed - laddersInfo[Player.info.currentLadder].y >= -6) {
                Player.info.y += Player.info.speed / 2;
                if (Player.info.x != laddersInfo[Player.info.currentLadder].x) {
                    Player.info.x = laddersInfo[Player.info.currentLadder].x
                }
                if (Player.info.frame != 6 && Player.info.frame != 7) Player.info.frame = 6;
                else if (Player.info.frame == 6) Player.info.frame = 7;
                else if (Player.info.frame == 7) Player.info.frame = 6;
                Player.info.moving = true
                Player.walkingAudio.play()
            }
        }

        if (!Player.info.moving) {
            Player.info.frame = 0;
        }

        if (Player.checkIfCanGoVertically("stand") && !Player.info.moving) {
            Player.info.frame = 5;
        }

        if (Player.info.jump.jumping) {
            if (Player.info.jump.direction == "left") {
                Player.info.frame = 8
                if (Player.info.jump.yStart - Player.info.y < 11 && Player.info.jump.xStart - Player.info.x < 44 && Player.info.jump.jumpStatus == "up") {
                    if (Player.info.jump.yStart - Player.info.y == 10) {
                        Player.info.y = Player.info.y - 1
                        Player.info.jump.jumpStatus = "top"
                    } else {
                        Player.info.y = Player.info.y - Player.info.speed / 2
                    }

                    // if ((Player.info.jump.yStart - Player.info.y) % 4 == 0) {
                    //     Player.info.x = Player.info.x - Player.info.speed
                    // } else Player.info.x = Player.info.x - 1

                    if ((Player.info.jump.yStart - Player.info.y) % 4 == 0) {
                    } else Player.info.x = Player.info.x - Player.info.speed

                } else if (Player.info.jump.jumpStatus == "top") {
                    Player.info.x = Player.info.x - Player.info.speed / 2
                    if (Player.info.jump.xStart - Player.info.x >= 28) {
                        Player.info.jump.jumpStatus = "down"
                    }
                } else if (Player.info.jump.jumpStatus == "down") {
                    if (Player.info.jump.yStart - Player.info.y == 11) {
                        Player.info.y = Player.info.y + 1
                    } else {
                        Player.info.y = Player.info.y + Player.info.speed / 2
                    }

                    // if ((Player.info.jump.yStart - Player.info.y) % 4 == 0) {
                    //     Player.info.x = Player.info.x - Player.info.speed
                    // } else Player.info.x = Player.info.x - 1

                    if ((Player.info.jump.yStart - Player.info.y) % 4 == 0) {
                    } else Player.info.x = Player.info.x - Player.info.speed
                }
            } else if (Player.info.jump.direction == "right") {
                Player.info.frame = 9
                if (Player.info.jump.yStart - Player.info.y < 11 && Player.info.x - Player.info.jump.xStart < 44 && Player.info.jump.jumpStatus == "up") {
                    if (Player.info.jump.yStart - Player.info.y == 10) {
                        Player.info.y = Player.info.y - 1
                        Player.info.jump.jumpStatus = "top"
                    } else {
                        Player.info.y = Player.info.y - Player.info.speed / 2
                    }

                    if ((Player.info.jump.yStart - Player.info.y) % 4 == 0) {
                    } else Player.info.x = Player.info.x + Player.info.speed

                } else if (Player.info.jump.jumpStatus == "top") {
                    Player.info.x = Player.info.x + Player.info.speed / 2
                    if (Player.info.x - Player.info.jump.xStart >= 28) {
                        Player.info.jump.jumpStatus = "down"
                    }
                } else if (Player.info.jump.jumpStatus == "down") {
                    if (Player.info.jump.yStart - Player.info.y == 11) {
                        Player.info.y = Player.info.y + 1
                    } else {
                        Player.info.y = Player.info.y + Player.info.speed / 2
                    }

                    if ((Player.info.jump.yStart - Player.info.y) % 4 == 0) {
                    } else Player.info.x = Player.info.x + Player.info.speed

                }
            } else if (Player.info.jump.direction == "up") {
                Player.info.frame = 5
                if (Player.info.jump.yStart - Player.info.y < 11 && Player.info.jump.jumpStatus == "up") {
                    if (Player.info.jump.yStart - Player.info.y == 10) {
                        Player.info.y = Player.info.y - 1
                        Player.info.jump.jumpStatus = "hold"
                    } else {
                        Player.info.y = Player.info.y - Player.info.speed / 2
                    }

                } else if (Player.info.jump.jumpStatus.substring(0, 4) == "hold") {
                    if (Player.info.jump.jumpStatus == "hold") { Player.info.jump.jumpStatus = "hold0" }
                    else {
                        let x = Player.info.jump.jumpStatus.substring(4, 5)
                        let num: number = parseInt(x);
                        num++
                        Player.info.jump.jumpStatus = "hold" + num.toString()
                        if (Player.info.jump.jumpStatus == "hold2") {
                            Player.info.jump.jumpStatus = "down"
                        }
                    }
                } else if (Player.info.jump.jumpStatus == "down") {
                    if (Player.info.jump.yStart - Player.info.y == 11) {
                        Player.info.y = Player.info.y + 1
                    } else {
                        Player.info.y = Player.info.y + Player.info.speed / 2
                    }
                }
            } else { console.log('error') }
            if ((Player.checkIfCanGoVertically("jump") || Player.checkIfCanGoHorizontally()) && Player.info.jump.jumpStatus != "up") {
                if (Player.info.y % 2 != 0) Player.info.y--
                Player.info.jump.jumping = false
                Player.info.moving = false
            }

            if (Player.info.jump.jumpStatus != "up" && Player.info.y - Player.info.jump.yStart == 16) {
                Player.info.falling = true
                Player.fallAudio.currentTime = 0;
                Player.fallAudio.play()
            }
        }
        Enemies.move()
        if (Player.info.immortal <= 0) Player.checkHitByEnemy();
        Player.scorePoint();
        Player.info.immortal--
    }


    static animate() {
        Player.animation = requestAnimationFrame(Player.animate);
        Player.settings.now = Date.now();
        Player.settings.elapsed = Player.settings.now - Player.settings.then;
        if (Player.settings.elapsed > Player.settings.fpsInterval) {
            Player.settings.then = Player.settings.now - (Player.settings.elapsed % Player.settings.fpsInterval);
            Player.ctx.clearRect(0, 0, 320, 200);
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
            Player.ctx.drawImage(Player.playerSheet,
                Player.frames[Player.info.frame].x, Player.frames[Player.info.frame].y,   // Start at 70/20 pixels from the left and the top of the image (crop),
                16, 10,   // "Get" a `50 * 50` (w * h) area from the source image (crop),
                Player.info.x, Player.info.y,     // Place the result at 0, 0 in the canvas,
                16, 10); // With as width / height: 100 * 100 (scale)
            Player.ctx.drawImage(Playfield.scorebar,
                0, 0,   // Start at 70/20 pixels from the left and the top of the image (crop),
                320, 16,   // "Get" a `50 * 50` (w * h) area from the source image (crop),
                0, 184,     // Place the result at 0, 0 in the canvas,
                320, 16); // With as width / height: 100 * 100 (scale)
            ScoreBarInfo.updateScoreBar();
            Player.movePlayer();
            if (ScoreBarInfo.scoredPoints.length == 16) {
                let allPoints = ScoreBarInfo.pointsValue + ScoreBarInfo.bonus
                if (confirm("Wygrałeś!, punkty: \n" + ScoreBarInfo.pointsValue + " (zebrane) \n" + ScoreBarInfo.bonus + " (bonus)\nRazem: " + allPoints + "\nChcesz zagrać jeszcze raz?") == true) {
                    location.reload();
                } else {
                    clearInterval(Player.countBonusInterval)
                    window.cancelAnimationFrame(Player.animation)
                    return
                }
            }
        }
    }

    static startAnimating(fps: number) {
        Player.settings = {
            fpsInterval: 1000 / fps,
            then: Date.now(),
            startTime: Date.now(),
            now: 0,
            elapsed: 0
        }
        Player.animate();
    }

    static checkIfCanGoVertically(type: string) {
        let stand = false
        let move = false
        let jump = false
        laddersInfo.forEach((ladder, index) => {
            if (Player.getDistance(Player.info.x, ladder.x) <= 8 && Player.info.y - ladder.y < ladder.height && Player.info.y - ladder.y >= -6) {
                Player.info.currentLadder = index
                stand = true;
                if (Player.getDistance(Player.info.x, ladder.x) <= 4) {
                    move = true
                }
                if (Player.getDistance(Player.info.x, ladder.x) <= 2 && Player.info.y - ladder.y > 0) {
                    Player.info.x = ladder.x
                    jump = true
                }
            }
        });
        if (type == "stand") {
            return stand
        } else if (type == "move") {
            return move
        } else if (type == "jump") {
            return jump
        }
    }

    static checkIfCanGoHorizontally() {
        let x = false;
        platformsInfo.forEach((platform, index) => {
            if (Player.info.x - platform.x < platform.width && Player.info.x - platform.x >= -8 && Player.info.y - platform.y <= 2 && Player.info.y - platform.y >= -10) {
                Player.info.currentPlatform = index
                x = true
            }
        })
        return x;
    }

    static scorePoint() {
        pointsInfo.forEach((point, index) => {
            if (point.x - Player.info.x <= 8 && point.x - Player.info.x >= -4 && point.y - Player.info.y < 10 && point.y - Player.info.y > -6) {
                let checkIfPointIsAlreadyInArray = false
                ScoreBarInfo.scoredPoints.forEach(num => {
                    if (num == index) checkIfPointIsAlreadyInArray = true
                })
                if (!checkIfPointIsAlreadyInArray) {
                    ScoreBarInfo.scoredPoints.push(index)
                    ScoreBarInfo.pointsValue += 100
                    new Audio('../mp3/point.mp3').play()
                }
            }
        })
    }

    static checkHitByEnemy() {
        Enemies.enemies.forEach(enemy => {
            if (enemy.x - Player.info.x <= 8 && enemy.x - Player.info.x >= -4 && enemy.y - Player.info.y < 8 && enemy.y - Player.info.y > -8) {
                Player.info.falling = true
                Player.fallAudio.currentTime = 0;
                Player.fallAudio.play()
            }
        })
    }

    // static getDistance(x1: number, y1: number, x2: number, y2: number) {
    //     let xDistance = x2 - x1
    //     let yDistance = y2 - y1
    //     return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
    // }

    static getDistance(x1: number, x2: number) {
        let xDistance = x2 - x1
        return Math.abs(xDistance);
    }
}