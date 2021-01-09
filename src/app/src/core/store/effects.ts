import {
    takeEvery as sagaTakeEvery,
    takeLeading as sagaTakeLeading,
    takeLatest as sagaTakeLatest,
    take as sagaTake,
    race,
    put as sagaPut,
    call,
    select,
    cancel,
    cancelled,
    fork,
    all,
    ActionPattern,
    ForkEffect,
    PutEffect,
    RaceEffect,
    AllEffect,
} from 'redux-saga/effects';

import { AnyMessageDef, ExtractMessage, IMessage } from './message';

type SagaResult<TResult> = Generator<unknown, TResult>;

function defToPattern(msgDef: AnyMessageDef | AnyMessageDef[]): ActionPattern {
    if (Array.isArray(msgDef)) {
        return msgDef.map(def => def.type);
    }

    return msgDef.type;
}

function take<T extends AnyMessageDef>(msgDef: T): SagaResult<ExtractMessage<T>>;
function take<T extends AnyMessageDef[]>(msgDefs: T): SagaResult<ExtractMessage<T>>;
function take(msgDef: AnyMessageDef | AnyMessageDef[]): any {
    return sagaTake(defToPattern(msgDef));
}

function takeEvery<T extends AnyMessageDef>(msgDef: T, worker: (msg: ExtractMessage<T>) => void): ForkEffect<never>;
function takeEvery<T extends AnyMessageDef[]>(msgDefs: T, worker: (msgs: ExtractMessage<T>) => void): ForkEffect<never>;
function takeEvery(msgDef: AnyMessageDef | AnyMessageDef[], worker: (msgs: any) => void): ForkEffect<never> {
    return sagaTakeEvery(defToPattern(msgDef), worker);
}

function takeLatest<T extends AnyMessageDef>(msgDef: T, worker: (msg: ExtractMessage<T>) => void): ForkEffect<never>;
function takeLatest<T extends AnyMessageDef[]>(msgDefs: T, worker: (msgs: ExtractMessage<T>) => void): ForkEffect<never>;
function takeLatest(msgDef: AnyMessageDef | AnyMessageDef[], worker: (msgs: any) => void): ForkEffect<never> {
    return sagaTakeLatest(defToPattern(msgDef), worker);
}

function takeLeading<T extends AnyMessageDef>(msgDef: T, worker: (msg: ExtractMessage<T>) => void): ForkEffect<never>;
function takeLeading<T extends AnyMessageDef[]>(msgDefs: T, worker: (msgs: ExtractMessage<T>) => void): ForkEffect<never>;
function takeLeading(msgDef: AnyMessageDef | AnyMessageDef[], worker: (msgs: any) => void): ForkEffect<never> {
    return sagaTakeLeading(defToPattern(msgDef), worker);
}

function put(msg: IMessage<unknown, unknown>) {
    return sagaPut(msg);
}

export { SagaResult };
export { take, takeEvery, takeLatest, takeLeading, put };
export { race, call, select, cancel, cancelled, fork, all, ActionPattern, ForkEffect, PutEffect, RaceEffect, AllEffect };