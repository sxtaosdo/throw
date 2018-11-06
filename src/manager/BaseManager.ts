abstract class BaseManager implements IManager{

	protected static _instance: any;

	abstract init(data?:any):void;
}