import { configureStore } from '@reduxjs/toolkit';
import changeRoleReducer from './reducer/changeRoleSlice';
import selectEpidemicSlice from './reducer/selectEpidemicSlice';

const store = configureStore({
    reducer: {
        changeRole: changeRoleReducer,
        selectEpidemic: selectEpidemicSlice,
    },
});

export default store;