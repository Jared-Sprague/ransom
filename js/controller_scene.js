let ControllerScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function ControllerScene() {
            Phaser.Scene.call(this, {key: 'controller_scene'});
        },

    preload: function () {
    },

    create: function () {
        // Add background image
        this.add.image(0, 0, 'controller').setOrigin(0, 0);


        // Add A button
        let aButton = this.add.sprite(800, 265, 'a_button');
        aButton.setInteractive();

        aButton.on('pointerup', () => {
            this.doA();
        });

        // Add B button
        let bButton = this.add.sprite(755, 315, 'b_button');
        bButton.setInteractive();

        bButton.on('pointerup', () => {
            this.doB();
        });

        // this.music = this.sound.add('ost_ransom', {loop: true});
        // this.music.play();
    },


    doA: function () {
        // this.music.stop();
        console.log("A button clicked");

        // go to lobby
        this.scene.start('lobby_scene', {life: 100});
    },



    doB: function () {
        // this.music.stop();
        // this.scene.start('controller_scene');
        console.log("B button clicked");

        // go to game over
    }

});
