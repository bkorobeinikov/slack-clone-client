import { defineReducer, onMsg } from '@app/store/reducer';

import { appReadyEvent } from './messages';

interface IState {
    ready: boolean;
}

const initialState: IState = {
    ready: false,
};

const reducer = defineReducer(initialState, [
    onMsg(appReadyEvent, state => {
        return {
            ...state,
            ready: true,
        };
    }),
]);

export { reducer, IState };
