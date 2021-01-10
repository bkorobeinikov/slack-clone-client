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

type AnyMessageDef = IMessageDef<string, unknown>;
type AnyMessage = IMessage<string, unknown>;

type ExtractMessage<TMessageDef> = TMessageDef extends Array<infer TInnerDefs>
    ? TInnerDefs extends IMessageDef<infer TType, infer TPayload>
        ? IMessage<TType, TPayload>
        : never
    : TMessageDef extends IMessageDef<infer TType, infer TPayload>
    ? IMessage<TType, TPayload>
    : never;

const defineMsg = <TType, TPayload>(type: TType, _payload: TPayload): IMessageDef<TType, TPayload> => {
    const msgCreator = (payload: TPayload) => ({ type, payload });
    msgCreator.type = type;

    return msgCreator;
};

const msgPayload = <TPayload>(_payload?: TPayload): TPayload => null;

function asReadOnly<TType, TPayload>(msgDef: IMessageDef<TType, TPayload>): IMessageDefReadOnly<TType, TPayload> {
    return {
        type: msgDef.type,
    };
}

function ofMsgDef<TDef extends AnyMessageDef>(msgDef: TDef, msg: AnyMessage): msg is ExtractMessage<TDef> {
    if (msg.type === (msgDef.type as any)) {
        return true;
    }

    return false;
}

function msgSaga<T extends AnyMessageDef>(msgDef: T, handler: (msg: ExtractMessage<T>) => void): (msg: ExtractMessage<T>) => void;
function msgSaga<T extends AnyMessageDef[]>(msgDefs: T, handler: (msgs: ExtractMessage<T>) => void): (msgs: ExtractMessage<T>) => void;
function msgSaga(_msgDef: any, handler: (msg: any) => void) {
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
