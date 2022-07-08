export function createGame(options: any): {
    k: import("kaboom").KaboomCtx;
    createOperator: (address: any) => any;
    createFruit: (address: any, amount: any, isAvailable: any) => {
        fruit: any;
        rewards: any;
    };
    destroyFruit: (fruitTag: any) => any;
    collectFruit: (fruitTag: any, operatorTag: any, callback: any) => any;
    setFruitAvailability: (fruitTag: any, isAvailable: any) => any;
    createCircleCheck: (pos: any) => any;
};
