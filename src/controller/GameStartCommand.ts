/**遊戲開始 command */
class GameStartCommand extends puremvc.SimpleCommand {
    public execute(notification: puremvc.INotification): void {
        const gameProxy: GameProxy = this.facade.retrieveProxy(ProxyModel[ProxyModel.GAME_PROXY]) as GameProxy;
        this.sendNotification(NotificationEvent[NotificationEvent.UPDATE_CREDIT_EVENT], gameProxy.getCredit())
        this.sendNotification(NotificationEvent[NotificationEvent.LOADING_EVENT], [false, 1])
    }
}