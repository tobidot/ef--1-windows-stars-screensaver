import { ModelCollection } from "../models/ModelCollection";
import { ViewCollection } from "../views/ViewCollection";
import { GameController } from "./GameController";
import { GameEventController } from "./event_controllers/GameEventController";
import { ControllerCollectionBase } from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/Collections";

export interface ControllerCollection extends ControllerCollectionBase {
    game_controller: GameController,
    for_event: {
        game_controller: GameEventController,
    }
}

export function create_controllers(models: ModelCollection, views: ViewCollection): ControllerCollection {
    const controllers: ControllerCollection = {} as ControllerCollection;
    const buffer: ControllerCollection = {
        game_controller: new GameController(models, views, controllers),
        for_event: {
            game_controller: new GameEventController(models, views, controllers),
        }
    };
    return Object.assign(controllers, buffer);
}