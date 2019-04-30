
let StartTwoScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function StartTwoScene() {
            Phaser.Scene.call(this, {key: 'start_two_scene'});
        },

    preload: function () {
    },

    create: function (data) {
        // Add background image
        this.add.image(0, 0, 'portal2').setOrigin(0, 0);
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
        this.scene.start('start_three_scene', {music: this.music});
    }

});
