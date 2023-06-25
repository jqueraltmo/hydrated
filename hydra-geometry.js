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

{
    const gS = _hydraScope.osc().constructor.prototype;
    gS.fit = function() {
        return this.scale(1,1,()=>window.innerWidth/window.innerHeight);
    }
}

[
    {
        name: "spiral",
        type: "coord",
        inputs: [
            {
                type: "float",
                name: "at0",
                default: 3.14,
            },
            {
                type: "float",
                name: "at1",
                default: 0,
            },
            {
                type: "float",
                name: "speed",
                default: 0,
            },
        ],
        glsl:
        ` vec2 xy = _st - vec2(0.5);
          float r = length(xy);
          float ang = mix(at0,at1,r) + speed*time;
          xy = mat2(cos(ang),-sin(ang), sin(ang),cos(ang))*xy;
          xy += 0.5;
          return xy;`
    },
    {
        name: "radial",
        type: "coord",
        inputs: [
            {
                type: "float",
                name: "parts",
                default: 8,
            },
            {
                type: "float",
                name: "from",
                default: 0.5,
            },
            {
                type: "float",
                name: "to",
                default: 2,
            },
        ],
        glsl:
        ` vec2 xy = _st - vec2(0.5);
          float a = atan(xy.y,xy.x);
          float m = (1.0+sin(a*parts))/2.0;
          float r = length(xy) / (from + m * (to-from));
          return vec2(r*cos(a)+0.5, r*sin(a)+0.5); `
    },
    {
        name: "toPolar",
        type: "coord",
        inputs: [],
        glsl:
        ` vec2 xy = _st - vec2(0.5);
          return vec2(length(xy),atan(xy.y,xy.x)) + vec2(0.5);`
    },
    {
        name: "toCartesian",
        type: "coord",
        inputs: [],
        glsl:
        ` vec2 ra = _st - vec2(0.5);
          return vec2(ra.x*cos(ra.y)+0.5, ra.x*sin(ra.y)+0.5); `
    },
].forEach((x) => _hydra.synth.setFunction(x));
