# hydrated

Extensions for [Hydra](https://github.com/ojack/hydra).

Inspired by Ritchse [hydra-extensions](https://github.com/ritchse/hydra-extensions).

## How to load extensions

You can load extensions into Hydra with the following syntax:

```js
await loadScript("https://hydrated.savamala.top/hydra-gradient.js")
```

## hydra-geometry

These are functions that play with coordinates and geometry, specially with polar coordinates.

### fit

`fit` is just a shortcut for `scale(1,1,()=>window.innerWidth/window.innerHeight)`, so you don't need to write all this code just to correct the screen geometry.

Examples:

`shape(4).fit().out()`

### spiral

`spiral` converts anything into a spiral, centered on the screen center. It works by rotating each pixel by a different degree, depending on the distance to the center.

It receives 3 parameters:

- `at0`: the rotation applied at distance 0.
- `at1`: the rotation applied at distance 1. All other values are linearly interpolated from these 2.
- `speed`: the rotation applied through time, just like in `rotate`.

Examples:

`osc(40,0,0).spiral().out()`

`osc(30,0,0.9).spiral(0,20,0.2).fit().out()`

`voronoi(5,1).spiral(0,6,-0.1).rotate(0,0.2).scale(0.5).fit().out()`

### radial

Like `spiral`, `radial` applies a circular transformation, but in this case, it modifies the radius (i.e. the distance to the center), depending on the angle.

It works by dividing the whole circumference in several parts, and applying the same change to each part.

It receives 3 parameters:

- `parts`: how many parts will be computed.
- `from`: change in the radius to the border of each parts. It's multiplicative, so 1 means keeping the same distance, and 2 doubling it.
- `to`: change in the radius in the middle of each part. All other values will be calculated using a modified sine.

Examples:

`osc().radial().out()`

`noise().radial(5,1,0.1).out()`

`osc(40,0).modulate(noise(8,0.2).radial()).out()`

### toPolar

`toPolar` translate Cartesian coordinates to polar coordinates. Vertical lines will become circles, and horizontal lines will become lines converging to the center.

Examples:

`osc(80,0,0).toPolar().fit().out()`

`osc(20,0,0).rotate(Math.PI/2).toPolar().fit().out()`

`voronoi(8,3).color(0.7,0,0.7).toPolar().out()`

### toCartesian

`toCartesian` is the exact opposite to `toPolar`: it converts from polar coordinates to Cartesian coordinates. Applying `toPolar` and then `toCartesian` is the same that doing nothing.

Examples:

`osc().spiral(0,Math.PI*6).toCartesian().out()`

`osc().toPolar().radial(24,0.5,2).toCartesian().out()`

`shape(4).repeat(8,4).scrollX(0,0.1).toPolar().spiral().toCartesian().spiral(8).fit().out()`

### Combining with `hydra-gradient`:

Also, try combining `hydra-geometry` with `hydra-gradient`:

`gradient2(1,0,0,0,0,1,-0.2).toPolar().radial(12,0.1,0.2).fit().out()`

`gradient3().spiral(0,12,-0.2).scale(0.4).kaleid(8).repeat(8,4).out()`

## hydra-gradient

These are functions to make gradients with the specified colors.

### gradient2

Use `gradient2` to create a gradient between two colors:

`gradient2(r0=1,g0=0,b0=,r1=0,g1=0,b1=1,speed=0)`

Examples:

`gradient2(1,0,0,0.8,0,0.8,0).out()` creates a gradient from red to purple.

`gradient2(1,0,0,0.8,0,0.8,2).out()` the same gradient, but now animated.

`gradient2(1,0,0,1,0,1,2).scale(0.4).kaleid(100).out()`.

### gradient2_

`gradient2_` is the same as `gradient2` but colors are expressed as arrays: `gradient2_([1,0,0],[0.8,0,0.8],2).out()`.

### gradient3

Use `gradient3` to create a gradient involving three colors:

`gradient3(r0=1,g0=0,b0=,r1=0,g1=0,b1=1,r2=0,g2=1,b2=0,speed=0)`

Examples:

`gradient3(1,0,1,0,1,0,0,0,1,0).out()`

`gradient3(0.8,0,1,0.7,0.7,0,1,0,0,0.2).scale(0.2).out()`

`gradient3(0.8,0,1,0.7,0.7,0,1,0,0,0.2).scale(0.2)
  .blend(gradient2(0,0.6,0,0.7,0,0.3,-0.4)).out()`

### gradient3_

`gradient3_` is the same as `gradient3` but colors are expressed as arrays: `gradient3_([0.8,0,1],[0.7,0.7,0],[1,0,0],0.2).scale(0.2).out()`.
