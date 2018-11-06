class GameScene extends BaseScene implements IEntity {

	public basketball: eui.Image;
	public backboard: eui.Group;
	public lineList: Array<egret.Point>;
	public sp: egret.Sprite;

	public staticMachine: IStateMachine;

	public constructor() {
		super();
		this.lineList = [];
		this.skinName = "GameSceneSkin";
		this.staticMachine = new BaseStateMachine(this);

	}
	protected onComplete(): void {
		this.staticMachine.changeState(GameStateReady);

		this.sp = new egret.Sprite();
		this.addChild(this.sp);
	}
}

class GameStateReady implements IState {
	owner: GameScene;
	private beginX: number;
	private beginY: number;

	public onEnter(data: any): void {
		this.owner = data;
		this.owner.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
		this.owner.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
	}

	public onExit(data?: any): void {
		this.owner.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
		this.owner.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
	}

	private onTouchBegin(evt: egret.TouchEvent): void {
		this.beginX = evt.localX;
		this.beginY = evt.localY;
	}

	private onTouchEnd(evt: egret.TouchEvent): void {
		//篮球坐标
		let bx: number = this.owner.basketball.x;
		let by: number = this.owner.basketball.y;
		//抛掷角度
		let throwAngle: number = Math.atan2(this.beginY - evt.localY, this.beginX - evt.localX);

		let p0: egret.Point = new egret.Point(bx, by);
		let p1: egret.Point = new egret.Point(by - 600 / Math.tan(throwAngle), by - 600);
		let p2: egret.Point = new egret.Point(by - 750 / Math.tan(throwAngle), by - 600 - (750 - 600));
		this.owner.lineList = [p0, p1, p2];

		let color: Array<number> = [0xff0000, 0x00ff00, 0x0000ff];

		this.owner.sp.graphics.clear();
		this.owner.lineList.forEach((element, index) => {
			this.owner.sp.graphics.beginFill(color[index]);
			this.owner.sp.graphics.drawCircle(element.x, element.y, 9);
			this.owner.sp.graphics.endFill();
			console.log(element.x, element.y, throwAngle);
		})
		this.owner.staticMachine.changeState(GameStateRun);
	}
}

class GameStateRun implements IState {
	owner: GameScene;

	public onEnter(data: any): void {
		this.owner = data;
		this.owner.addEventListener(egret.Event.ENTER_FRAME, this.onUpdate, this);
		egret.Tween.get(this).to({ factor: 1 }, 2000).call(this.moveOver, this);
	}

	public onExit(data?: any): void {
		this.owner.removeEventListener(egret.Event.ENTER_FRAME, this.onUpdate, this);
	}

	private onUpdate(evt: egret.Event): void {
		this.owner.sp.graphics.beginFill(0xffffff);
		this.owner.sp.graphics.drawCircle(this.owner.basketball.x, this.owner.basketball.y, 5);
		this.owner.sp.graphics.endFill();
	}

	public get factor(): number {
		return 0;
	}

	public set factor(value: number) {
		this.owner.basketball.x = (1 - value) * (1 - value) * this.owner.lineList[0].y + 2 * value * (1 - value) * this.owner.lineList[1].x + value * value * this.owner.lineList[2].x;
		this.owner.basketball.y = (1 - value) * (1 - value) * this.owner.lineList[1].y + 2 * value * (1 - value) * this.owner.lineList[1].y + value * value * this.owner.lineList[2].y;
	}

	private moveOver(): void {
		this.owner.basketball.x = 375;
		this.owner.basketball.y = 937;
		this.owner.staticMachine.changeState(GameStateReady);
	}
}