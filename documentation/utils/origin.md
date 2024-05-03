# Origin

To calculate a (new) origin for an element, we have created the `getOrigin` function. This function takes in the dimension of the element, the origin of the element, and the origin of the destination. It returns a number that represents the new origin of the element.

# Origin enums

For both the horizontal and vertical axis, we have created enums to represent the origin of an element. The enums are as follows:

```javascript
export enum OriginX {
  Left = 'left',
  Middle = 'middle',
  Right = 'right',
}

export enum OriginY {
  Top = 'top',
  Middle = 'middle',
  Bottom = 'bottom',
}
```

# getOrigin

The `getOrigin` function takes in the following parameters:

- `dimension`: The dimension of the element.
- `sourceOrigin`: The origin of the element.
- `destinationOrigin`: The origin of the destination.

The function returns a number that represents the new origin of the element.

Below is an example of how to use the `getOrigin` function:

```javascript
originX = OriginX.Left;
originY = OriginY.Top;
rectWidth = 200;
rectHeight = 40;

// Update the text
d3.select('#text-block')
  .attr('x', x + getOrigin(rectWidth, OriginX.Middle, originX))
  .attr('y', y + getOrigin(rectHeight, OriginY.Middle, originY));
```

In the example above, the `getOrigin` function is used to calculate the new origin of the text block. The `x` and `y` variables represent the position of the element. The `rectWidth` and `rectHeight` variables represent the dimension of the element. The `originX` and `originY` variables represent the origin of the element. The `getOrigin` function is used to calculate the new origin of the text block.

It's important to set the new value for `x` or `y` to the result of the `getOrigin` function plus the original value of `x` or `y`. This is because the `getOrigin` function returns the new origin of the element, not the new position of the element.

The `getOrigin` function uses the following helper functions to calculate the new origin:

## mapStartToDestination

This function maps the start of the element to the destination origin. It takes in the following parameters:

- `dimension`: The dimension of the element.
- `destinationOrigin`: The origin of the destination.

The function returns a number that represents the new origin of the element.

## mapMiddleToDestination

This function maps the middle of the element to the destination origin. It takes in the following parameters:

- `dimension`: The dimension of the element.
- `destinationOrigin`: The origin of the destination.

The function returns a number that represents the new origin of the element.

## mapEndToDestination

This function maps the end of the element to the destination origin. It takes in the following parameters:

- `dimension`: The dimension of the element.
- `destinationOrigin`: The origin of the destination.

The function returns a number that represents the new origin of the element.

# getFlippedOrigin

The `getFlippedOrigin` function takes in the following parameter:

- `origin`: An origin.

The function returns the opposite origin enum value. The mappings are as follows:

OriginX.Left -> OriginX.Right
OriginX.Middle -> OriginX.Middle
OriginX.Right -> OriginX.Left
OriginY.Top -> OriginY.Bottom
OriginY.Middle -> OriginY.Middle
OriginY.Bottom -> OriginY.Top
