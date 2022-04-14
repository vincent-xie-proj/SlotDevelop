/**遊戲資料 */
class GameProxy extends puremvc.Proxy implements puremvc.IProxy {
    /**作弊資料 */
    private cheatResult: number[] = [];

    /**點數 */
    private credit: number = 0;

    /**下注失敗次數 */
    private countOfSpinFail: number = 0;

    /**下注金額 */
    private static BET: number = 100;

    public constructor(proxyName?: string, data?: any) {
        super(proxyName, data);
        this.init();
    }

    /**初始化資料 */
    public init(): void {
        this.cheatResult = [];
        this.credit = 1000;
        this.loadData()
    }

    /**載入資料 */
    private loadData(): void {
        setTimeout(() => {
            this.sendNotification(NotificationEvent[NotificationEvent.GAME_START_EVENT])
        }, 500)
    }

    /**下注 */
    public spin(): SpinResultDto {
        // 檢查下注額
        if (this.credit < GameProxy.BET) {
            let message: string = "點數不足";
            switch (this.countOfSpinFail) {
                case 3:
                    {
                        message = "您的點數不足，請洽客服充值";
                    }
                    break;
                case 10:
                    {
                        message = "您知道嗎? 可以開啟密技充值唷!";
                    }
                    break;
                case 15:
                    {
                        message = "已經沒點數了! 快充值!";
                    }
                    break;
                case 30:
                    {
                        message = "不充值也不用密技?! 建議直接關遊戲視窗吧!";
                        this.countOfSpinFail = 0;
                    }
                    break;
            }
            this.countOfSpinFail++;
            return new SpinResultDto(message, false);
        }

        const beforeBetOfCredit: number = this.credit;
        this.credit -= GameProxy.BET;
        const afterBetOfCredit: number = this.credit;

        // 取得轉輪結果
        const symbolList: number[] = this.getSymbolList();
        this.cheatResult = [] // 銷毀作弊資料

        // 計算輸贏
        let isWin: boolean = true;
        let symbol: number = symbolList[0];
        for (let i: number = 1; i < 3; i++) {
            if (symbol !== symbolList[i]) {
                isWin = false;
                break;
            }
        }

        let bonus: number = 0;
        if (isWin) {
            bonus = GameProxy.BET;
            this.credit += bonus + GameProxy.BET;
        }

        const winLose: number = this.credit - beforeBetOfCredit;
        return new SpinResultDto("", true, symbolList, GameProxy.BET, this.credit, bonus, beforeBetOfCredit, afterBetOfCredit, winLose);
    }

    /**取得轉輪列表 */
    private getSymbolList(): number[] {
        const arr: number[] = [];
        for (let i: number = 0; i < 3; i++) {
            let symbol: number = this.cheatResult[i]; // 先抓作弊轉輪符號
            if (!symbol) {
                symbol = Math.floor(Math.random() * 10);
            }

            arr.push(symbol);
        }

        return arr;
    }

    /**設定作弊資料 */
    public setCheatResult(arr: number[]): void {
        this.cheatResult = [...arr];
    }

    /**取得點數 */
    public getCredit(): number {
        return this.credit;
    }

    /**增加點數 */
    public addCredit(credit: number): void {
        this.credit += credit;
    }
}