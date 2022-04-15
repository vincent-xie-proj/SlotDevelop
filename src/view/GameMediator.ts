/**遊戲 Mediator */
class GameMediator extends puremvc.Mediator {
    private gameScene: GameScene = new GameScene();
    private resultTemp: SpinResultDto;
    public constructor(mediatorName?: string, viewComponent?: Main) {
        super(mediatorName, viewComponent);

        this.gameScene.addEventListener(ViewEvent[ViewEvent.SPIN_EVENT], this.spin, this);
        this.gameScene.addEventListener(ViewEvent[ViewEvent.CHEAT_EVENT], this.cheat, this);
        this.gameScene.addEventListener(ViewEvent[ViewEvent.FINISH_RUN_EVENT], this.showResult, this);
        document.addEventListener("keyup", this.onKeyUp.bind(this));
    }

    public getViewComponent(): Main {
        return this.viewComponent as Main;
    }

    public listNotificationInterests(): string[] {
        return [
            NotificationEvent[NotificationEvent.INIT_EVENT],
            NotificationEvent[NotificationEvent.GAME_RESULT_EVENT],
            NotificationEvent[NotificationEvent.UPDATE_CREDIT_EVENT],
        ];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const name: string = notification.getName();
        switch (name) {
            case NotificationEvent[NotificationEvent.INIT_EVENT]:
                {
                    this.getViewComponent().addChild(this.gameScene);
                }
                break;
            case NotificationEvent[NotificationEvent.GAME_RESULT_EVENT]:
                {
                    this.resultTemp = notification.getBody() as SpinResultDto;
                    this.gameScene.run(this.resultTemp.symbollist);
                    this.gameScene.updateCredit(this.resultTemp.afterBetOfCredit);
                }
                break;
            case NotificationEvent[NotificationEvent.UPDATE_CREDIT_EVENT]:
                {
                    const credit: number = notification.getBody() as number;
                    this.gameScene.updateCredit(credit);
                }
                break;
        }
    }

    /**鍵盤輸入 */
    private onKeyUp(e: KeyboardEvent) {
        switch (e.keyCode) {
            case 192:
                {
                    this.gameScene.switchCheat();
                }
                break;
        }
    }

    /**下注 */
    private spin(): void {
        this.sendNotification(NotificationEvent[NotificationEvent.GAME_SPIN_EVENT]);
    }

    /**作弊 */
    private cheat(e: egret.Event): void {
        this.sendNotification(NotificationEvent[NotificationEvent.GAME_CHEAT_EVENT], e.data);
    }

    /**顯示下注結果 */
    private showResult(): void {
        this.gameScene.showResult(this.resultTemp.isWin, this.resultTemp.winLose);
        this.gameScene.updateCredit(this.resultTemp.credit);
        this.resultTemp = null;
    }
}