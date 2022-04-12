class Symbol extends eui.Component implements eui.UIComponent {
	/**icon */
	private icon: eui.Image;
	public constructor() {
		super();

	}

	public showFrame(frame: number): void {
		this.icon.texture = RES.getRes(`Symbol_json.Symbol${frame}`);
	}
}