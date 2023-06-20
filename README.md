# hydrated

Extensions for [Hydra](https://github.com/ojack/hydra).

Inspired by Ritchse [hydra-extensions](https://github.com/ritchse/hydra-extensions).

## How to load extensions

You can load extensions into Hydra with the following syntax:

```js
await loadScript("https://hydrated.savamala.top/hydra-gradient.js")
```

## hydra-gradient

At this moment there is only one funcion, `gradientX`, which allows to create gradients between two colors:

`gradientX(r0=1,g0=0,b0=,r1=0,g1=0,b1=1,speed=0)`

Examples:

`gradientX(1,0,0,0.8,0,0.8,0).out()` creates a gradient from red to purple.

`gradientX(1,0,0,0.8,0,0.8,2).out()` the same gradient, but now animated.

`gradientX(1,0,0,1,0,1,2).scale(0.4).kaleid(100).out()`.

---
