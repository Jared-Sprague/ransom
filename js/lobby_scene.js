let LobbyScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function LobbyScene() {
            Phaser.Scene.call(this, {key: 'lobby_scene'});
        },

    preload: function () {
    },

    create: function (data) {
        this.puzzleSolved = data.puzzleSolved;
        this.bossForceFieldActive = !data.puzzleSolved;
        this.puzzleForceFieldActive = data.puzzleSolved;

        // Add background image
        this.background = this.add.image(0, 0, 'underworldlobby').setOrigin(0, 0);
        this.background.setInteractive();
        this.background.on('pointerup', (pointer) => {
            this.playerMoveToPoint(pointer.upX, pointer.upY);
        });

        if (!data.music) {
            this.music = this.sound.add('ost_bro', {loop: true});
        }
        else {
            this.music = data.music;
        }

        if (!this.music.isPlaying) {
            this.music.play();
        }


        this.life = data.life;
        this.createLifeBar();

        // start decrementing life
        this.lifeInterval = setInterval(() => {
            if (this.life > 0) {
                this.life--;
                if (this.life <= 0) {
                    // Player died, transition to end state
                    this.life = 0;
                    console.log("player died");
                    this.music.stop();
                    this.scene.start('badend_scene');
                }
            }
        }, 1000);

        this.events.on('shutdown', () => {
            console.log("shutdown");
            clearInterval(this.lifeInterval);
        });

        // Puzzle Door
        let puzzleDoor = this.add.sprite(0, 270, 'puzzle_door').setOrigin(0, 0);
        puzzleDoor.setInteractive();

        puzzleDoor.on('pointerup', () => {
            this.doPuzzleDoor();
        });

        // Boss Door
        let bossDoor = this.add.sprite(1208, 277, 'boss_door').setOrigin(0, 0);
        bossDoor.setInteractive();

        bossDoor.on('pointerup', () => {
            this.doBossDoor();
        });

        // Sign
        let sign = this.add.sprite(565, 404, 'sign').setOrigin(0, 0);
        sign.setInteractive();

        sign.on('pointerup', () => {
            this.doSign();
        });


        if (this.bossForceFieldActive) {
            let bossField = this.add.sprite(1200, 400, 'forcefield');
            bossField.setScale(1, 1.6);
        }

        if (this.puzzleForceFieldActive) {
            let puzzleField = this.add.sprite(0, 170, 'forcefield').setOrigin(0, 0);
            puzzleField.setScale(1, 1.4);
            puzzleField.flipX = true;
        }

        // add boy
        this.boy = this.physics.add.sprite(400, 500, 'walking');
        this.boy.setScale(0.8);
        this.boy.setData("is_walking", false);
        this.moveToX = this.boy.x;
        this.moveToY = this.boy.y;

        this.walkSpeed = 3;
    },

    update: function () {
        this.lifeBar.setScale(this.life / 100, 1);

        // see if we need to move player
        if (this.moveToX !== this.boy.x || this.moveToY !== this.boy.y) {

            if (!this.boy.getData("is_walking")) {
                this.boy.setData("is_walking", true);
                this.boy.anims.play("walk");
            }

            if (this.moveToX > this.boy.x) {
                this.boy.x += this.walkSpeed;
                this.boy.flipX = false;
            }
            else {
                this.boy.flipX = true;
                this.boy.x -= this.walkSpeed;
            }
            if (Math.abs(this.moveToX - this.boy.x) <= 7)
                this.boy.x = this.moveToX;

            if (this.moveToY > this.boy.y) {
                this.boy.y += this.walkSpeed;
            }
            else {
                this.boy.y -= this.walkSpeed;
            }
            if (Math.abs(this.moveToY - this.boy.y) <= 7)
                this.boy.y = this.moveToY
        }
        else if (this.boy.getData("is_walking")) {
            this.boy.anims.stop();
            this.boy.setFrame("000_0");
            this.boy.setData("is_walking", false);
        }

    },


    doPuzzleDoor: function () {
        if (this.puzzleForceFieldActive) return;

        console.log("puzle door clicked");

        // go to puzzle room
        this.scene.start('bowpuzzlescene', {life: this.life, music: this.music});
    },



    doBossDoor: function () {
        if (this.bossForceFieldActive) return;

        this.music.stop();

        // this.scene.start('controller_scene');
        console.log("boss door clicked");

        // go to boss room
        this.scene.start('boss_scene', {life: this.life});
    },

    doSign: function () {
        console.log("sign clicked");
        this.scene.start('sign_scene', {
            life: this.life,
            puzzleSolved: this.puzzleSolved,
            music: this.music,
        });
    },

    createLifeBar: function () {
        this.add.image(900, 40, 'emptybar').setOrigin(0, 0);
        this.lifeBar = this.add.image(908, 47, 'fullbar').setOrigin(0, 0);

        this.lifeBar.setScale(this.life / 100, 1);
    },

    playerMoveToPoint(x, y) {
        console.log("move player to x, y: ", x, y);

        this.moveToX = x;
        this.moveToY = y - (this.boy.displayHeight / 2);

        if (this.moveToY < 360)
            this.moveToY = 360;
    }
});
