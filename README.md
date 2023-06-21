# hydrated

Extensions for [Hydra](https://github.com/ojack/hydra).

Inspired by Ritchse [hydra-extensions](https://github.com/ritchse/hydra-extensions).

## How to load extensions

You can load extensions into Hydra with the following syntax:

```js
await loadScript("https://hydrated.savamala.top/hydra-gradient.js")
```

## hydra-gradient

These are functions to make gradients with the specified colors.

Use `gradient2` to create a gradient between two colors:

`gradient2(r0=1,g0=0,b0=,r1=0,g1=0,b1=1,speed=0)`

Examples:

`gradient2(1,0,0,0.8,0,0.8,0).out()` creates a gradient from red to purple.

`gradient2(1,0,0,0.8,0,0.8,2).out()` the same gradient, but now animated.

`gradient2(1,0,0,1,0,1,2).scale(0.4).kaleid(100).out()`.

`gradient2_` is the same as `gradient2` but colors are expressed as arrays: `gradient2_([1,0,0],[0.8,0,0.8],2).out()`.

Use `gradient3` to create a gradient involving three colors:

`gradient3(r0=1,g0=0,b0=,r1=0,g1=0,b1=1,r2=0,g2=1,b2=0,speed=0)`

Examples:

`gradient3(1,0,1,0,1,0,0,0,1,0).out()`

`gradient3(0.8,0,1,0.7,0.7,0,1,0,0,0.2).scale(0.2).out()`

`gradient3(0.8,0,1,0.7,0.7,0,1,0,0,0.2).scale(0.2)
  .blend(gradient2(0,0.6,0,0.7,0,0.3,-0.4)).out()`

`gradient3_` is the same as `gradient3` but colors are expressed as arrays: `gradient3_([0.8,0,1],[0.7,0.7,0],[1,0,0],0.2).scale(0.2).out()`.
