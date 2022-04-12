class SymbolList extends eui.Component implements eui.UIComponent {

	private list: Symbol[] = [];

	public constructor() {
		super();

		this.once(eui.UIEvent.COMPLETE, this.uiComplete, this);
	}

	private uiComplete(e: eui.UIEvent): void {
		//物件必須等到uiComplete才能使用
		for (let i: number = 0; i < 10; i++) {
			this.list.push(this[`symbol${i}`]);
		}

		this.random();
	}

	public random(): void {
		const frameList: number[] = [];
		const count: number = 10;
		for (let i: number = 0; i < count; i++) {
			frameList.push(i);
		}

		Global.random(frameList, false);
		for (let i: number = 0; i < count; i++) {
			frameList.push(i);
			this.list[i].showFrame(frameList[i])
		}
	}

	public run(): void {
		//清除動畫
		TweenLite.killTweensOf(this);

		let tl = new TimelineMax();
		tl.fromTo(this, 0.5, { y: -970 }, { y: -1000 });
		tl.fromTo(this, 1, { y: -1000 }, { y: 0, repeat: -1, ease: Linear.easeNone });
	}
}