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

    changeState(newClazz: any): void {
        if (this.currentClazz == newClazz) {
            return;
        } else {
            this.currentClazz = newClazz;
        }

        this.preState = this.cutState;
        if (this.preState) {
            this.preState.onExit(this.owner);
        }

        if (!this.instanceMap[newClazz]) {
            this.instanceMap[newClazz] = new newClazz();
        }
        this.cutState = this.instanceMap[newClazz];
        this.cutState.onEnter(this.owner);

        //================================================
        // if (this.cutState == null) {
        //     this.currentClazz = newClazz;
        //     this.cutState.onEnter(this.owner);
        // } else {
        //     this.preState = this.cutState;
        //     this.preState.onExit(this.owner);
        //     this.cutState = newClazz;
        //     this.cutState.onEnter(this.owner);
        // }
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