
let StartOneScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function StartOneScene() {
            Phaser.Scene.call(this, {key: 'start_one_scene'});
        },

    preload: function () {
    },

    create: function () {
        // Add background image
        this.add.image(0, 0, 'portal1').setOrigin(0, 0);


        // Add try again button
        let nextButton = this.add.sprite(950, 600, 'nextbutton').setOrigin(0, 0);
        nextButton.setInteractive();

        nextButton.on('pointerup', () => {
            this.doNext();
        });

        this.music = this.sound.add('ost_portal_opens', {loop: true});
        this.music.play();
    },


    doNext: function () {
        this.scene.start('start_two_scene', {music: this.music});
    }

});
