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
        this.add.image(0, 0, 'underworldlobby').setOrigin(0, 0)

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
        this.boy = this.physics.add.sprite(400, 500, 'boy_fight');
        this.boy.setScale(0.4);
    },

    update: function () {
        this.lifeBar.setScale(this.life / 100, 1);
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
});
