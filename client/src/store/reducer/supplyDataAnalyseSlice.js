import { createSlice } from '@reduxjs/toolkit';

const supplyDataAnalyseSlice = createSlice({
    name: 'SupplyDataAnalyse',
    initialState: {
        data: [{
            province_id: 0,
            province_name: '',
            population: 0,
            population_density: 0,
            level: 0,
            kit_test: 0,
            vaccine: 0,
            ability: 0
        }],
    },
    reducers: {
        changeSupplyDataAnalyse: (state, action) => {
            state.data = action.payload.data;
        },
        changeAbility: (state, action) => {
            state.data.forEach(e => {
                if (e.province_id == action.payload.province_id) {
                    e.ability = action.payload.ability;
                }
            })
        },
        sortWithAbility: (state) => {
            state.data.sort((a, b) => a.ability - b.ability);
        }
    },
});

export const { changeSupplyDataAnalyse, changeAbility, sortWithAbility } = supplyDataAnalyseSlice.actions;
export default supplyDataAnalyseSlice.reducer;