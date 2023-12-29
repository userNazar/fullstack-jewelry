import * as uuid from "uuid";
import * as path from "path";
import { UploadedFile } from "express-fileupload";

class FileService {
    saveFile(file: UploadedFile | UploadedFile[] | undefined): string | undefined {
        try {
            if (!file) {
                return undefined; 
            }

            if (Array.isArray(file)) { 
                return undefined;
            }

            const fileName = uuid.v4() + '.jpg';
            const filePath = path.resolve('static', fileName);
            file.mv(filePath);

            return fileName;
        } catch (error) {
            console.error(error);
        }
    }
}

export default new FileService()

