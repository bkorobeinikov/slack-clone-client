import { defineReducer } from '@app/store/reducer';
import { IUser } from './models';

interface IState {
    user: IUser;
}

const initialState: IState = {
    user: null,
};

const reducer = defineReducer(initialState, []);

export { reducer, IState };
