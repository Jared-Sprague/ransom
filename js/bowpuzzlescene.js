let BowPuzzleScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize: function () {
        Phaser.Scene.call(this, {key: 'bowpuzzlescene'});
    },

    create: function () {
        // Background image
        this.add.image(0, 0, 'puzzleroom').setOrigin(0, 0);

        // Add the bow
        let bowSprite = this.add.sprite(150, 270, 'bow');

        this.createBars();
    },

    update: function (time, delta) {

    },

    movePlayer: function (dir) {

    },

    doBack: function () {
        this.scene.start('mainmenu');
    },

    createBars: function () {
        this.bars = [];
        let totalBars = 3;
        let barsPositionX = 195;
        let barsPositionY = 70;

        // create the bars over the bow box
        for (let i = 0; i < totalBars; i++) {
            let bar = this.add.sprite(barsPositionX, barsPositionY += 100, 'puzzle_bar');
            this.bars.push(bar);

            // Animations
            this.anims.create({
                key: 'bar_slider',
                frames: this.anims.generateFrameNames('puzzle_bar'),
                frameRate: 12,
                repeat: -1
            });

            bar.anims.play('bar_slider');

            bar.setInteractive();

            bar.on('pointerdown', () => {
                console.log('clicked!!');

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

        for (let i = 0; i < this.bars.length; i++) {
            // noinspection JSValidateTypes
            if (!this.bars[i].anims.isPaused || this.bars[i].anims.currentFrame.index !== 1) {
                break;
            }
            else if (i + 1 === this.bars.length) {
                // all bars paused at correct index
                console.log("UNLOCKED!")
            }
        }
    }
});
