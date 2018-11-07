class PhysicsManager extends BaseManager {

	public static readonly FACTOR: number = 50;

	public world: p2.World;

	private debugDraw: p2DebugDraw;
	private root: egret.DisplayObjectContainer;

	public static get instance(): PhysicsManager {
		if (PhysicsManager._instance == null) {
			PhysicsManager._instance = new PhysicsManager();
		}
		return PhysicsManager._instance;
	}

	public constructor() {
		super();
	}

	public init(data?: any): void {
		this.root = data;
		this.world = new p2.World();
		this.world.sleepMode = p2.World.BODY_SLEEPING;
		this.world.gravity = [0, 10];
	}

	public showDebug(key: boolean = true): void {
		if (key) {
			this.createDebug();
			TimerManager.instance.doFrameLoop(1, this.loop, this);
		}
	}

	//创建调试试图
	private createDebug(): void {
		this.debugDraw = new p2DebugDraw(this.world);
		var sprite: egret.Sprite = new egret.Sprite();
		sprite.name = "P2WorldSprite"
		this.root.stage.addChild(sprite);
		this.debugDraw.setSprite(sprite);
	}

	private loop(): void {
		this.world.step(60 / 1000);
		this.debugDraw.drawDebug();
		this.world.bodies.forEach(element => {
			if (element.displays) {
				element.displays[0].x = element.position[0] * PhysicsManager.FACTOR;
				element.displays[0].y = this.root.stage.stageHeight - element.position[1] * PhysicsManager.FACTOR;
				element.displays[0].rotation = 360 - element.angle * 180 / Math.PI;
			}
		})
	}
}