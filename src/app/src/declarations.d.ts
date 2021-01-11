declare const DEBUG: boolean;

interface Window {
    /** Redux chrome extension. Should not be used in Production. */
    readonly __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: unknown;

    DEBUG: boolean;
}
