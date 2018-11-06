class UserManager extends BaseManager {

	public self: UserVo;

	public constructor() {
		super();
	}

	public static get instance(): UserManager {
		if (UserManager._instance == null) {
			UserManager._instance = new UserManager();
		}
		return UserManager._instance;
	}

	public init(): void {

	}
	
}