
export type Note = {
    id?: number;
    title: string;
    author: string;
    body: string;
    updatedAt?: Date;
    deleted?: boolean;
}