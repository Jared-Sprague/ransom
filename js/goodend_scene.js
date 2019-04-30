
let GoodEndScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function GoodEndScene() {
            Phaser.Scene.call(this, {key: 'goodend_scene'});
        },

    preload: function () {
    },

    create: function (data) {
        this.life = data.life;

        // Add background image
        if (this.life > 30) {
            this.add.image(0, 0, 'goodend').setOrigin(0, 0);
        }
        else {
            this.add.image(0, 0, 'decentend').setOrigin(0, 0);
        }

        // Add try again button
        let tryAgainButton = this.add.sprite(850, 600, 'tryagain').setOrigin(0, 0);
        tryAgainButton.setInteractive();

        tryAgainButton.on('pointerup', () => {
            this.doTryAgain();
        });

        this.music = this.sound.add('ost_gg_bro', {loop: true});
        this.music.play();

    },


    doTryAgain: function () {
        this.music.stop();
        this.scene.start('mainmenu');
    }

});
