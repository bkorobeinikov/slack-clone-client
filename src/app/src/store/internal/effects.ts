import {
    takeEvery as sagaTakeEvery,
    takeLeading as sagaTakeLeading,
    takeLatest as sagaTakeLatest,
    take as sagaTake,
    race,
    put as sagaPut,
    call,
    select as sagaSelect,
    cancel,
    cancelled,
    fork,
    all,
    delay,
    ActionPattern,
    ForkEffect,
    PutEffect,
    RaceEffect,
    AllEffect,
} from 'redux-saga/effects';

import { AnyMessage, AnyMessageDef, ExtractMessage } from './message';

type SagaResult<TResult> = Generator<unknown, TResult>;

function defToPattern(msgDef: AnyMessageDef | AnyMessageDef[]): ActionPattern {
    if (Array.isArray(msgDef)) {
        return msgDef.map(def => def.type);
    }

    return msgDef.type;
}

function take<T extends AnyMessageDef>(msgDef: T): SagaResult<ExtractMessage<T>>;
function take<T extends AnyMessageDef[]>(msgDefs: T): SagaResult<ExtractMessage<T>>;
function take(msgDef: AnyMessageDef | AnyMessageDef[]): unknown {
    return sagaTake(defToPattern(msgDef));
}

function takeEvery<T extends AnyMessageDef>(msgDef: T, worker: (msg: ExtractMessage<T>) => void): ForkEffect<never>;
function takeEvery<T extends AnyMessageDef[]>(msgDefs: T, worker: (msgs: ExtractMessage<T>) => void): ForkEffect<never>;
function takeEvery(
    msgDef: AnyMessageDef | AnyMessageDef[],
    worker: (msgs: ExtractMessage<AnyMessageDef | AnyMessageDef[]>) => void,
): ForkEffect<never> {
    return sagaTakeEvery(defToPattern(msgDef), worker);
}

function takeLatest<T extends AnyMessageDef>(msgDef: T, worker: (msg: ExtractMessage<T>) => void): ForkEffect<never>;
function takeLatest<T extends AnyMessageDef[]>(msgDefs: T, worker: (msgs: ExtractMessage<T>) => void): ForkEffect<never>;
function takeLatest(
    msgDef: AnyMessageDef | AnyMessageDef[],
    worker: (msgs: ExtractMessage<AnyMessageDef | AnyMessageDef[]>) => void,
): ForkEffect<never> {
    return sagaTakeLatest(defToPattern(msgDef), worker);
}

function takeLeading<T extends AnyMessageDef>(msgDef: T, worker: (msg: ExtractMessage<T>) => void): ForkEffect<never>;
function takeLeading<T extends AnyMessageDef[]>(msgDefs: T, worker: (msgs: ExtractMessage<T>) => void): ForkEffect<never>;
function takeLeading(
    msgDef: AnyMessageDef | AnyMessageDef[],
    worker: (msgs: ExtractMessage<AnyMessageDef | AnyMessageDef[]>) => void,
): ForkEffect<never> {
    return sagaTakeLeading(defToPattern(msgDef), worker);
}

function put(msg: AnyMessage): PutEffect<AnyMessage> {
    return sagaPut(msg);
}

function* select<TResult, Fn extends (state: unknown, ...args: unknown[]) => TResult>(selector: Fn): SagaResult<ReturnType<Fn>> {
    const result = (yield sagaSelect(selector as never)) as ReturnType<Fn>;
    return result;
}

export { SagaResult };
export { take, takeEvery, takeLatest, takeLeading, put };
export { race, call, select, cancel, cancelled, fork, all, delay, ActionPattern, ForkEffect, PutEffect, RaceEffect, AllEffect };
