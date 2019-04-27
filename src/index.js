import meta from "./metadata.js";
import "./style.css";
import "es6-promise/auto";

import { bindAll, functionsIn, assignIn } from "lodash";
import Game from "./game.js";

console.log(
    `Starting %c${meta.title}%c v${meta.package.version}`,
    "font-weight: bold",
    "font-weight: normal"
);

Game.start();

// This is an example of how to use hot module reloading to inject changes
// without forcing a page refresh.  Not all modules
// if (module.hot) {
//     module.hot.accept("./print.js", function() {
//         console.log("Accepting the updated printMe module!");
//         printMe();
//     });
// }
