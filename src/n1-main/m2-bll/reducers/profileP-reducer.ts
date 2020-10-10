
export type ProfileStateType = typeof initialState

const initialState = {}

export const profileReducer = (state = initialState, action: ActionsType): ProfileStateType => {
    switch (action.type) {
        default:
            return state;
    }
};

type ActionsType = any
