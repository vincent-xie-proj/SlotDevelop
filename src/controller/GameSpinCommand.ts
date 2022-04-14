/**遊戲下注 command */
class GameSpinCommand extends puremvc.SimpleCommand {
    private static countOfNoCredit: number = 0;
    public execute(notification: puremvc.INotification): void {
        const gameProxy: GameProxy = this.facade.retrieveProxy(ProxyModel[ProxyModel.GAME_PROXY]) as GameProxy;
        const result: SpinResultDto = gameProxy.spin();
        if (result.isSpinSuccess) {
            this.sendNotification(NotificationEvent[NotificationEvent.GAME_RESULT_EVENT], result);
        } else {
            this.sendNotification(NotificationEvent[NotificationEvent.MESSAGE_EVENT], result.message);
        }
    }
}