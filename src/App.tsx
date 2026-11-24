import { useEffect, useRef, useState } from "react";
import { Intro } from "./components/Intro";
import { NumberInput } from "./components/NumberInput";
import { Outro } from "./components/Outro";
import { SolveCubic } from "./components/SolveCubic";
import { TextInput } from "./components/TextInput";
import { drawGraph } from "./utils/drawGraph";
import { minMax } from "./utils/minMax";
import { expandedPolynomial, firstDerivative, secondDerivative } from "./utils/summary";

export const App = () => {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [c, setC] = useState(0);
  const [d, setD] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const results = SolveCubic(a, b, c, d);
  const localMinMax = minMax(a, b, c, d);

  useEffect(() => {
    if (canvasRef.current) {
      drawGraph(
        { a, b, c, d },
        {
          r1: { x: Number(results.x1) },
          r2: typeof results.x2 === "number" ? { x: results.x2 } : undefined,
          r3: typeof results.x3 === "number" ? { x: results.x3 } : undefined,
        },
        canvasRef.current,
      );
    }
  }, [a, b, c, d, results]);

  useEffect(() => {
    const history = document.getElementById("history") as HTMLDivElement;
    const form = document.getElementById("form") as HTMLFormElement;

    if (!history || !form) {
      return;
    }

    const saveItem = (a: number, b: number, c: number, d: number) => {
      const div = document.createElement("div");

      div.className = "flex items-center gap-2";
      div.innerHTML = `
        <button type="button" class="history-btn flex-1 text-left p-3 rounded-xl bg-slate-800/40 border border-slate-700 hover:bg-slate-800/70 transition" data-a="${a}" data-b="${b}" data-c="${c}" data-d="${d}">
          <div class="grid grid-cols-4 font-mono text-slate-200 text-sm pointer-events-none">
            <span class="text-center">${a}</span>
            <span class="text-center">${b}</span>
            <span class="text-center">${c}</span>
            <span class="text-center">${d}</span>
          </div>
        </button>
        <button type="button" class="delete-btn px-3 py-2 text-xs font-medium rounded-lg border border-red-500/30 text-red-400 bg-red-500/10 hover:bg-red-500/20 hover:text-red-300 transition">Delete</button>
      `;

      const historyText = document.getElementById("history-text");
      if (historyText) {
        historyText.innerText = "Click a row to load history.";
      }
      history.appendChild(div);
    };

    const formSubmit = (event: SubmitEvent) => {
      event.preventDefault();
      const formData = new FormData(form);
      const a = Number(formData.get("a"));
      const b = Number(formData.get("b"));
      const c = Number(formData.get("c"));
      const d = Number(formData.get("d"));

      saveItem(a, b, c, d);
    };

    const historyClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (target.classList.contains("delete-btn")) {
        target.closest("div")?.remove();
        return;
      }

      const historyBtn = target.closest(".history-btn") as HTMLElement;
      if (historyBtn && historyBtn.dataset) {
        const a = Number(historyBtn.dataset.a);
        const b = Number(historyBtn.dataset.b);
        const c = Number(historyBtn.dataset.c);
        const d = Number(historyBtn.dataset.d);

        setA(a);
        setB(b);
        setC(c);
        setD(d);
      }
    };

    form.addEventListener("submit", formSubmit);
    history.addEventListener("click", historyClick);

    return () => {
      form.removeEventListener("submit", formSubmit);
      history.removeEventListener("click", historyClick);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-200 antialiased selection:bg-cyan-500/20 selection:text-cyan-300">
      <div className="mx-auto w-full max-w-6xl space-y-12 px-4 py-16">
        <Intro />

        <main className="space-y-12">
          <section className="relative overflow-hidden rounded-xl border border-slate-800 bg-[#0b0f19] p-6 shadow-2xl">
            <div className="absolute top-0 left-0 h-full w-1 bg-cyan-500"></div>
            <form className="flex flex-wrap items-center justify-between gap-6" id="form">
              <div className="flex flex-1 flex-wrap justify-start gap-4 sm:gap-6">
                <NumberInput label="a-value [x³]" setValue={setA} value={a} />
                <NumberInput label="b-value [x²]" setValue={setB} value={b} />
                <NumberInput label="c-value [x]" setValue={setC} value={c} />
                <NumberInput label="d-value [c]" setValue={setD} value={d} />
              </div>
              <input
                className="w-full cursor-pointer self-end rounded-md bg-cyan-500 px-6 py-3 text-center font-bold font-mono text-[#07090e] text-xs tracking-wider shadow-cyan-500/10 shadow-lg transition duration-150 hover:bg-cyan-400 active:scale-95 sm:w-auto sm:self-auto"
                type="submit"
                value="SAVE"
              />
            </form>
          </section>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <section className="flex flex-col space-y-6">
              <div className="flex items-center gap-4">
                <h2 className="font-bold font-mono text-slate-500 text-xs uppercase tracking-widest">{"01 // ANALYSIS"}</h2>
              </div>
              <div className="space-y-1 font-mono text-xs">
                <div className="flex items-center justify-between border-slate-900 border-b px-1 py-3 transition hover:bg-slate-900/30">
                  <span className="text-slate-500">[p] parameter</span>
                  <TextInput color="text-slate-200" text="font-medium" value={Number(results?.p ?? 0).toFixed(4)} />
                </div>
                <div className="flex items-center justify-between border-slate-900 border-b px-1 py-3 transition hover:bg-slate-900/30">
                  <span className="text-slate-500">[q] parameter</span>
                  <TextInput color="text-slate-200" text="font-medium" value={Number(results?.q ?? 0).toFixed(4)} />
                </div>
                <div className="flex items-center justify-between border-slate-900 border-b px-1 py-3 transition hover:bg-slate-900/30">
                  <span className="text-slate-500">[Δ] discriminant</span>
                  <TextInput color="text-amber-400" text="font-bold" value={Number(results?.discriminant ?? 0).toFixed(4)} />
                </div>
                <div className="flex items-center justify-between border-slate-900 border-b px-1 py-3 transition hover:bg-slate-900/30">
                  <span className="text-slate-500">[r1] root alpha</span>
                  <TextInput
                    color="text-emerald-400"
                    value={`x: ${typeof results?.x1 === "number" ? Number(results.x1).toFixed(4) : results?.x1} | y: ${typeof results?.y1 === "number" ? Number(results.y1).toFixed(4) : results?.y1}`}
                  />
                </div>
                <div className="flex items-center justify-between border-slate-900 border-b px-1 py-3 transition hover:bg-slate-900/30">
                  <span className="text-slate-500">[r2] root beta</span>
                  <TextInput
                    color="text-emerald-400"
                    value={`x: ${typeof results?.x2 === "number" ? Number(results.x2).toFixed(4) : results?.x2} | y: ${typeof results?.y2 === "number" ? Number(results.y2).toFixed(4) : results?.y2}`}
                  />
                </div>
                <div className="flex items-center justify-between border-slate-900 border-b px-1 py-3 transition hover:bg-slate-900/30">
                  <span className="text-slate-500">[r3] root gamma</span>
                  <TextInput
                    color="text-emerald-400"
                    value={`x: ${typeof results?.x3 === "number" ? Number(results.x3).toFixed(4) : results?.x3} | y: ${typeof results?.y3 === "number" ? Number(results.y3).toFixed(4) : results?.y3}`}
                  />
                </div>
                <div className="flex items-center justify-between border-slate-900 border-b px-1 py-3 transition hover:bg-slate-900/30">
                  <span className="text-slate-500">[min] critical point</span>
                  <TextInput color="text-cyan-400" value={`x: ${minMax(a, b, c, d).minX} | y: ${minMax(a, b, c, d).minY}`} />
                </div>
                <div className="flex items-center justify-between border-slate-900 border-b px-1 py-3 transition hover:bg-slate-900/30">
                  <span className="text-slate-500">[max] critical point</span>
                  <TextInput color="text-purple-400" value={`x: N/A | y: N/A`} />
                </div>
              </div>
            </section>
            <section className="flex flex-col space-y-6">
              <div className="flex items-center gap-4">
                <h2 className="font-bold font-mono text-slate-500 text-xs uppercase tracking-widest">{"02 // SUMMARY"}</h2>
              </div>
              <div className="space-y-1 font-mono text-xs">
                <div className="flex flex-col gap-1 rounded-lg border border-slate-900 bg-[#0b0f19]/40 p-4">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider">f(x) expanded polynomial</span>
                  <TextInput
                    color="text-slate-200"
                    text="text-sm tracking-wide break-all"
                    value={a !== 0 ? expandedPolynomial(a, b, c, d) : "N/A"}
                  />
                </div>
                <div className="flex flex-col gap-1 rounded-lg border border-slate-900 bg-[#0b0f19]/40 p-4">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider">f'(x) first derivative</span>
                  <TextInput
                    color="text-cyan-400"
                    text="text-sm tracking-wide break-all"
                    value={a !== 0 ? firstDerivative(a, b, c) : "N/A"}
                  />
                </div>
                <div className="flex flex-col gap-1 rounded-lg border border-slate-900 bg-[#0b0f19]/40 p-4">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider">f''(x) second derivative</span>
                  <TextInput
                    color="text-purple-400"
                    text="text-sm tracking-wide break-all"
                    value={a !== 0 ? secondDerivative(a, b) : "N/A"}
                  />
                </div>
                <div className="flex flex-col gap-1 rounded-lg border border-slate-900 bg-[#0b0f19]/40 p-4">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider">roots</span>
                  <TextInput
                    color="text-emerald-400"
                    text="text-sm tracking-wide break-all"
                    value={a !== 0 ? (results?.roots ?? "N/A") : "N/A"}
                  />
                </div>
                <div className="flex flex-col gap-1 rounded-lg border border-slate-900 bg-[#0b0f19]/40 p-4">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider">factored form</span>
                  <TextInput
                    color="text-white"
                    text="text-sm tracking-wide wrap-break-word text-left pt-1"
                    value={"No real factorization"}
                  />
                </div>
              </div>
            </section>
            <section className="flex flex-col space-y-6">
              <div className="flex items-center gap-4">
                <h2 className="font-bold font-mono text-slate-500 text-xs uppercase tracking-widest">{"04 // GRAPH"}</h2>
              </div>
              <div className="flex flex-1 items-center justify-center rounded-xl border border-slate-900 bg-[#0b0f19]/50 bg-[radial-gradient(#1e293b_1px,transparent_1px)] bg-size-[16px_16px] p-6 shadow-2xl">
                <canvas
                  className="w-full max-w-100 rounded-md border border-slate-900 bg-[#04060a] shadow-inner"
                  height="400"
                  ref={canvasRef}
                  width="400"
                ></canvas>
              </div>
            </section>
            <section className="flex max-h-140 flex-col space-y-6">
              <div className="flex items-center gap-4">
                <h2 className="font-bold font-mono text-slate-500 text-xs uppercase tracking-widest">{"03 // HISTORY"}</h2>
              </div>
              <div className="custom-scrollbar flex-1 space-y-2 overflow-y-auto pr-2 font-mono text-slate-400 text-xs" id="history">
                <h1 className="font-mono text-slate-500 text-sm italic" id="history-text">
                  No saved equations yet.
                </h1>
              </div>
            </section>
          </div>
        </main>

        <Outro />
      </div>
    </div>
  );
};
