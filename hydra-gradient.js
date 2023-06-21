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
        ` float x = _st.x+time*speed;
          float i = 1.0-abs((x - 2.0*(floor(x/2.0)))-1.0);
          vec3 c0 = vec3(r0,g0,b0);
          vec3 c1 = vec3(r1,g1,b1);
          return vec4(mix(c0,c1,i), 1.0);`
    },
].forEach((x) => _hydra.synth.setFunction(x));
