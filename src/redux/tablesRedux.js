import { API_URL } from "../config";

// selectors
export const getAllTables = ({ tables }) => tables;
export const getTableById = ({ tables }, tableId) => tables.find(table => table.id === tableId);

// actions
const createActionName = actionName => `app/tables/${actionName}`;
const UPDATE_TABLES = createActionName('UPDATE_TABLES');
const EDIT_TABLE = createActionName('EDIT_TABLE');

// action creators
export const updateTables = payload => ({ type: UPDATE_TABLES, payload });
export const editTable = payload => ({ type: EDIT_TABLE, payload });

export const fetchTables = () => {
    return (dispatch) => {
        //tableloading true i dodac timeouta zeby napewno wyszedl loading
        fetch(API_URL + '/tables')
            .then(res => res.json())
            .then(tables => dispatch(updateTables(tables)));
    }
};

export const editTableRequest = table => {
    return (dispatch) => {
        const options ={
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(table),
        }
        fetch(API_URL + `/tables${table.id}`, options)
            .then(() => dispatch(editTable(table)))
    }
};

const tablesReducer = (statePart = [], action) => {
    switch (action.type) {
        case UPDATE_TABLES:
            return [...action.payload]
        case EDIT_TABLE:
            return statePart.map(table => (table.id === action.payload.id ? {...table, ...action.payload} : table))
        default:
            return statePart;
    };
};

export default tablesReducer;