
let BadEndScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function BadEndScene() {
            Phaser.Scene.call(this, {key: 'badend_scene'});
        },

    preload: function () {
    },

    create: function () {
        // Add background image
        this.add.image(0, 0, 'badend').setOrigin(0, 0);


        // Add try again button
        let tryAgainButton = this.add.sprite(850, 600, 'tryagain').setOrigin(0, 0);
        tryAgainButton.setInteractive();

        tryAgainButton.on('pointerup', () => {
            this.doTryAgain();
        });

        // this.music = this.sound.add('ost_ransom', {loop: true});
        // this.music.play();
    },


    doTryAgain: function () {
        // this.music.stop();
        this.scene.start('mainmenu');
    }

});
