# Spacer

To space elements depending on the data, you can use the Spacer function. This will work with either width or height

## Spacer

The `Spacer` function takes in the following parameters:

- `dimension`: The dimension of the element
- `marginLow`: The margin closest to the origin
- `marginHigh`: The margin furthest from the origin

The function returns a number that represents the needed gap between elements to space them between the given dimension.

You can see an example of how `Spacer` works below:

```javascript
Spacer($width, $marginLeft, $marginRight, data[0].length);
```
