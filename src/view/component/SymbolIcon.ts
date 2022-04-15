/**轉輪符號 */
class SymbolIcon extends eui.Component implements eui.UIComponent {
	/**icon */
	private icon: eui.Image;

	/**目前顯示影格 */
	private currentFrame: number
	public constructor() {
		super();
	}

	/**顯示影格 */
	public showFrame(frame: number): void {
		this.icon.texture = RES.getRes(`Symbol_json.Symbol${frame}`);
		this.currentFrame = frame;
	}

	/**取得顯示影格索引 */
	public getFrame(): number {
		return this.currentFrame;
	}
}