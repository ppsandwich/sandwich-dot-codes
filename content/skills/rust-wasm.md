# Rust & WebAssembly

Compiling systems-level logic to client-side WebAssembly modules to achieve high-performance text parsing, syllable counting, and phonetic rhyme matching directly in the browser.

## The Skill

Building low-latency browser experiences requires moving computationally heavy operations off the main thread or out of traditional JavaScript engines. Utilizing **Rust** and **WebAssembly (WASM)** allows developers to run safe, near-native performance code directly inside the browser sandbox. 

Key applications of this skill include:
- **Client-Side Heavy Parsing**: Preprocessing raw text inputs to strip non-lyric metadata (like timestamps or chord brackets) and aligning tokens dynamically.
- **Algorithmic Text Analysis**: Running multiple complex text matching heuristics (such as syllable counting or consonant density profiling) on hundreds of lines of text in under a millisecond.
- **Embedded Static Datasets**: Bundling static resources (such as 2,000-word pronouncing dictionaries or 5,000-word frequency databases) directly within the compiled WASM binary, eliminating external fetch requests and API timeouts.

In Melodestiny, the entire 25-technique pop songwriting analysis engine is written as a Rust library compiled to WebAssembly. By keeping the logic inside WASM, we analyze standard length lyrics in under `200ms` without sending raw intellectual property (user lyrics) to a remote server.

### Tooling Workflow
- **wasm-pack**: Orchestrates compiling the Rust crate targeting `wasm32-unknown-unknown` and outputs optimized JS wrappers.
- **wasm-bindgen**: Handles JS-to-Rust type serialization, exporting structs as TypeScript-compatible objects.
- **wasm-opt**: Shrinks and optimizes the output `.wasm` file sizes for faster web downloads.

---

## Challenges

- **Binary Size Constraints**: Bundling phonetic databases and frequency arrays can quickly swell a `.wasm` file to over 5MB. Shrinking the bundle to a web-optimized sub-2MB gzipped format required compressing raw arrays to static JSON buffers, stripping debug symbols, and running aggressive size optimization steps (`-Oz`).
- **Serialization Overhead**: Passing structured data like nested arrays and maps through `wasm_bindgen` as `JsValue` can add computational overhead. Restructuring the boundary contract to use flat, simple serialization vectors helped keep exchange times negligible.
- **Async Loader Hydration**: Loading WASM dynamically on Next.js hydration requires ensuring the module is loaded before the client attempts analysis, managing loading spinner states cleanly.

---

## Future Improvements

- **Multi-Threaded Analysis**: Using Rust's rayon crate and Web Workers to run parallel grading threads for massive text blocks or multi-file comparisons.
- **Direct WebGL Rendering**: Piping analysis data directly from the WASM memory buffer to a WebGL context for ultra-performant interactive canvas rendering.
- **Shared Rust Core**: Packaging the same core crate inside a Tauri wrapper to deploy native iOS and Android apps without re-writing the analysis engine.
