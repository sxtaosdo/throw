class P2Util {
	public static readonly FACTOR: number = 50;//长度单位个比例

	public static E2P(ex: number, ey: number, stageHeight: number = 0): Array<number> {
		var positionX: number = (ex / P2Util.FACTOR);
		var positionY: number = ((stageHeight - ey) / P2Util.FACTOR);
		return [positionX, positionY]
	}
}