let lastId = 0;

export default function reducer (state = [], action) {
    switch (action.type) {
        case "userAdded":
            return [
                ...state,
                {
                    id: ++lastId,
                    firstName: action.payload.firstName,
                    lastName: action.payload.lastName,
                    email: action.payload.email,
                    password: action.payload.password
                }
            ];
        case "userRemoved":
            return state.filter((user) => user.id !== action.payload.id);
        default:
            return state;
    }
}