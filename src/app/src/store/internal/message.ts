interface IMessage<TType, TPayload> {
    readonly type: TType;
    readonly payload: Readonly<TPayload>;
}

interface IMessageDefReadOnly<TType, _TPayload> {
    type: TType;
}

interface IMessageDef<TType, TPayload> extends IMessageDefReadOnly<TType, TPayload> {
    (payload: TPayload): IMessage<TType, TPayload>;
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

const defineMsg = <TType, TPayload>(type: TType, _payload: TPayload): IMessageDef<TType, TPayload> => {
    const msgCreator = (payload: TPayload) => ({ type, payload });
    msgCreator.type = type;

    return msgCreator;
};

const msgPayload = <TPayload = Record<string, never>>(_payload?: TPayload): TPayload => null as never;

function asReadOnly<TType, TPayload>(msgDef: IMessageDef<TType, TPayload>): IMessageDefReadOnly<TType, TPayload> {
    return {
        type: msgDef.type,
    };
}

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

export {
    AnyMessageDef,
    AnyMessage,
    IMessageDefReadOnly,
    IMessageDef,
    ExtractMessage,
    IMessage,
    defineMsg,
    msgPayload,
    asReadOnly,
    msgSaga,
    ofMsgDef,
};
