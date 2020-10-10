
export type RestorePasswordStateType = typeof initialState

const initialState = {}

export const restorePasswordReducer = (state = initialState, action: ActionsType): RestorePasswordStateType => {
    switch (action.type) {
        default:
            return state;
    }
};

type ActionsType = any
