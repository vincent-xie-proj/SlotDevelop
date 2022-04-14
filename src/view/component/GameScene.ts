/**遊戲場景介面 */
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
	private spinButton: SpinButton;

	/**cheat input */
	private cheatInput: eui.TextInput;

	/**點數 */
	private credit: eui.Label;

	/**獎金 */
	private bonus: eui.Label;

	/**錯誤訊息 */
	private errorMsg: eui.Label;

	/**轉動間隔 */
	private static RUN_DELAY: number = 0.15;

	/**符號列表數量 */
	public static COUNT_OF_LIST: number = 3;

	public constructor() {
		super();
		this.once(eui.UIEvent.COMPLETE, this.uiComplete, this);
		this.skinName = "GameSceneSkin";
	}

	/**元件建立 */
	private uiComplete(e: eui.UIEvent): void {
		//物件必須等到uiComplete才能使用
		for (let i: number = 0; i < GameScene.COUNT_OF_LIST; i++) {
			this.symbolList.push(this[`symbolList${i}`]);
		}

		document.addEventListener("keyup", this.onKeyUp.bind(this));
		this.symbolGroup.mask = this.symbolMask;
		this.spinButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.spin, this);
		this.symbolList[2].addEventListener(ViewEvent[ViewEvent.FINISH_RUN_EVENT], this.onFinishRun, this);
		this.cheatInput.prompt = `操控轉輪:請輸入3組數字並以逗號","隔開，輸入完成後請按下Enter發送指令  增加點數:請輸入 $數字，ex:$100`;
		this.closeCheat();
	}

	/**初始化 */
	public init(): void {
		for (let item of this.symbolList) {
			item.init();
		}

		this.isRun = false;
		this.closeCheat();
	}

	/**下注 */
	private spin(): void {
		if (!this.isRun) {
			this.dispatchEvent(new egret.Event(ViewEvent[ViewEvent.SPIN_EVENT]))
		}
	}

	/**轉動 */
	public run(result: number[] = []): void {
		this.isRun = true;
		this.bonus.text = "0";
		this.bonus.textColor = 0xFFFFFF;

		for (let i: number = 0; i < GameScene.COUNT_OF_LIST; i++) {
			this.symbolList[i].run(result[i], i * GameScene.RUN_DELAY);
		}
	}

	/**完成轉動 */
	private onFinishRun(): void {
		this.isRun = false;
		this.dispatchEvent(new egret.Event(ViewEvent[ViewEvent.FINISH_RUN_EVENT]))
	}

	/**作弊開關 */
	public switchCheat(): void {
		const isOpen: boolean = this.cheatInput.visible;
		if (isOpen) {
			this.closeCheat();
		} else {
			this.openCheat();
		}
	}

	/**開啟作弊介面 */
	private openCheat(): void {
		this.cheatInput.enabled = true;
		this.cheatInput.visible = true;
		this.errorMsg.visible = true;
	}

	/**關閉作弊介面 */
	private closeCheat(): void {
		this.cheatInput.text = "";
		this.cheatInput.visible = false;
		this.errorMsg.text = "";
		this.errorMsg.visible = false;

		const focusElement: Element = document.activeElement;
		if (focusElement.id === "egretInput") {
			focusElement["blur"]();
		}
	}

	/**鍵盤輸入 */
	private onKeyUp(e: KeyboardEvent) {
		const isOpen: boolean = this.cheatInput.visible;
		if (!isOpen) {
			return;
		}

		switch (e.key) {
			case "Enter":
				{
					this.sendCheat();
				}
				break;
		}
	}

	/**發送作弊指令 */
	private sendCheat(): void {
		const regExp: RegExp = new RegExp("\\s*", "g");
		let text: string = this.cheatInput.text;
		text = text.replace(regExp, "");

		if (text.indexOf("$") !== -1) {
			this.sendCheatCredit(text);
		} else {
			this.sendCheatList(text);
		}
	}

	/**發送增加點數指令 */
	private sendCheatCredit(text: string): void {
		const credit: number = parseInt(text.replace("$", ""), 10);
		if (isNaN(credit) || !credit) {
			this.errorMsg.text = "輸入錯誤格式，請重新輸入"
			return;
		}

		this.dispatchEvent(new egret.Event(ViewEvent[ViewEvent.CHEAT_EVENT], false, false, [0, credit]));
	}

	/**發送轉輪作弊指令 */
	private sendCheatList(text: string): void {
		const list: number[] = text.split(",").map(str => parseInt(str, 10));
		let isError = false;
		for (let i: number = 0; i < GameScene.COUNT_OF_LIST; i++) {
			const num: number = list[i];
			if (isNaN(num) || !num || num >= 10) {
				isError = true;
				break;
			}
		}

		if (isError) {
			this.errorMsg.text = "輸入錯誤格式，請重新輸入"
			return;
		}

		this.dispatchEvent(new egret.Event(ViewEvent[ViewEvent.CHEAT_EVENT], false, false, [1, list]));
	}

	/**更新點數 */
	public updateCredit(credit: number): void {
		this.credit.text = credit.toLocaleString();
	}

	/**顯示下注結果 */
	public showResult(bonus: number): void {
		this.bonus.text = bonus.toLocaleString();
		this.bonus.textColor = bonus > 0 ? 0x2A8CDD : 0xFF4C4C;
	}
}