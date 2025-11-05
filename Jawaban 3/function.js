function findMissingBinary(arr) {
    if (!Array.isArray(arr) || arr.length === 0) return null;

    let low = 0;
    let high = arr.length - 1;
    const start = arr[0];

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        const expected = start + mid;

        if (arr[mid] === expected) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }

    return start + low;
}
