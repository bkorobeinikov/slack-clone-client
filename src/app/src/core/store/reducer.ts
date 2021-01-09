import { Reducer, combineReducers as reduxCombineReducers } from 'redux';

import { AnyMessage, AnyMessageDef, ExtractMessage } from './message';

interface IReducer<TState> extends Reducer {
    (state: TState, msg: AnyMessage): TState;
}

type IReducersMap<TState> = {
    [K in keyof TState]: IReducer<TState[K]>;
};

interface IReducerHandler<TState, TMsgDef extends AnyMessageDef> {
    msgDef: TMsgDef;
    mutate: (state: TState, msg: ExtractMessage<TMsgDef>) => TState;
}

function createReducer<TState>(initialState: TState, handlers: IReducerHandler<TState, AnyMessageDef>[]): IReducer<TState> {
    const handlersMap = handlers.reduce((acc: { [msgType: string]: IReducerHandler<TState, AnyMessageDef> }, h) => {
        if (acc[h.msgDef.type.toString()]) {
            // only one handler per MessageDef
            throw new Error(`handler already defined for message '${h.msgDef.type}'`);
        }

        acc[h.msgDef.type] = h;
        return acc;
    }, {});

    return (state = initialState, msg: AnyMessage): TState => {
        if (handlersMap.hasOwnProperty(msg.type)) {
            return handlersMap[msg.type].mutate(state, msg);
        } else {
            return state;
        }
    };
}

function createReducerHandler<TState, TMsgDef extends AnyMessageDef>(
    msgDef: TMsgDef,
    mutate: (state: TState, msg: ExtractMessage<TMsgDef>) => TState,
): IReducerHandler<TState, TMsgDef> {
    return {
        msgDef,
        mutate,
    };
}

function combineReducers<TState>(reducers: IReducersMap<TState>): IReducer<TState> {
    return reduxCombineReducers(reducers);
}

export { IReducer, IReducersMap, IReducerHandler, createReducer, createReducerHandler, combineReducers };
