
export type LoginStateType = typeof initialState

const initialState = {}

export const loginReducer = (state = initialState, action: ActionsType): LoginStateType => {
    switch (action.type) {
        default:
            return state;
    }
};

type ActionsType = any
