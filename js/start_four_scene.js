// Phaser3 example game
// mein menu scene

let StartFourScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function StartFourScene() {
            Phaser.Scene.call(this, {key: 'start_four_scene'});
        },

    preload: function () {
    },

    create: function () {
        // Add background image
        this.add.image(0, 0, 'tvscreen').setOrigin(0, 0);


        // Add try again button
        let nextButton = this.add.sprite(850, 600, 'nextbutton').setOrigin(0, 0);
        nextButton.setInteractive();

        nextButton.on('pointerup', () => {
            this.doNext();
        });

        // this.music = this.sound.add('ost_ransom', {loop: true});
        // this.music.play();
    },


    doNext: function () {
        // this.music.stop();
        this.scene.start('start_five_scene');
    }

});
