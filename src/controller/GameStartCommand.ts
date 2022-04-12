class GameStartCommand extends puremvc.SimpleCommand {
    public execute(notification: puremvc.INotification): void {
        this.sendNotification(NotificationEvent[NotificationEvent.LOADING_EVENT], false)
    }
}