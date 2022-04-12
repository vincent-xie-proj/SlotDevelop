class GameScene extends eui.Component implements eui.UIComponent {
	/**group */
	private symbolGroup: eui.Group;

	/**list */
	private symbolList: SymbolList[] = [];

	/**mask */
	private symbolMask: eui.Rect;

	public constructor() {
		super();
		this.once(eui.UIEvent.COMPLETE, this.uiComplete, this);
		this.skinName = "GameSceneSkin";


	}

	private uiComplete(e: eui.UIEvent): void {
		//物件必須等到uiComplete才能使用
		for (let i: number = 0; i < 3; i++) {
			this.symbolList.push(this[`symbolList${i}`]);
		}

		this.symbolGroup.mask = this.symbolMask

		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.test, this);
	}

	private test(): void {
		this.symbolList[0].run();
	}
}