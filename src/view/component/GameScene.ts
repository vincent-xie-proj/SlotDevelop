class GameScene extends eui.Component implements eui.UIComponent {
	/**是否轉動中 */
	private isRun: boolean = false;

	/**group */
	private symbolGroup: eui.Group;

	/**list */
	private symbolList: SymbolList[] = [];

	/**mask */
	private symbolMask: eui.Rect;

	/**spin button */
	private spinButton: eui.Image;

	/**cheat input */
	private cheatInput: eui.TextInput;

	/**spin event */
	public static SPIN_EVENT: string = "spinEvent";

	/**轉動間隔 */
	private static RUN_DELAY: number = 0.15;

	public constructor() {
		super();
		this.once(eui.UIEvent.COMPLETE, this.uiComplete, this);
		this.skinName = "GameSceneSkin";


	}

	/**元件建立 */
	private uiComplete(e: eui.UIEvent): void {
		//物件必須等到uiComplete才能使用
		for (let i: number = 0; i < 3; i++) {
			this.symbolList.push(this[`symbolList${i}`]);
		}

		this.symbolGroup.mask = this.symbolMask;
		this.spinButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.spin, this);
		this.symbolList[2].addEventListener(SymbolList.FINISH_EVENT, this.onFinishRun, this);
		this.cheatInput.visible = false;
	}

	/**初始化 */
	public init(): void {
		for (let item of this.symbolList) {
			item.init();
		}

		this.isRun = false;
		this.cheatInput.visible = false;
	}

	/**下注 */
	private spin(): void {
		this.dispatchEvent(new egret.Event(GameScene.SPIN_EVENT))
	}

	/**轉動 */
	public run(result: number[] = []): void {
		if (this.isRun) {
			return;
		}

		this.isRun = true;

		for (let i: number = 0; i < 3; i++) {
			this.symbolList[i].run(result[i], i * GameScene.RUN_DELAY);
		}
	}

	/**完成轉動 */
	private onFinishRun(): void {
		this.isRun = false;
	}

	/**作弊開關 */
	public switchCheat(): void {
		this.cheatInput.visible = !this.cheatInput.visible;
	}
}