import { API_URL } from "../config";

// selectors
export const getStatus = ({ status }) => status;

// actions
const createActionName = actionName => `app/status/${actionName}`;
const UPDATE_STATUS = createActionName('UPDATE_STATUS');

// action creators

export const updateStatus = (payload) => ({ type: UPDATE_STATUS, payload });

export const fetchStatus = () => {
    return(dispatch) => {
        fetch(API_URL + '/status')
            .then(res => res.json())
            .then(status => dispatch(updateStatus(status)));
    }
};

const statusReducer = (statePart = [], action) => {
    switch(action.type) {
        case UPDATE_STATUS:
            return[...action.payload];
        default:
            return statePart;
    };
};

export default statusReducer;