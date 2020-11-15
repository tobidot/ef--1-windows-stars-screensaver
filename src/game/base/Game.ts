import { create_controllers } from "../controllers/ControllerCollection";
import { create_views } from "../views/ViewCollection";
import { MVCGame } from "../../tools/abstract/mvc/MVCgame";
import { GameGlobal } from "./GameGlobal";
import { create_models } from "../models/ModelCollection";

export class Game extends MVCGame {
    public references: GameGlobal;

    constructor() {
        super();
        const canvas = document.getElementById('canvas');
        if (!(canvas instanceof HTMLCanvasElement)) throw new Error("Canvas not found");
        const models = create_models(this);
        const views = create_views(canvas);
        const controllers = create_controllers(models, views);
        this.references = {
            ingame_time_in_seconds: 0,
            models,
            controllers,
            views,
        };
        this.apply_controller_response(controllers.game_controller.new_game());
    }

    public update(delta_seconds: number) {
        this.references.ingame_time_in_seconds += delta_seconds;
        super.update(delta_seconds);
    }
}