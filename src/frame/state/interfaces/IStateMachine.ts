
interface IStateMachine {
    owner: IEntity;
    preState: IState;
    cutState: IState;
    globalState?: IState;

    instanceMap: any;
    currentClazz: any;

    update(dt?: number): void;

    changeState(clazz: any): void;

    addGlobalState(clazz: any): void;

    isInState(state: any): boolean;
}