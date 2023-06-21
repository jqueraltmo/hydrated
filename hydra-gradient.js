{
    const getHydra = function () {
        const whereami = window.choo?.state?.hydra
            ? "editor"
            : window.atom?.packages
            ? "atom"
            : "idk";
        switch (whereami) {
            case "editor":
                return choo.state.hydra.hydra;
            case "atom":
                return global.atom.packages.loadedPackages["atom-hydra"]
                    .mainModule.main.hydra;
            case "idk":
                let _h = undefined;
                _h = window._hydra?.regl ? window._hydra : _h;
                _h = window.hydra?.regl ? window.hydra : _h;
                _h = window.h?.regl ? window.h : _h;
                _h = window.H?.regl ? window.H : _h;
                _h = window.hy?.regl ? window.hy : _h;
                return _h;
        }
    };
    window._hydra = getHydra();
    window._hydraScope = _hydra.sandbox.makeGlobal ? window : _hydra.synth;
}

[
    {
        name: "gradientX",
        type: "src",
        inputs: [
            {
                type: "float",
                name: "r0",
                default: 1,
            },
            {
                type: "float",
                name: "g0",
                default: 0,
            },
            {
                type: "float",
                name: "b0",
                default: 0,
            },
            {
                type: "float",
                name: "r1",
                default: 0,
            },
            {
                type: "float",
                name: "g1",
                default: 0,
            },
            {
                type: "float",
                name: "b1",
                default: 1,
            },
            {
                type: "float",
                name: "speed",
                default: 0,
            },
        ],
        glsl:
        ` float i = (_st.x + time*speed) - 2.0*(floor((_st.x+time*speed)/2.0));
          float r,g,b;
          if (i<=1.0) {
            r = mix(r0, r1, i);
            g = mix(g0, g1, i);
            b = mix(b0, b1, i);
          } else {
            r = mix(r1, r0, i-1.0);
            g = mix(g1, g0, i-1.0);
            b = mix(b1, b0, i-1.0);
          }
          return vec4(r, g, b, 1.0);`
    },
].forEach((x) => _hydra.synth.setFunction(x));
