

let StartFourScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function StartFourScene() {
            Phaser.Scene.call(this, {key: 'start_four_scene'});
        },

    preload: function () {
    },

    create: function (data) {
        // Add background image
        this.add.image(0, 0, 'tvscreen').setOrigin(0, 0);
        this.music = data.music;

        // Add try again button
        let nextButton = this.add.sprite(950, 600, 'nextbutton').setOrigin(0, 0);
        nextButton.setInteractive();

        nextButton.on('pointerup', () => {
            this.doNext();
        });
    },


    doNext: function () {
        // this.music.stop();
        this.scene.start('start_five_scene', {music: this.music});
    }

});
