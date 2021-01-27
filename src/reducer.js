let lastId = 0;
const initialState = {
    users: []
}

export default function reducer (state = initialState, action) {
    switch (action.type) {
        case "AddAll":
            return { ...state, users: action.payload };
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
            const users = state.users.filter((user) => user._id !== action.payload.id);
            return { ...state, users }
        case "Edit":
            const index = state.users.findIndex((user) => user._id === action.payload.id);
            state.users[index] = action.payload;
            return state;
        default:
            return state;
    }
}
