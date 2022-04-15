/**載入介面 */
class LoadingScene extends eui.Component implements eui.UIComponent {
	/**loading bar */
	private loadingBar: eui.Image;

	/**loading frame */
	private loadingFrame: eui.Image;

	/**loading mask */
	private loadingMask: eui.Rect;

	/**loading percent */
	private loadingPercent: eui.Label;

	/**讀取 bar 縮放時間 */
	private static LOADING_BAR_DURATION: number = 0.5;
	public constructor() {
		super();
		this.once(eui.UIEvent.COMPLETE, this.uiComplete, this);

		this.skinName = "LoadingSceneSkin";
		this.finishLoading();
	}

	/**元件建立 */
	private uiComplete(e: eui.UIEvent): void {
		//物件必須等到uiComplete才能使用

		this.loadingBar.mask = this.loadingMask;
	}

	/**開始 loading */
	public startLoading(percent: number): void {
		TweenLite.killTweensOf(this.loadingMask);
		TweenLite.to(this.loadingMask, LoadingScene.LOADING_BAR_DURATION, {
			scaleX: percent, onUpdate: () => {
				this.loadingPercent.text = `${Math.floor(this.loadingMask.scaleX * 100)}%`
			}
		});
	}

	/**完成 loading */
	public finishLoading(): void {
		TweenLite.killTweensOf(this.loadingMask);
		this.loadingMask.scaleX = 0;
		this.loadingPercent.text = "0%";
	}
}