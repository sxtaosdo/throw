class LocalManager extends BaseManager {

	public language: string;

	public constructor() {
		super();
	}

	public static get instance(): LocalManager {
		if (LocalManager._instance == null) {
			LocalManager._instance = new LocalManager();
		}
		return LocalManager._instance;
	}

	public async init(data?: any): Promise<void> {
		return new Promise<void>((res, rej) => {
			res();
		});
	}
}