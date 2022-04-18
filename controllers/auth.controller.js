import { getUserByEmail } from './user.controller';

const signIn = async (details) => {
    const user = await getUserByEmail(details.email);
    if (user.status === 404) {
        return user;
    }
    // Check if password is correct 
    if (!user.authenticate(details.password)) {
        return {
            status: 401,
            message: "Invalid email or password",
        };
    }
    return user;
    
}

const signOut = () => {
    return {
        status: 200,
        message: "User signed out",
    };
}

const AuthController = {
    signIn,
    signOut
}

module.exports = AuthController