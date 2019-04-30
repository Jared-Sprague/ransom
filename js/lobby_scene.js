let LobbyScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function LobbyScene() {
            Phaser.Scene.call(this, {key: 'lobby_scene'});
        },

    preload: function () {
    },

    create: function (data) {
        // Add background image
        this.add.image(0, 0, 'underworldlobby').setOrigin(0, 0);

        this.music = this.sound.add('ost_bro', {loop: true});
        this.music.play();

        this.life = data.life;
        this.createLifeBar();


        // TODO: remove this sprite if puzzle room was solved
        let forceField = this.add.sprite(1200, 400, 'forcefield');
        forceField.setScale(1, 1.6);

        // Add A button
        // let aButton = this.add.sprite(800, 265, 'a_button');
        // aButton.setInteractive();
        //
        // aButton.on('pointerup', () => {
        //     this.doA();
        // });
        //
        // // Add B button
        // let bButton = this.add.sprite(755, 315, 'b_button');
        // bButton.setInteractive();
        //
        // bButton.on('pointerup', () => {
        //     this.doB();
        // });

        // this.music = this.sound.add('ost_ransom', {loop: true});
        // this.music.play();
    },

    update: function () {
        this.lifeBar.setScale(this.life / 100, 1);
    },


    doA: function () {
        // this.music.stop();
        // this.scene.start('controller_scene');
        console.log("A button clicked");

        // go to lobby
    },



    doB: function () {
        // this.music.stop();
        // this.scene.start('controller_scene');
        console.log("B button clicked");

        // go to game over
    },

    createLifeBar: function () {
        this.add.image(900, 40, 'emptybar').setOrigin(0, 0);
        this.lifeBar = this.add.image(908, 47, 'fullbar').setOrigin(0, 0);

        this.lifeBar.setScale(this.life / 100, 1);
    }

});
