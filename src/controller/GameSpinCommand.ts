class GameSpinCommand extends puremvc.SimpleCommand {
    public execute(notification: puremvc.INotification): void {
        this.sendNotification(NotificationEvent[NotificationEvent.GAME_RESULT_EVENT], []);
    }
}