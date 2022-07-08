export function inside({ x, y }: {
    x: any;
    y: any;
}, vs: any): boolean;
export function distance(a: any, b: any): number;
export function getProjectileVelocity(startingPos: any, targetPos: any, speed: any): {
    vx: number;
    vy: number;
};
export function isOutOfScreen(k: any): (pos: any) => boolean;
