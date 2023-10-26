// ### Configurações multer => upload de arquivos.
import crypto from "crypto";
import multer from "multer";
import path from "path";

export default {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, "..", "..", "uploads"), // onde o arquivo vai ficar salvo
    filename(request, file, callback) {
      const hash = crypto.randomBytes(6).toString("hex"); // hash com um código hexadecimal para garantir que o arquivo não tenha o mesmo nome
      const fileName = `${hash}-${file.originalname}`;

      callback(null, fileName);
    },
  }),
};
