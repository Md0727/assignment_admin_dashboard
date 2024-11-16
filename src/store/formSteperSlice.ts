import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the initial state of the form
interface UserDetailsState {
    steperTd: number; // The current step in the form
}

const initialState: UserDetailsState = {
    steperTd: 1, // Default to step 1
};

const formSteperSlice = createSlice({
    name: 'steps',
    initialState,
    reducers: {
        // Action to set the current step of the form
        setCurrentStep: (state, action: PayloadAction<{ steperTd: number }>) => {
            // Update the current step (steperTd)
            state.steperTd = action.payload.steperTd;
        },
    },
});

// Export the action to be dispatched in your component
export const { setCurrentStep } = formSteperSlice.actions;

export default formSteperSlice.reducer;
