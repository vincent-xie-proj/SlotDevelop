class GameProxy extends puremvc.Proxy implements puremvc.IProxy {
    private cheatResult: number[] = [];
    public constructor(proxyName?: string, data?: any) {
        super(proxyName, data);
        this.init();
    }

    public init(): void {
        console.log("GameProxy init");
        this.loadData()
    }

    private loadData(): void {
        setTimeout(() => {
            this.sendNotification(NotificationEvent[NotificationEvent.GAME_START_EVENT])
        }, 500)
    }

    public setCheatResult(arr: number[]): void {
        this.cheatResult = [...arr];
    }
}