/**下注按鈕 */
class SpinButton extends eui.Component implements eui.UIComponent {
	/**icon */
	private icon: eui.Image;
	public constructor() {
		super();
		this.once(eui.UIEvent.COMPLETE, this.uiComplete, this);
	}

	/**元件建立 */
	private uiComplete(e: eui.UIEvent): void {
		this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
		this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
	}

	/**按下按鈕 */
	private onTouchBegin(): void {
		this.icon.texture = RES.getRes("SpinButton_json.spinDown");
		this.icon.scaleX = this.icon.scaleY = 0.95;
	}

	/**放開按鈕 */
	private onTouchEnd(): void {
		this.icon.texture = RES.getRes("SpinButton_json.spin");
		this.icon.scaleX = this.icon.scaleY = 1;
	}

}