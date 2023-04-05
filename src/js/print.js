import PubSub from "pubsub-js";
import Keys from "./keys.js";

// print to console

export default (function() {

    function init() {
        PubSub.subscribe(Keys.LOCAL_STORAGE_SAVE, logAction);
        PubSub.subscribe(Keys.LOCAL_STORAGE_LOAD, logAction);

        PubSub.subscribe(Keys.TODO_ADD, logAction);
        PubSub.subscribe(Keys.TODO_EDIT, logAction);
        PubSub.subscribe(Keys.TODO_MOVE, logAction);
        PubSub.subscribe(Keys.TODO_REMOVE, logAction);
        PubSub.subscribe(Keys.TODO_UPDATE, logAction);

        PubSub.subscribe(Keys.PROJECT_ADD, logAction);
        PubSub.subscribe(Keys.PROJECT_EDIT, logAction);
        PubSub.subscribe(Keys.PROJECT_MOVE, logAction);
        PubSub.subscribe(Keys.PROJECT_REMOVE, logAction);
        PubSub.subscribe(Keys.PROJECT_UPDATE, logAction);

        PubSub.subscribe(Keys.DOM_UPDATE, logAction);
    };

    function logAction(msg, data) {
        console.log(`Log Action (${msg}): ${data}`);
    }

    return {
        init
    };
})();