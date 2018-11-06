class SceneManager implements IManager {
    private static _manager: SceneManager;

    private rootLayer: eui.UILayer;//起始场景
    private currentScene: BaseScene;//需要显示的场景
    private pop_scene: BaseScene;//弹出场景层
    private sceneMap: any;

    public static get instance() {
        if (SceneManager._manager == null) {
            SceneManager._manager = new SceneManager();
        }
        return SceneManager._manager;
    }
    public constructor() {
        this.sceneMap = {};
    }

    //切换场景
    public changeScene(scene: any) {
        let newScene: BaseScene;
        if (!this.sceneMap[scene.toString()]) {
            newScene = new scene();
            this.sceneMap[scene.toString()] = newScene;
        }
        if (this.currentScene) {
            this.rootLayer.removeChild(this.currentScene);
            this.currentScene = null;
        }
        this.rootLayer.addChild(newScene);
        this.currentScene = newScene;
    }
    //弹出场景层
    public closeScene(s: BaseScene) {
        this.removeScene();
        if (!this.pop_scene) {
            this.rootLayer.addChild(s);
            this.pop_scene = s;
        }
    }
    //关闭场景层
    public removeScene() {
        if (this.pop_scene) {
            this.rootLayer.removeChild(this.pop_scene);
            this.pop_scene = null;
        }
    }

    public init(data?: any): void {
        this.rootLayer = data;
    }

}