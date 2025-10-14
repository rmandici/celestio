import React from "react";

export default function CubeAnimation() {
  // 3 stive, fiecare cu 3 coloane (x = -1, 0, 1) și 3 cuburi pe coloană (i = 3..1)
  const stacks = [0, 1, 2];
  const cols = [-1, 0, 1];
  const layers = [3, 2, 1];

  return (
    <div className="cube-stage">
      <div className="cube-container">
        {stacks.map((s) => (
          <div className="cube" key={`stack-${s}`}>
            {cols.map((x) => (
              <div
                style={{ ["--x" as any]: x, ["--y" as any]: 0 }}
                key={`col-${s}-${x}`}
              >
                {layers.map((i) => (
                  <span
                    style={{ ["--i" as any]: i }}
                    key={`cell-${s}-${x}-${i}`}
                  />
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
