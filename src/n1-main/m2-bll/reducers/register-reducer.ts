
export type RegisterStateType = typeof initialState

const initialState = {}

export const registerReducer = (state = initialState, action: ActionsType): RegisterStateType => {
    switch (action.type) {
        default:
            return state;
    }
};

export type ActionsType = any
