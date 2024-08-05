import bcrypt from "bcrypt";

const verifyPassword = async (inputPassword, storedHash) => {
    try {
        const verified = await bcrypt.compare(inputPassword, storedHash);
        return verified;
    }
    catch(error) {
        console.log(error);
        throw error;
    }
};

export default verifyPassword;