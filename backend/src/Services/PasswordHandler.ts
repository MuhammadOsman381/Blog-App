import bcrypt from "bcrypt"

const HashPassword = async (password: string) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword
}

export { HashPassword }