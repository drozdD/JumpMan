import laddersInfo from "../data/laddersInfo"
import platformsInfo from "../data/platformsInfo"
import Player from "./Player"

export default class Enemies {
    public static enemies: Array<{ color: string, x: number, y: number, movingDirection: string, frame: number, frames: Array<{ x: number, y: number }> }>
    constructor() {
        Enemies.enemies = [
            {
                color: "red",
                x: 8,
                y: 8,
                movingDirection: "down",
                frame: 0,
                frames: [
                    {   //up 1
                        x: 2,
                        y: 97
                    },
                    {   //up 2
                        x: 20,
                        y: 97
                    },
                    {   //left 1
                        x: 39,
                        y: 97
                    },
                    {   //left 2
                        x: 57,
                        y: 97
                    },
                    {   //right 1
                        x: 2,
                        y: 115
                    },
                    {   //right 2
                        x: 20,
                        y: 115
                    },
                ]
            },
            {
                color: "yellow",
                x: 232,
                y: 72,
                movingDirection: "right",
                frame: 0,
                frames: [
                    {
                        x: 74,
                        y: 97
                    },
                    {
                        x: 92,
                        y: 97
                    },
                    {
                        x: 111,
                        y: 97
                    },
                    {
                        x: 129,
                        y: 97
                    },
                    {   //right 1
                        x: 39,
                        y: 115
                    },
                    {   //right 2
                        x: 57,
                        y: 115
                    },
                ]
            },
            {
                color: "brown",
                x: 8,
                y: 136,
                movingDirection: "right",
                frame: 0,
                frames: [
                    {
                        x: 2,
                        y: 106
                    },
                    {
                        x: 20,
                        y: 106
                    },
                    {
                        x: 39,
                        y: 106
                    },
                    {
                        x: 57,
                        y: 106
                    },
                    {   //right 1
                        x: 74,
                        y: 115
                    },
                    {   //right 2
                        x: 92,
                        y: 115
                    },
                ]
            },
            {
                color: "grey",
                x: 296,
                y: 168,
                movingDirection: "up",
                frame: 0,
                frames: [
                    {
                        x: 74,
                        y: 106
                    },
                    {
                        x: 92,
                        y: 106
                    },
                    {
                        x: 111,
                        y: 106
                    },
                    {
                        x: 129,
                        y: 106
                    },
                    {   //right 1
                        x: 111,
                        y: 115
                    },
                    {   //right 2
                        x: 129,
                        y: 115
                    },
                ]
            },
            {
                color: "red",
                x: 8,
                y: 8,
                movingDirection: "down",
                frame: 0,
                frames: [
                    {   //up 1
                        x: 2,
                        y: 97
                    },
                    {   //up 2
                        x: 20,
                        y: 97
                    },
                    {   //left 1
                        x: 39,
                        y: 97
                    },
                    {   //left 2
                        x: 57,
                        y: 97
                    },
                    {   //right 1
                        x: 2,
                        y: 115
                    },
                    {   //right 2
                        x: 20,
                        y: 115
                    },

                ]
            }
        ]
    }

    static move() {
        for (var i = 0; i < Enemies.enemies.length; i++) {
            if (Enemies.enemies[i].movingDirection == "right") {
                if (Enemies.checkIfCanGoRight(i) == false) {
                    let canGo = []

                    if (Enemies.checkIfCanGoDown(i)) canGo.push('down')
                    if (Enemies.checkIfCanGoUp(i)) canGo.push('up')
                    if (canGo.length == 0) {
                        if (Enemies.checkIfCanGoLeft(i)) canGo.push('left')
                    }
                    let x = Enemies.randomNumberFrom0toX(canGo.length - 1)
                    Enemies.enemies[i].movingDirection = canGo[x]
                } else {
                    let canGo = []
                    if (Enemies.checkIfCanGoDown(i)) canGo.push('down')
                    if (Enemies.checkIfCanGoUp(i)) canGo.push('up')
                    if (Enemies.checkIfCanGoRight(i)) canGo.push('right')
                    if (canGo.length > 0) {
                        let x = Enemies.randomNumberFrom0toX(canGo.length - 1)
                        Enemies.enemies[i].movingDirection = canGo[x]
                    }
                }
            } else if (Enemies.enemies[i].movingDirection == "left") {
                if (Enemies.checkIfCanGoLeft(i) == false) {
                    let canGo = []

                    if (Enemies.checkIfCanGoDown(i)) canGo.push('down')
                    if (Enemies.checkIfCanGoUp(i)) canGo.push('up')
                    if (canGo.length == 0) {
                        if (Enemies.checkIfCanGoRight(i)) canGo.push('right')
                    }
                    let x = Enemies.randomNumberFrom0toX(canGo.length - 1)
                    Enemies.enemies[i].movingDirection = canGo[x]
                } else {
                    let canGo = []
                    if (Enemies.checkIfCanGoDown(i)) canGo.push('down')
                    if (Enemies.checkIfCanGoUp(i)) canGo.push('up')
                    if (Enemies.checkIfCanGoLeft(i)) canGo.push('left')
                    if (canGo.length > 0) {
                        let x = Enemies.randomNumberFrom0toX(canGo.length - 1)
                        Enemies.enemies[i].movingDirection = canGo[x]
                    }
                }
            } else if (Enemies.enemies[i].movingDirection == "down") {
                if (Enemies.checkIfCanGoDown(i) == false) {
                    let canGo = []
                    if (Enemies.checkIfCanGoLeft(i)) canGo.push('left')
                    if (Enemies.checkIfCanGoRight(i)) canGo.push('right')
                    // if (Enemies.checkIfCanGoUp(i)) canGo.push('up')
                    let x = Enemies.randomNumberFrom0toX(canGo.length - 1)
                    Enemies.enemies[i].movingDirection = canGo[x]
                } else {
                    let canGo = []
                    if (Enemies.checkIfCanGoLeft(i)) canGo.push('left')
                    if (Enemies.checkIfCanGoRight(i)) canGo.push('right')
                    if (Enemies.checkIfCanGoDown(i)) canGo.push("down")
                    if (canGo.length > 0) {
                        let x = Enemies.randomNumberFrom0toX(canGo.length - 1)
                        Enemies.enemies[i].movingDirection = canGo[x]
                    }
                }
            } else if (Enemies.enemies[i].movingDirection == "up") {
                if (Enemies.checkIfCanGoUp(i) == false) {
                    let canGo = []
                    if (Enemies.checkIfCanGoLeft(i)) canGo.push('left')
                    if (Enemies.checkIfCanGoRight(i)) canGo.push('right')
                    // if (Enemies.checkIfCanGoDown(i)) canGo.push('down')
                    let x = Enemies.randomNumberFrom0toX(canGo.length - 1)
                    Enemies.enemies[i].movingDirection = canGo[x]
                } else {
                    let canGo = []
                    if (Enemies.checkIfCanGoLeft(i)) canGo.push('left')
                    if (Enemies.checkIfCanGoRight(i)) canGo.push('right')
                    if (Enemies.checkIfCanGoUp(i)) canGo.push("up")
                    if (canGo.length > 0) {
                        let x = Enemies.randomNumberFrom0toX(canGo.length - 1)
                        Enemies.enemies[i].movingDirection = canGo[x]
                    }
                }
            }

            switch (Enemies.enemies[i].movingDirection) {
                case "right":
                    Enemies.enemies[i].x += Player.info.speed
                    if (Enemies.enemies[i].frame != 4 && Enemies.enemies[i].frame != 5) Enemies.enemies[i].frame = 4
                    else if (Enemies.enemies[i].frame == 4) Enemies.enemies[i].frame = 5
                    else if (Enemies.enemies[i].frame == 5) Enemies.enemies[i].frame = 4
                    break;
                case "left":
                    Enemies.enemies[i].x -= Player.info.speed
                    if (Enemies.enemies[i].frame != 2 && Enemies.enemies[i].frame != 3) Enemies.enemies[i].frame = 2
                    else if (Enemies.enemies[i].frame == 2) Enemies.enemies[i].frame = 3
                    else if (Enemies.enemies[i].frame == 3) Enemies.enemies[i].frame = 2
                    break;
                case "down":
                    Enemies.enemies[i].y += Player.info.speed / 2
                    if (Enemies.enemies[i].frame != 0 && Enemies.enemies[i].frame != 1) Enemies.enemies[i].frame = 0
                    else if (Enemies.enemies[i].frame == 0) Enemies.enemies[i].frame = 1
                    else if (Enemies.enemies[i].frame == 1) Enemies.enemies[i].frame = 0
                    break;
                case "up":
                    Enemies.enemies[i].y -= Player.info.speed / 2
                    if (Enemies.enemies[i].frame != 0 && Enemies.enemies[i].frame != 1) Enemies.enemies[i].frame = 0
                    else if (Enemies.enemies[i].frame == 0) Enemies.enemies[i].frame = 1
                    else if (Enemies.enemies[i].frame == 1) Enemies.enemies[i].frame = 0
                    break;
            }
        }
    }

    static checkIfCanGoRight(indexOfEnemy: number) {
        let x = false;
        platformsInfo.forEach((platform, index) => {
            if (platform.y - Enemies.enemies[indexOfEnemy].y == 8 && platform.x + platform.width - Enemies.enemies[indexOfEnemy].x > 16 && Enemies.enemies[indexOfEnemy].x - platform.x >= 0) {
                x = true
            }
        })
        return x;
    }

    static checkIfCanGoLeft(indexOfEnemy: number) {
        let x = false;
        platformsInfo.forEach((platform, index) => {
            if (platform.y - Enemies.enemies[indexOfEnemy].y == 8 && Enemies.enemies[indexOfEnemy].x - platform.x > 0 && platform.x + platform.width - Enemies.enemies[indexOfEnemy].x >= 16) {
                x = true
            }
        })
        return x;
    }

    static checkIfCanGoDown(indexOfEnemy: number) {
        let x = false;
        laddersInfo.forEach((ladder, index) => {
            if (ladder.x - Enemies.enemies[indexOfEnemy].x == 0 && ladder.y + ladder.height - Enemies.enemies[indexOfEnemy].y > 8 && ladder.y <= Enemies.enemies[indexOfEnemy].y) {
                x = true;
            }
        });
        return x;
    }

    static checkIfCanGoUp(indexOfEnemy: number) {
        let x = false;
        laddersInfo.forEach((ladder, index) => {
            if (ladder.x - Enemies.enemies[indexOfEnemy].x == 0 && ladder.y + ladder.height - Enemies.enemies[indexOfEnemy].y >= 8 && ladder.y < Enemies.enemies[indexOfEnemy].y) {
                x = true;
            }
        });
        return x;
    }

    static randomNumberFrom0toX(max: number) {
        return Math.floor(Math.random() * (max + 1));
    }
}