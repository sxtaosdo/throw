class ClientManager extends BaseManager {

	public constructor() {
		super();
	}

	public static get instance(): ClientManager {
		if (ClientManager._instance == null) {
			ClientManager._instance = new ClientManager();
		}
		return ClientManager._instance;
	}

	public async init(): Promise<void> {
		// return new Promise<void>((res, rej) => {
		// 	res();
		// });
	}
}