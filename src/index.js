import App from "./js/app";
import Render from './js/render.js';

(function setUp() {
    // Init App w functionality to listen for emitters
    App.init();

    // Run from console?

    // Init DOM skeleton
    // Fill in DOM based on todos
    Render.init();

})();