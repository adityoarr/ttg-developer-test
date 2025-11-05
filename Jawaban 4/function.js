function findExpression(numbers, target) {
    const init = numbers.map(n => ({ value: n, expr: n.toString() }));

    function recurse(operands) {
        if (operands.length === 1) {
            const [{ value, expr }] = operands;
            return Math.abs(value - target) < 1e-9 ? expr : null;
        }

        for (let i = 0; i < operands.length; i++) {
            for (let j = 0; j < operands.length; j++) {
                if (i === j) continue;

                const a = operands[i];
                const b = operands[j];

                const rest = operands.filter((_, idx) => idx !== i && idx !== j);

                const candidates = [
                    {
                        value: a.value + b.value,
                        expr: `(${a.expr}+${b.expr})`,
                    },
                    {
                        value: a.value - b.value,
                        expr: `(${a.expr}-${b.expr})`,
                    },
                    {
                        value: a.value * b.value,
                        expr: `(${a.expr}*${b.expr})`,
                    },
                ];

                for (const cand of candidates) {
                    if (Math.abs(cand.value) > Math.abs(target) * 100) continue;

                    const next = [...rest, cand];
                    const result = recurse(next);
                    if (result) return result;
                }
            }
        }
        return null;
    }

    return recurse(init);
}
