class GameMediator extends puremvc.Mediator {
    private gameScene: GameScene = new GameScene();
    public constructor(mediatorName?: string, viewComponent?: Main) {
        super(mediatorName, viewComponent);
    }

    public getViewComponent(): Main {
        return this.viewComponent as Main;
    }

    public listNotificationInterests(): string[] {
        return [
            NotificationEvent[NotificationEvent.INIT_EVENT],
            NotificationEvent[NotificationEvent.LOADING_EVENT]
        ];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const name: string = notification.getName();
        switch (name) {
            case NotificationEvent[NotificationEvent.INIT_EVENT]:
                {
                    this.getViewComponent().addChild(this.gameScene)
                }
                break;
        }
    }
}