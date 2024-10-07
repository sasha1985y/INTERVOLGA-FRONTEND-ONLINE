declare module 'dadata' {
    export class Dadata {
        constructor(token: string, secret: string);
        clean(type: string, query: string): Promise<{
            geo_lat: number;
            geo_lon: number;
            // добавьте другие поля, которые вы хотите вернуть
        }[]>;
    }
}