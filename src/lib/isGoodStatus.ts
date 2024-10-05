export default function isGoodStatus(status: number) {
    if (200 <= status && status <= 299) return true;
    return false;
}
