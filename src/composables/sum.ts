export default function () {
    const sum = (a: number, b: number) => a + b;

    const sort = (L: number[]) => {
        return L.sort();
    }

    return { sum, sort }
}