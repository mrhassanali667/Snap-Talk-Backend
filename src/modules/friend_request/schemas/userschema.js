import * as Yup from "yup";

export const userSchema = Yup.object({
    fullName: Yup.string()
        .required("Full name is required"),

    phone: Yup.number("Phone must be a number")
        .required("Phone is required"),

    age: Yup.number("Age must be a number")
        .required("Age is required"),

    address: Yup.object({
        city: Yup.string()
            .required("City is required"),

        street: Yup.string()
            .required("Street is required"),

        postalCode: Yup.string()
            .required("Postal code is required"),

        country: Yup.string()
            .required("Country is required")
    }).required("Address is required"),

    isSeller: Yup.boolean()
        .required("isSeller is required")
        .default(false),
});


export default userSchema