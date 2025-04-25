const fs = require('fs');

// Read JSON file synchronously
const rawData = fs.readFileSync('testcase2.json', 'utf8');
const input = JSON.parse(rawData);

function parseJSONAndComputeF0(jsonData) {
  const k = jsonData.keys.k;
  const points = [];

  // Step 1: Extract k points from JSON
  for (const key in jsonData) {
    if (key === "keys") continue;

    const x = parseInt(key);
    const base = parseInt(jsonData[key].base);
    const y = parseInt(jsonData[key].value, base);

    points.push({ x, y });
    if (points.length === k) break;
  }

  // Step 2: Compute f(0) using Lagrange Interpolation
  let f0 = 0;
  for (let j = 0; j < k; j++) {
    const { x: xj, y: yj } = points[j];
    let lj = 1;

    for (let i = 0; i < k; i++) {
      if (i === j) continue;
      const { x: xi } = points[i];
      lj *= (-xi) / (xj - xi);
    }

    f0 += yj * lj;
  }

  return f0;
}

// Output result
console.log("f(0) =", parseJSONAndComputeF0(input));
