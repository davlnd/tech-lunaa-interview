export type ToBoolean<T> = {
    [K in keyof T]: boolean;
}