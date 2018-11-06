// TypeScript file
interface IChannel {
    name: string;
    id: string | number;

    init(data?: any): Promise<void>;
    getUserInfo(): Promise<any>;
    showAd(data?: any): Promise<any>;
}