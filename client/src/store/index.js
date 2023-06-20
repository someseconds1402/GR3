import { configureStore } from '@reduxjs/toolkit';
import changeRoleReducer from './reducer/changeRoleSlice';
import selectEpidemicSlice from './reducer/selectEpidemicSlice';
import changeEpidemicDataSlice from './reducer/changeEpidemicDataSlice';
import getPandemicDataSlice from './reducer/getPandemicDataSlice';

const store = configureStore({
    reducer: {
        changeRole: changeRoleReducer,
        selectEpidemic: selectEpidemicSlice,
        changeEpidemicData: changeEpidemicDataSlice,
        getPandemicData: getPandemicDataSlice,
    },
});

export default store;