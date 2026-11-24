function fail(message) {
    throw new Error(message);
}
const lines = text => text.split(/\r?\n/).map(line => line.trim()).filter(Boolean);
export function transform(s) {
    if (!s.trim()) fail('Enter some source text.');
    let sum = 0,
        weight = 0;
    for (const l of lines(s)) {
        const f = l.split('|').map(x => x.trim());
        if (f.length !== 3 || f.some(x => !x) || !Number.isFinite(+f[1]) || !Number.isFinite(+f[2]) || +f[2] <= 0) fail('Use criterion | score | positive weight');
        sum += f[1] * f[2];
        weight += +f[2]
    }
    return 'Weighted mean: ' + (sum / weight).toFixed(3) + '\nTotal weight: ' + weight
}
