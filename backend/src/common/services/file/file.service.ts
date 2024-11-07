import crypto from 'node:crypto';
import fs from 'node:fs';

import { HttpError } from '~/common/exceptions/exceptions.js';
import { HttpCode } from '~/common/http/http.js';

import { type File } from './types/types.js';

class FileService {
    private path: string;

    public constructor(path: string) {
        this.path = path;
    }

    public saveLocalFile(file: File): string {
        if (!file.buffer) {
            throw new HttpError({
                status: HttpCode.BAD_REQUEST,
                message: 'Provided buffer is incorrect',
            });
        }

        if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
            throw new HttpError({
                status: HttpCode.BAD_REQUEST,
                message: 'Only JPG and PNG files are allowed',
            });
        }

        if (!fs.existsSync(this.path)) {
            fs.mkdirSync(this.path, {
                recursive: true,
            });
        }

        const extension = file.mimetype === 'image/jpeg' ? 'jpg' : 'png';
        const filename = `${crypto.randomUUID()}.${extension}`;
        const filePath = `${this.path}/${filename}`;

        fs.writeFileSync(filePath, file.buffer);

        return filename;
    }

    public isFileExists(filename: string): boolean {
        const filePath = `${this.path}/${filename}`;

        return fs.existsSync(filePath);
    }

    public removeLocalFile(filename: string): void {
        const filePath = `${this.path}/${filename}`;

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    }
}

export { FileService };
