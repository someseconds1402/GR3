import { configureStore } from '@reduxjs/toolkit';
import changeRoleReducer from './reducer/changeRoleSlice';
import selectEpidemicSlice from './reducer/selectEpidemicSlice';
import changeEpidemicDataSlice from './reducer/changeEpidemicDataSlice';

const store = configureStore({
    reducer: {
        changeRole: changeRoleReducer,
        selectEpidemic: selectEpidemicSlice,
        changeEpidemicData: changeEpidemicDataSlice
    },
});

export default store;