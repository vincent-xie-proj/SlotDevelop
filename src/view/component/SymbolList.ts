class SymbolList extends eui.Component implements eui.UIComponent {
	/**符號列表 */
	private list: Symbol[] = [];

	/**符號數量 */
	private static COUNT: number = 10;

	/**可見數量 */
	private static VIEW_COUNT: number = 3;

	/**Y 起始座標*/
	private static START_Y: number = -450;

	/**Y 結束座標*/
	private static END_Y: number = -60;

	/**Y 緩衝量 */
	private static BUFFER_Y: number = 50;

	/**轉動緩衝時間 */
	private static BUFFER_DURATION: number = 0.15;

	/**轉動時間 */
	private static RUN_DURATION: number = 0.2;

	/**轉動次數 */
	private static RUN_TIMES: number = 5;

	/**模糊效果 */
	private blurFilter: egret.BlurFilter = new egret.BlurFilter(0, 0);
	/**最大模糊量 */
	private static MAX_BLUR: number = 15;

	/**完成事件 */
	public static FINISH_EVENT: string = "finishEvent";

	public constructor() {
		super();

		this.once(eui.UIEvent.COMPLETE, this.uiComplete, this);
	}

	/**元件建立 */
	private uiComplete(e: eui.UIEvent): void {
		//物件必須等到uiComplete才能使用
		for (let i: number = 0; i < SymbolList.VIEW_COUNT * 2; i++) {
			this.list.push(this[`symbol${i}`]);
		}

		this.init();
	}

	/**初始化 */
	public init(): void {
		//清除動畫
		TweenLite.killTweensOf(this);

		this.random();
		this.y = SymbolList.START_Y;
		this.filters = [this.blurFilter];
		this.blurFilter.blurY = 0;
	}

	/**隨機列表 */
	public random(isInit: boolean = true, appointFrame: number = -1): void {
		const frameList: number[] = this.getFrameOfList();

		// 處理可見符號
		for (let i: number = 0; i < SymbolList.VIEW_COUNT; i++) {
			const frame: number = isInit ? Math.floor(Math.random() * SymbolList.COUNT) : frameList[i + SymbolList.VIEW_COUNT];
			this.list[i].showFrame(frame);
		}

		// 處理不可見符號
		for (let i: number = SymbolList.VIEW_COUNT; i < SymbolList.VIEW_COUNT * 2; i++) {
			const frame: number = Math.floor(Math.random() * SymbolList.COUNT);
			this.list[i].showFrame(frame);
		}

		// 指定符號
		if (appointFrame !== -1) {
			this.list[SymbolList.VIEW_COUNT * 2 - 2].showFrame(appointFrame);
		}
	}

	/**轉動 */
	public run(stopFrame: number, delay: number = 0): void {
		//清除動畫
		TweenLite.killTweensOf(this);

		// 起始緩衝
		const startTimeLine: TimelineLite = new TimelineLite();
		startTimeLine.add(TweenLite.fromTo(this, SymbolList.BUFFER_DURATION, { y: SymbolList.START_Y }, { y: SymbolList.START_Y - SymbolList.BUFFER_Y, ease: Linear.easeIn, immediateRender: false }));
		startTimeLine.add(TweenLite.fromTo(this, SymbolList.BUFFER_DURATION, { y: SymbolList.START_Y - SymbolList.BUFFER_Y }, { y: SymbolList.START_Y, ease: Linear.easeOut, immediateRender: false }));

		// 重複轉動
		const runTimeLine: TimelineLite = new TimelineLite();
		// TODO 因需設置 blur，剛好跟 repeat 有衝突到，暫時先採用 for，待找更好的做法
		for (let i: number = 0; i < SymbolList.RUN_TIMES; i++) {
			const tweenLite: TweenLite = TweenLite.fromTo(this, SymbolList.RUN_DURATION, { y: SymbolList.START_Y }, { y: SymbolList.END_Y, ease: Linear.easeNone, immediateRender: false });
			switch (i) {
				case 0:
					{
						tweenLite.eventCallback("onUpdate", () => {
							const progress: number = (this.y - SymbolList.START_Y) / (SymbolList.END_Y - SymbolList.START_Y);
							this.blurFilter.blurY = SymbolList.MAX_BLUR * progress;
						});
					}

					break;
				case SymbolList.RUN_TIMES - 1:
					{
						tweenLite.eventCallback("onUpdate", () => {
							const progress: number = (this.y - SymbolList.START_Y) / (SymbolList.END_Y - SymbolList.START_Y);
							this.blurFilter.blurY = SymbolList.MAX_BLUR * (1 - progress);
						});
						tweenLite.eventCallback("onStart", () => {
							this.random(false, stopFrame);
						})
					}

					break;

				default:
					{
						tweenLite.eventCallback("onStart", () => {
							this.random(false);
						})
					}
					break;
			}
			runTimeLine.add(tweenLite);
		}

		// 結束緩衝
		const endTimeLine: TimelineLite = new TimelineLite();
		endTimeLine.add(TweenLite.fromTo(this, SymbolList.BUFFER_DURATION, { y: SymbolList.START_Y }, {
			y: SymbolList.START_Y + SymbolList.BUFFER_Y, ease: Linear.easeOut, immediateRender: false, onStart: () => {
				this.random(false);
			}
		}))
		endTimeLine.add(TweenLite.fromTo(this, SymbolList.BUFFER_DURATION, { y: SymbolList.START_Y + SymbolList.BUFFER_Y }, {
			y: SymbolList.START_Y, ease: Linear.easeIn, immediateRender: false
		}))

		// 播放時間軸
		const timeLine: TimelineLite = new TimelineLite({
			delay: delay, onComplete: () => {
				this.dispatchEvent(new egret.Event(SymbolList.FINISH_EVENT));
			}
		});
		timeLine.add(startTimeLine);
		timeLine.add(runTimeLine);
		timeLine.add(endTimeLine);
	}

	/**取得目前影格顯示序列 */
	private getFrameOfList() {
		return this.list.map(symbol => symbol.getFrame());
	}
}