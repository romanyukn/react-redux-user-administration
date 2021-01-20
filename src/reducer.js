let lastId = 0;

export default function reducer (state = [], action) {
    switch (action.type) {
        case "Add":
            return [
                ...state,
                {
                    id: ++lastId,
                    firstName: action.payload.firstName,
                    lastName: action.payload.lastName,
                    email: action.payload.email,
                    password: action.payload.password,
                    isDelete: action.payload.isDelete
                }
            ];
        case "userRemoved":
            return state.filter((user) => user.id !== action.payload.id);
        case "Edit":
            const index = state.findIndex((user) => user.id === action.payload.id);
            state[index] = action.payload;
            return state;
        default:
            return state;
    }
}
