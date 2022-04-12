class LoadingMediator extends puremvc.Mediator {
    private loadingScene: LoadingScene = new LoadingScene();
    public constructor(mediatorName?: string, viewComponent?: Main) {
        super(mediatorName, viewComponent);
    }

    public getViewComponent(): Main {
        return this.viewComponent as Main;
    }

    public listNotificationInterests(): string[] {
        return [
            NotificationEvent[NotificationEvent.INIT_EVENT],
            NotificationEvent[NotificationEvent.LOADING_EVENT],
        ];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const name: string = notification.getName();
        const body: any = notification.getBody()
        switch (name) {
            case NotificationEvent[NotificationEvent.INIT_EVENT]:
                {
                    this.getViewComponent().addChild(this.loadingScene)
                }
                break;
            case NotificationEvent[NotificationEvent.LOADING_EVENT]:
                {
                    const isShow = body as boolean;
                    this.loadingScene.visible = isShow;
                }
                break;
        }
    }
}