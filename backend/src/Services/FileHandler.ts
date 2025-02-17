import path from "path"
import fs from "fs"

const DeleteFile = async (file: string) => {
    const filepath = path.join(process.cwd(), "src", "public", "uploads", file)
    if (fs.existsSync(filepath)) {
        fs.unlink(filepath, (err) => {
            if (err) {
                return err
            }
            else {
                return "File deleted succesfully"
            }
        })
    }
    else {
        return "File does not exist"
    }
}

export { DeleteFile }