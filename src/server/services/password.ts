import * as bcrypt from 'bcrypt';

export const generateHash = (password: string): string => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}

export const compareHash = (password: string, hash: string): boolean => {
    return bcrypt.compareSync(password, hash);
}