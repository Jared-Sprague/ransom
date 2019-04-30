

let StartFiveScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function StartFiveScene() {
            Phaser.Scene.call(this, {key: 'start_five_scene'});
        },

    preload: function () {
    },

    create: function () {
        // Add background image
        this.add.image(0, 0, 'tvscreen2').setOrigin(0, 0);

        this.createLifeBar();

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
        this.scene.start('controller_scene');
    },

    createLifeBar: function () {
        this.add.image(900, 40, 'emptybar').setOrigin(0, 0);
        this.add.image(908, 47, 'fullbar').setOrigin(0, 0);
    }

});
