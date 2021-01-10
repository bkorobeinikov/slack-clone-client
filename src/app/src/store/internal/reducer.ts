import { Reducer, combineReducers as reduxCombineReducers } from 'redux';

import { AnyMessage, AnyMessageDef, ExtractMessage } from './message';

interface IReducer<TState> extends Reducer {
    (state: TState, msg: AnyMessage): TState;
}

type IReducersMap<TState> = {
    [K in keyof TState]: IReducer<TState[K]>;
};

interface IReducerMutator<TState, TMsgDef extends AnyMessageDef> {
    msgDef: TMsgDef;
    mutate: (state: TState, msg: ExtractMessage<TMsgDef>) => TState;
}

type ExtractReducerState<TReducer> = TReducer extends IReducer<infer TState> ? TState : never;

function defineReducer<TState>(initialState: TState, handlers: IReducerMutator<TState, AnyMessageDef>[]): IReducer<TState> {
    const handlersMap = handlers.reduce((acc: { [msgType: string]: IReducerMutator<TState, AnyMessageDef> }, h) => {
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

function combineReducers<TState>(reducers: IReducersMap<TState>): IReducer<TState> {
    return reduxCombineReducers(reducers);
}

function onMsg<TState, TMsgDef extends AnyMessageDef>(
    msgDef: TMsgDef,
    mutate: (state: TState, msg: ExtractMessage<TMsgDef>) => TState,
): IReducerMutator<TState, TMsgDef> {
    return {
        msgDef,
        mutate,
    };
}

export { IReducer, IReducersMap, IReducerMutator, ExtractReducerState, defineReducer, combineReducers, onMsg };
