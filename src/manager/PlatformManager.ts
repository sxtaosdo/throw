class PlatformManager extends BaseManager {

	private current: IChannel;

	public constructor() {
		super();
	}

	public static get instance(): PlatformManager {
		if (PlatformManager._instance == null) {
			PlatformManager._instance = new PlatformManager();
		}
		return PlatformManager._instance;
	}

	public async init(data?: any): Promise<void> {
		return new Promise<void>((res, rej) => {
			res();
		});
	}
}