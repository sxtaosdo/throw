class AssetsManager extends BaseManager {

	public constructor() {
		super();
	}

	public static get instance(): AssetsManager {
		if (AssetsManager._instance == null) {
			AssetsManager._instance = new AssetsManager();
		}
		return AssetsManager._instance;
	}

	public async init(data?:any): Promise<void> {
		return new Promise<void>((res,rej)=>{
			res();
		});
	}
}