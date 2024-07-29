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

// let pwd;
// hashPassword("ramanbhaiya")
// .then((hash, pwd) => {
//     pwd = hash;
//     console.log("Hashed - ",hash);
//     console.log("Ok - ", pwd)
// })
// .catch((error) => {
//     console.log(error)
// });

export default hashPassword;