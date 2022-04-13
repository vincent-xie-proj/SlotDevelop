class GameMediator extends puremvc.Mediator {
    private gameScene: GameScene = new GameScene();
    public constructor(mediatorName?: string, viewComponent?: Main) {
        super(mediatorName, viewComponent);

        this.gameScene.addEventListener(GameScene.SPIN_EVENT, this.spin, this);
        document.addEventListener("keydown", this.onKeyDown.bind(this));
    }

    public getViewComponent(): Main {
        return this.viewComponent as Main;
    }

    public listNotificationInterests(): string[] {
        return [
            NotificationEvent[NotificationEvent.INIT_EVENT],
            NotificationEvent[NotificationEvent.GAME_RESULT_EVENT]
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
                    const result: number[] = notification.getBody() as number[];
                    this.gameScene.run(result);
                }
                break;
        }
    }

    private onKeyDown(e: KeyboardEvent) {
        switch (e.key) {
            case "Tab":
                {
                    this.gameScene.switchCheat();
                }
                break;
        }
    }

    private spin(): void {
        this.sendNotification(NotificationEvent[NotificationEvent.GAME_SPIN_EVENT]);
    }
}