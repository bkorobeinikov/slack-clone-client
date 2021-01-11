import { Reducer, combineReducers as reduxCombineReducers } from 'redux';

import { AnyMessage, AnyMessageDef, ExtractMessage } from './message';

interface IReducer<TState> extends Reducer<TState, AnyMessage> {
    (state: TState, msg: AnyMessage): TState;
}

type IReducersMap<TState> = {
    [K in keyof TState]: IReducer<TState[K]>;
};

interface IReducerMutator<TState, TMsgDef extends AnyMessageDef> {
    msgDef: TMsgDef;
    mutate: (state: Readonly<TState>, msg: ExtractMessage<TMsgDef>) => TState;
}

type ExtractReducerState<TReducer> = TReducer extends IReducer<infer TState> ? TState : never;

type Exact<T, U> = T extends U ? (Exclude<keyof T, keyof U> extends never ? T : never) : never;

function defineReducer<TState>(initialState: TState, mutators: IReducerMutator<TState, AnyMessageDef>[]): IReducer<TState> {
    const map = mutators.reduce((acc: { [msgType: string]: IReducerMutator<TState, AnyMessageDef> }, h) => {
        if (acc[h.msgDef.type.toString()]) {
            // only one handler per MessageDef
            throw new Error(`handler already defined for message '${h.msgDef.type}'`);
        }

        acc[h.msgDef.type] = h;
        return acc;
    }, {});

    return (state = initialState, msg: AnyMessage): TState => {
        if (map[msg.type]) {
            return map[msg.type].mutate(state, msg);
        } else {
            return state;
        }
    };
}

function combineReducers<TState>(reducers: IReducersMap<TState>): IReducer<TState> {
    return reduxCombineReducers(reducers);
}

function mutate<TState, TMutateResult, TMsgDef extends AnyMessageDef>(
    msgDef: TMsgDef,
    mutate: (state: Readonly<TState>, msg: ExtractMessage<TMsgDef>) => Exact<TMutateResult, TState>,
): IReducerMutator<TState, TMsgDef> {
    return {
        msgDef,
        mutate,
    };
}

export { IReducer, IReducersMap, IReducerMutator, ExtractReducerState, defineReducer, combineReducers, mutate };
