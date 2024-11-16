import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the initial state of the form
interface UserDetailsState {
    name: string;
    email: string;
    phone: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
    countryCode: string;
    file: File | null;
}

const initialState: UserDetailsState = {
    name: "",
    email: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    countryCode: "+91",
    file: null,
};

const userDetailsSlice = createSlice({
    name: 'userDetails',
    initialState,
    reducers: {
        // Action to set the form field data
        setUserDetails: (state, action: PayloadAction<Partial<UserDetailsState>>) => {
            const {
                name,
                email,
                phone,
                addressLine1,
                addressLine2,
                city,
                state: newState,
                pincode,
                country,
                file,
                countryCode,
            } = action.payload;

            if (name) state.name = name;
            if (email) state.email = email;
            if (phone) state.phone = phone;
            if (addressLine1) state.addressLine1 = addressLine1;
            if (addressLine2) state.addressLine2 = addressLine2;
            if (city) state.city = city;
            if (newState) state.state = newState;
            if (pincode) state.pincode = pincode;
            if (country) state.country = country;
            if (countryCode) state.countryCode = countryCode;
            if (file) state.file = file;
        },
    },
});

export const { setUserDetails } = userDetailsSlice.actions;

export default userDetailsSlice.reducer;
