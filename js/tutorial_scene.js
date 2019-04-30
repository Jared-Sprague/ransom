
let TutorialScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function TutorialScene() {
            Phaser.Scene.call(this, {key: 'tutorialscene'});
        },

    preload: function () {
    },

    create: function () {
        // add logo
        //this.sys.config.backgroundColor = '#f3cca3';
        let logo = this.add.sprite(400, 100, 'sprites', 'phaser3');

        // text
        let txt = this.add.bitmapText(400, 300, 'fontwhite', 'This is an example game.\nTake a look at the code\nto see how it works.');
        txt.setOrigin(0.5).setCenterAlign();

        // back Button
        this.btnback = this.addButton(400, 520, 'sprites', this.doBack, this, 'btn_back_hl', 'btn_back', 'btn_back_hl', 'btn_back');

        console.log('create is ready');
    },

    doBack: function () {
        console.log('doBack was called!');
        this.scene.start('mainmenu');
    }

});
