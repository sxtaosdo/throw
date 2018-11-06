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
		let p1: egret.Point = new egret.Point(by - 750 / Math.tan(throwAngle), by - 750);
		let p2: egret.Point = new egret.Point(by - 900 / Math.tan(throwAngle), by - 750 - (900 - 750));
		this.owner.lineList = [p0, p1, p2];

		this.owner.sp.graphics.clear();
		this.owner.lineList.forEach(element => {
			this.owner.sp.graphics.beginFill(0xffffff);
			this.owner.sp.graphics.drawCircle(element.x, element.y, 9);
			this.owner.sp.graphics.endFill();
			console.log(element.x, element.y, throwAngle);
		})

	}
}