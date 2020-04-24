export declare class UserModel {
    id: number;
    email: string;
    password: string;
    reset_token: string;
    hashPasswordMethod(pass: any): Promise<string>;
    comparePasswordMethod(pass: any): Promise<boolean>;
    generateJwtTokenMethod(args: any): Promise<any>;
}
