let SignScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function SignScene() {
            Phaser.Scene.call(this, {key: 'sign_scene'});
        },

    preload: function () {
    },

    update: function () {
        // this.lifeBar.setScale(this.life / 100, 1);
    },

    create: function (data) {
        // Add background image
        this.add.image(0, 0, 'sign_closeup').setOrigin(0, 0);

        this.life = data.life;
        this.puzzleSolved = data.puzzleSolved;
        this.music = data.music;

        // this.createLifeBar();

        // Add try again button
        let nextButton = this.add.sprite(950, 500, 'nextbutton').setOrigin(0, 0);
        nextButton.setInteractive();

        nextButton.on('pointerup', () => {
            this.doNext();
        });
    },


    doNext: function () {
        this.scene.start('lobby_scene', {
            life: this.life,
            fromSign: true,
            puzzleSolved: this.puzzleSolved,
            music: this.music,
        });
    },

    createLifeBar: function () {
        this.add.image(900, 40, 'emptybar').setOrigin(0, 0);
        this.lifeBar = this.add.image(908, 47, 'fullbar').setOrigin(0, 0);

        this.lifeBar.setScale(this.life / 100, 1);
    }

});
