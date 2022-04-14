/**訊息 Mediator */
class MessageMediator extends puremvc.Mediator {
    private messageAlert: MessageAlert = new MessageAlert();
    public constructor(mediatorName?: string, viewComponent?: Main) {
        super(mediatorName, viewComponent);
    }

    public getViewComponent(): Main {
        return this.viewComponent as Main;
    }

    public listNotificationInterests(): string[] {
        return [
            NotificationEvent[NotificationEvent.INIT_EVENT],
            NotificationEvent[NotificationEvent.MESSAGE_EVENT],
        ];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const name: string = notification.getName();
        switch (name) {
            case NotificationEvent[NotificationEvent.INIT_EVENT]:
                {
                    this.getViewComponent().addChild(this.messageAlert);
                }
                break;
            case NotificationEvent[NotificationEvent.MESSAGE_EVENT]:
                {
                    const message: string = notification.getBody() as string;
                    this.messageAlert.showMessage(message)
                }
                break;
        }
    }
}