class MessageAlert extends eui.Component implements eui.UIComponent {
	/**文字訊息 */
	private messageText: eui.Label;

	/**關閉按鈕 */
	private closeButton: eui.Image;
	public constructor() {
		super();
		this.once(eui.UIEvent.COMPLETE, this.uiComplete, this);
		this.skinName = "MessageAlertSkin";
	}

	/**元件建立 */
	private uiComplete(e: eui.UIEvent): void {
		this.closeButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeMessage, this);
		this.init();
	}

	/**初始化 */
	public init(): void {
		this.closeMessage();
	}

	/**顯示訊息 */
	public showMessage(text: string): void {
		this.messageText.text = text;
		this.visible = true;
	}

	/**關閉訊息 */
	public closeMessage(): void {
		this.messageText.text = "";
		this.visible = false;
	}
}