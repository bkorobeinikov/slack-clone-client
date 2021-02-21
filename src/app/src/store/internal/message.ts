import { IFeatureDef } from './feature';

interface IMessage<TType, TPayload> {
    readonly type: TType;
    readonly payload: Readonly<TPayload>;
}

interface IMessageDefReadOnly<TType, _TPayload> {
    type: TType;
}

interface IMessageDef<TType, TPayload> extends IMessageDefReadOnly<TType, TPayload> {
    (payload: TPayload): IMessage<TType, TPayload>;
    readOnly(): IMessageDefReadOnly<TType, TPayload>;
}

type AnyMessageDef = IMessageDefReadOnly<string, unknown>;
type AnyMessage = IMessage<string, unknown>;

type ExtractMessage<TMessageDef> = TMessageDef extends Array<infer TInnerDefs>
    ? TInnerDefs extends IMessageDef<infer TType, infer TPayload>
        ? IMessage<TType, TPayload>
        : TMessageDef extends IMessageDefReadOnly<infer TType, infer TPayload>
        ? IMessage<TType, TPayload>
        : never
    : TMessageDef extends IMessageDef<infer TType, infer TPayload>
    ? IMessage<TType, TPayload>
    : TMessageDef extends IMessageDefReadOnly<infer TType, infer TPayload>
    ? IMessage<TType, TPayload>
    : never;

function defineMsg<TFeatureName extends `[${string}]`, TState, TType extends string, TPayload>(
    featureDef: IFeatureDef<TFeatureName, TState>,
    type: `${TType}`,
    _payload: TPayload,
): IMessageDef<`${TFeatureName} ${TType}`, TPayload> {
    const finalType = (featureDef.featureName + ' ' + type) as `${TFeatureName} ${TType}`;
    const msgCreator = (payload: TPayload) => ({ type: finalType, payload });
    msgCreator.type = finalType;
    msgCreator.readOnly = (): IMessageDefReadOnly<`${TFeatureName} ${TType}`, TPayload> => ({
        type: finalType,
    });

    return msgCreator;
}

const withPayload = <TPayload = Record<string, never>>(_payload?: TPayload): TPayload => null as never;

function ofMsgDef<TDef extends AnyMessageDef>(msgDef: TDef, msg: AnyMessage): msg is ExtractMessage<TDef> {
    if (msg.type === msgDef.type) {
        return true;
    }

    return false;
}

function msgSaga<T extends AnyMessageDef>(msgDef: T, handler: (msg: ExtractMessage<T>) => void): (msg: ExtractMessage<T>) => void;
function msgSaga<T extends AnyMessageDef[]>(msgDefs: T, handler: (msgs: ExtractMessage<T>) => void): (msgs: ExtractMessage<T>) => void;
function msgSaga(
    _msgDef: AnyMessageDef | AnyMessageDef[],
    handler: (msg: ExtractMessage<AnyMessageDef | AnyMessageDef[]>) => void,
): (msg: ExtractMessage<AnyMessageDef | AnyMessageDef[]>) => void {
    return handler;
}

export { AnyMessageDef, AnyMessage, IMessageDefReadOnly, IMessageDef, ExtractMessage, IMessage, defineMsg, withPayload, msgSaga, ofMsgDef };
