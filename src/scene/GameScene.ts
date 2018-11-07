class GameScene extends BaseScene implements IEntity {

	public static readonly RS: number = 20;

	public shadow: eui.Image;
	public backboard: eui.Group;
	public basketball: eui.Image;
	public physicsLayout: eui.Group;

	public lineList: Array<egret.Point>;
	public sp: egret.Sprite;
	public lastY: number;
	public rotations: number = GameScene.RS;

	public staticMachine: IStateMachine;

	public constructor() {
		super();
		this.lineList = [];
		this.skinName = "GameSceneSkin";
		this.staticMachine = new BaseStateMachine(this);

	}
	protected onComplete(): void {
		this.staticMachine.changeState(GameStateInit);

		this.sp = new egret.Sprite();
		this.addChild(this.sp);
	}
}

class GameStateInit implements IState {
	owner: GameScene;
	world: p2.World;

	public onEnter(data: any): void {
		this.owner = data;
		this.world = PhysicsManager.instance.world;
		this.createPhysicsWorld();
		this.owner.staticMachine.changeState(GameStateReady);
	}
	public onExit(data?: any): void {

	}

	private createPhysicsWorld(): void {
		this.createPlane();
		this.createBasketball();
		this.createBasket();
	}

	private createPlane() {
		//创建一个shape形状
		let planeShape: p2.Plane = new p2.Plane();
		//创建body刚体
		let planeBody: p2.Body = new p2.Body({
			//刚体类型
			type: p2.Body.STATIC,
			//刚体的位置
			position: [0, this.owner.stage.stageHeight / PhysicsManager.FACTOR]
		});
		planeBody.angle = Math.PI;
		planeBody.displays = [];
		planeBody.addShape(planeShape);
		this.world.addBody(planeBody);
	}

	private createBasketball(): void {
		let shape: p2.Circle = new p2.Circle({ radius: this.owner.basketball.width / 100 });
		let body: p2.Body = new p2.Body();
		// body.type = p2.Body.STATIC;
		body.position[0] = this.owner.basketball.x / PhysicsManager.FACTOR;
		body.position[1] = (this.owner.stage.stageHeight - this.owner.basketball.y) / PhysicsManager.FACTOR;
		body.displays = [this.owner.basketball];
		body.addShape(shape);
		this.world.addBody(body);
	}

	private createBasket(): void {
		let ps1: egret.Shape = new egret.Shape();
		ps1.graphics.beginFill(0x000000);
		ps1.graphics.drawCircle(0, 0, 20);
		ps1.graphics.endFill();
		this.owner.stage.addChild(ps1);

		let shape: p2.Shape = new p2.Circle({ radius: ps1.width / 100 });
		let body: p2.Body = new p2.Body();
		body.addShape(shape);
		body.position[0] = 100 / PhysicsManager.FACTOR;
		body.position[1] = (this.owner.stage.stageHeight - 100) / PhysicsManager.FACTOR;
		body.displays = [ps1];
		this.world.addBody(body);
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
		console.log("onTouchBegin", this.beginX, this.beginY);
	}

	private onTouchEnd(evt: egret.TouchEvent): void {
		console.log("onTouchBegin", evt.localX, evt.localY);
		this.owner.lastY = this.owner.backboard.y;
		this.owner.basketball.scaleX = this.owner.basketball.scaleY = 1;
		this.owner.shadow.x = this.owner.basketball.x;
		this.owner.shadow.alpha = 1;
		//篮球坐标
		let bx: number = this.owner.basketball.x;
		let by: number = this.owner.basketball.y;
		//抛掷角度
		let throwAngle: number = Math.atan2(evt.localY - this.beginY, evt.localX - this.beginX);
		let p0: egret.Point = new egret.Point(bx, by);
		let p1: egret.Point = new egret.Point(bx + 800 * Math.cos(throwAngle), by - 800);
		let p2: egret.Point = new egret.Point(bx + 1000 * Math.cos(throwAngle), by - 650);
		this.owner.lineList = [p0, p1, p2];

		// this.owner.lineList = [new egret.Point(bx, by), new egret.Point(bx + 79, by - 900), new egret.Point(bx + 140, by - 600)];

		let color: Array<number> = [0xff0000, 0x00ff00, 0x0000ff];

		this.owner.sp.graphics.clear();
		this.owner.lineList.forEach((element, index) => {
			this.owner.sp.graphics.beginFill(color[index]);
			this.owner.sp.graphics.drawCircle(element.x, element.y, 9);
			this.owner.sp.graphics.endFill();
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
		this.owner.basketball.scaleX = this.owner.basketball.scaleY = 1;
	}

	private onUpdate(evt: egret.Event): void {
		this.owner.sp.graphics.beginFill(0xffffff);
		this.owner.sp.graphics.drawCircle(this.owner.basketball.x, this.owner.basketball.y, 5);
		this.owner.sp.graphics.endFill();
		if (this.owner.basketball.y < this.owner.lastY) {
			this.owner.basketball.scaleX = this.owner.basketball.scaleY -= 0.005;
		}
		this.owner.lastY = this.owner.basketball.y;
		this.owner.shadow.x = this.owner.basketball.x;
		this.owner.shadow.alpha -= 0.02;
		this.owner.shadow.scaleX = this.owner.shadow.scaleY -= 0.01;
		this.owner.shadow.y -= 1;
		this.owner.basketball.rotation += this.owner.rotations;
		this.owner.rotations -= 0.15;
		// console.log(this.owner.basketball.scaleX);
	}

	public get factor(): number {
		return 0;
	}

	public set factor(value: number) {
		this.owner.basketball.x = (1 - value) * (1 - value) * this.owner.lineList[0].x + 2 * value * (1 - value) * this.owner.lineList[1].x + value * value * this.owner.lineList[2].x;
		this.owner.basketball.y = (1 - value) * (1 - value) * this.owner.lineList[0].y + 2 * value * (1 - value) * this.owner.lineList[1].y + value * value * this.owner.lineList[2].y;
	}

	private moveOver(): void {
		this.owner.basketball.x = 375;
		this.owner.basketball.y = 937;
		this.owner.shadow.x = this.owner.basketball.x;
		this.owner.shadow.alpha = 1;
		this.owner.shadow.scaleX = this.owner.shadow.scaleY = 1;
		this.owner.shadow.y = 1030;
		this.owner.basketball.rotation = 0;
		this.owner.rotations = GameScene.RS;
		this.owner.staticMachine.changeState(GameStateReady);
	}
}