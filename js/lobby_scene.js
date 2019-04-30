let LobbyScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function LobbyScene() {
            Phaser.Scene.call(this, {key: 'lobby_scene'});
        },

    preload: function () {
    },

    create: function (data) {
        this.forceFieldActive = true;

        // Add background image
        this.add.image(0, 0, 'underworldlobby').setOrigin(0, 0);

        this.music = this.sound.add('ost_bro', {loop: true});
        this.music.play();

        this.life = data.life;
        this.createLifeBar();

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

        // TODO: remove this sprite if puzzle room was solved
        if (this.forceFieldActive) {
            let forceField = this.add.sprite(1200, 400, 'forcefield');
            forceField.setScale(1, 1.6);
        }
    },

    update: function () {
        this.lifeBar.setScale(this.life / 100, 1);
    },


    doPuzzleDoor: function () {
        // this.music.stop();

        console.log("puzle door clicked");

        // go to puzzle room
        this.scene.start('bowpuzzlescene', {life: this.life});
    },



    doBossDoor: function () {
        if (this.forceFieldActive) return;

        this.music.stop();
        // this.scene.start('controller_scene');
        console.log("boss door clicked");

        // go to boss room
    },

    createLifeBar: function () {
        this.add.image(900, 40, 'emptybar').setOrigin(0, 0);
        this.lifeBar = this.add.image(908, 47, 'fullbar').setOrigin(0, 0);

        this.lifeBar.setScale(this.life / 100, 1);
    }

});
