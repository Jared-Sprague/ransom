let ControllerScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function ControllerScene() {
            Phaser.Scene.call(this, {key: 'controller_scene'});
        },

    preload: function () {
    },

    create: function (data) {
        // Add background image
        this.add.image(0, 0, 'controller').setOrigin(0, 0);
        this.music = data.music;

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
    },


    doA: function () {
        this.music.stop();

        console.log("A button clicked");

        // go to lobby
        this.scene.start('lobby_scene', {life: 100});
    },



    doB: function () {
        this.music.stop();

        console.log("B button clicked");

        // go to game over
        this.scene.start('badend_scene', {fromScene: "controller"});
    }

});
