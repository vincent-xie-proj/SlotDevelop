class InitControllerCommand extends puremvc.SimpleCommand {
    public execute(notification: puremvc.INotification): void {
        this.facade.registerCommand(NotificationEvent[NotificationEvent.GAME_START_EVENT], GameStartCommand)

        this.sendNotification(NotificationEvent[NotificationEvent.INIT_EVENT])
        this.sendNotification(NotificationEvent[NotificationEvent.LOADING_EVENT], true)
    }
}