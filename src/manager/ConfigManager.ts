class ConfigManager extends BaseManager {

	public constructor() {
		super();
	}

	public static get instance(): ConfigManager {
		if (ConfigManager._instance == null) {
			ConfigManager._instance = new ConfigManager();
		}
		return ConfigManager._instance;
	}

	public async init(data?: any): Promise<void> {
		return new Promise<void>((res, rej) => {
			res();
		});
	}
}