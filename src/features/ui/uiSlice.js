import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	sidebarCollapsed: false,
	collapsibles: {}, 
};

const uiSlice = createSlice({
	name: 'ui',
	initialState,
	reducers: {
		toggleSidebar: (state) => {
			state.sidebarCollapsed = !state.sidebarCollapsed;
		},
		setSidebarCollapsed: (state, action) => {
			state.sidebarCollapsed = action.payload;
		},

		toggleCollapsible: (state, action) => {
			const id = action.payload;
			if (!state.collapsibles) state.collapsibles = {};
			state.collapsibles[id] = !state.collapsibles[id];
		},
		setCollapsible: (state, action) => {
			const { id, value } = action.payload;
			if (!state.collapsibles) state.collapsibles = {};
			state.collapsibles[id] = value;
		},
	},
});

export const {
	toggleSidebar,
	setSidebarCollapsed,
	toggleCollapsible,
	setCollapsible,
} = uiSlice.actions;

export default uiSlice.reducer;
