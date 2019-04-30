let BowPuzzleScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize: function () {
        Phaser.Scene.call(this, {key: 'bowpuzzlescene'});
    },

    create: function (data) {
        // Background image
        this.add.image(0, 0, 'puzzleroom').setOrigin(0, 0);

        // Add the life bar
        this.life = data.life;
        this.createLifeBar();

        // Add the bow
        let bowSprite = this.add.sprite(150, 270, 'bow');

        // Add audio
        // this.music = this.sound.add('ost_bro', {loop: true});
        this.sfx_clunk = this.sound.add('sfx_clunk');
        this.sfx_stone = this.sound.add('sfx_stone');

        // this.music.play();

        this.createBars();
    },

    update: function (time, delta) {
        this.lifeBar.setScale(this.life / 100, 1);
    },

    doBack: function () {
        this.scene.start('lobby');
    },

    createBars: function () {
        this.lockedBars = [];
        let totalBars = 3;
        let barsPositionX = 195;
        let barsPositionY = 70;
        let startingAngle = 0;

        // Animations
        let frames = this.anims.generateFrameNames('puzzle_bar');
        this.anims.create({
            key: 'bar_slider',
            frames: frames,
            frameRate: 12,
            repeat: -1
        });

        // create the bars over the bow box
        for (let i = 0; i < totalBars; i++) {
            let bar = this.add.sprite(barsPositionX, barsPositionY += 100, 'puzzle_bar');
            bar.angle = startingAngle;
            startingAngle -= 2;
            this.lockedBars.push(bar);

            bar.anims.play('bar_slider', true, Phaser.Math.Between(0, frames.length - 1));
            bar.setInteractive();

            bar.on('pointerdown', () => {
                console.log('clicked!!');
                this.sfx_clunk.play();

                if (bar.anims.isPaused) {
                    bar.anims.resume();
                } else {
                    bar.anims.pause();
                    this.checkUnlockSuccess();
                }
            });
        }
    },

    checkUnlockSuccess: function () {
        console.log('check unlock');

        for (let i = 0; i < this.lockedBars.length; i++) {
            let textureFrame = this.lockedBars[i].anims.currentFrame.textureFrame;
            console.log('bar state: ', i, this.lockedBars[i].anims.isPaused, textureFrame);

            // noinspection JSValidateTypes
            if (!this.lockedBars[i].anims.isPaused || (textureFrame !== "017" && textureFrame !== "006")) {
                console.log('breaking on index i:', i);
                break;
            }
            else if (i + 1 === this.lockedBars.length) {
                // all bars paused at correct index
                console.log("UNLOCKED!");
                this.unlockBars();
            }
        }
    },

    unlockBars: function () {
        this.unlockedBars = [];
        let totalBars = 3;
        let barsPositionX = 195;
        let barsPositionY = 70;
        let startingAngle = 0;

        // First remove all the locked bars
        for (let i = 0; i < this.lockedBars.length; i++) {
            this.lockedBars[i].destroy();
        }

        // Create bar opening animation
        let frames = this.anims.generateFrameNames('bar_open');
        this.anims.create({
            key: 'open_bar',
            frames: frames,
            frameRate: 4,
            repeat: 0
        });

        this.sfx_stone.play();

        // create the bars over the bow box
        for (let i = 0; i < totalBars; i++) {
            let bar = this.add.sprite(barsPositionX, barsPositionY += 100, 'bar_open');
            bar.angle = startingAngle;
            startingAngle -= 2;
            this.unlockedBars.push(bar);

            bar.anims.play('open_bar');
        }
    },

    createLifeBar: function () {
        this.add.image(900, 40, 'emptybar').setOrigin(0, 0);
        this.lifeBar = this.add.image(908, 47, 'fullbar').setOrigin(0, 0);

        this.lifeBar.setScale(this.life / 100, 1);
    }
 });
