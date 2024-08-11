import bcrypt from "bcrypt";

const saltRounds = 10;

const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    }
    catch(error) {
        console.log(error);
        throw error;
    }
}

export default hashPassword;
