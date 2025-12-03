import * as yup from 'yup'

const authUserSchema = yup.object({
    email: yup.string("Email must be a valid string.").email("email must ba a valid email address.").required("email is required"),
    password: yup.string("Password must be a valid string.").required("password is required").min(6, "password must be at least 6 characters long.")
})

export default authUserSchema