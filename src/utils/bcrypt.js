
// ---- bcrypt--- 
import bcrypt from "bcrypt"

// GENERAMOS el hash
export const createHash = password => {
    console.log("En el create hash");
    console.log((password));
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

// Validamos el hash
export const passwordValidation = (user, password) => {
    console.log(("is valid"));
    console.log(user);
    console.log(password);
    return bcrypt.compareSync(password, user.password)
}