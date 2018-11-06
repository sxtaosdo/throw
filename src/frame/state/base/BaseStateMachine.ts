class BaseStateMachine implements IStateMachine {
    currentClazz: any;
    cutState: IState;
    globalState: IState;
    instanceMap: any;
    owner: IEntity;
    preState: IState;

    public constructor(owner: IEntity) {
        this.owner = owner;
        this.instanceMap = {};
    }

    addGlobalState(clazz: any): void {
    }

    changeState(clazz: any): void {
        if (this.currentClazz == clazz) {
            return;
        }
        this.currentClazz = clazz;

        if (this.preState) {
            this.preState.onExit(this.owner);
        }
        this.preState = this.cutState;

        if (!this.instanceMap[clazz]) {
            this.instanceMap[clazz] = new clazz();
        }
        this.cutState = this.instanceMap[clazz];
        this.cutState.onEnter(this.owner);
    }

    isInState(state: any): boolean {
        if (this.currentClazz == state) {
            return true;
        }
        return false;
    }

    update(dt?: number): void {
    }
}