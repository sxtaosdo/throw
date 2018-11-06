
 interface IState {
    owner: IEntity;

    onEnter(data: any): void;

    onExit(data?: any): void;

}