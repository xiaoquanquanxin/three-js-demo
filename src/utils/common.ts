//  随机数
const randomFn = (min: number, max: number): number => {
    return Math.random() * (max - min + 1) + min
}

export { randomFn }
