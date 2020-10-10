
export type NewPasswordStateType = typeof initialState

const initialState = {}

export const newPasswordReducer = (state = initialState, action: ActionsType): NewPasswordStateType => {
    switch (action.type) {
        default:
            return state;
    }
};

type ActionsType = any
