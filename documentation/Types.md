# Types

To make the library more flexible and easier to use, we have defined a number of types that can be used in the library for TypeScript users. These types are used to define the types of the props that are passed to the components. Below is a list of all the types that are used in the library.

## Available Types

- [UndefineableString](#undefineablestring)
- [Opacity](#opacity)
- [Position](#position)
- [NumberAuto](#numberauto)
- [Theme](#theme)
- [Alignment](#alignment)
- [Visibility](#visibility)
- [Direction](#direction)
- [ScaleLinear](#scalelinear)
- [ScaleBand](#scaleband)
- [Filter](#filter)

### UndefineableString

```javascript
UndefineableString = string | undefined;
```

A string that can also be set to `undefined`

### Opacity

```javascript
Opacity = number | string;
```

Opacity is a number between 0 and 1.\
0 generally represents fully transparent and 1 generally represents fully opaque. Can also be a string representing a percentage between 0% and 100%.

### Position

```javascript
Position = 'left' | 'right' | 'top' | 'bottom';
```

The position of something to be displayed on screen. Mostly used in Dynamic Axes, whether to place the axes to the top, bottom, left or right of the graph for example.

### NumberAuto

```javascript
NumberAuto = number | 'auto';
```

Any number value that also has an 'auto' option. The 'auto' option decides the number for you.

### Theme

```javascript
Theme = 'light' | 'dark';
```

The theme of a component.\
Options are: light (black text on white background) and dark (white text on black background).

![Theme options for Tooltip](../media/tooltip_themes.png ':size=250')

### Alignment

```javascript
Alignment = 'start' | 'end' | 'spaced';
```

Alignment of something (i.e. in Axis the side of the column where the axis is placed).

### Visibility

```javascript
Visibility = 'none' | 'alwaysVisible' | 'visibleOnHighlight';
```

Setting this to `'none'`, nothing will be drawn.\
Setting this to `'alwaysVisible'`, means that it will always be drawn.\
Setting this to `'visibleOnHighlight'`, means that it will only be drawn when it receives the class `'highlighted'`, the numbers will become visible.

### Orientation

```javascript
Orientation = 'horizontal' | 'vertical';
```

Whether something is to be placed in a `horizontal`or `vertical` orientation.

### ScaleLinear

```javascript
ScaleLinear = D3ScaleLinear<number, number>;
```

A wrapper over the D3 linear scale

### ScaleBand

```javascript
ScaleBand = D3ScaleBand<string>;
```

A wrapper over the D3 band scale

### Filter

```javascript
Filter = { min: number; max: number };
```

Filters numerical values and matches them against a minimum and maximum.
