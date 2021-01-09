interface IMessage<TType, TPayload> {
    readonly type: TType;
    readonly payload: Readonly<TPayload>;
}

interface IMessageDef<TType, TPayload> {
    type: TType;
    (payload: TPayload): IMessage<TType, TPayload>;
}

const payloadDef = <TPayload>(_payload?: TPayload): TPayload => null;

const msgDef = <TType, TPayload>(type: TType, _payload: TPayload): IMessageDef<TType, TPayload> => {
    const msgCreator = (payload: TPayload) => ({ type, payload });
    msgCreator.type = type;

    return msgCreator;
};

type AnyMessageDef = IMessageDef<string, unknown>;
type AnyMessage = IMessage<string, unknown>;

type ExtractMessage<TMessageDef> = TMessageDef extends Array<infer TInnerDefs>
    ? TInnerDefs extends IMessageDef<infer TType, infer TPayload>
        ? IMessage<TType, TPayload>
        : never
    : TMessageDef extends IMessageDef<infer TType, infer TPayload>
    ? IMessage<TType, TPayload>
    : never;

function msgHandler<T extends AnyMessageDef>(msgDef: T, handler: (msg: ExtractMessage<T>) => void): (msg: ExtractMessage<T>) => void;
function msgHandler<T extends AnyMessageDef[]>(msgDefs: T, handler: (msgs: ExtractMessage<T>) => void): (msgs: ExtractMessage<T>) => void;
function msgHandler(_msgDef: any, handler: (msg: any) => void) {
    return handler;
}

function ofMsgDef<TDef extends AnyMessageDef>(msgDef: TDef, msg: AnyMessage): msg is ExtractMessage<TDef> {
    if (msg.type === (msgDef.type as any)) {
        return true;
    }

    return false;
}

export { AnyMessageDef, AnyMessage, IMessageDef, ExtractMessage, IMessage, msgDef, payloadDef, msgHandler, ofMsgDef };
