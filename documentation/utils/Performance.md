# Performance

The `Performance` function is used to benchmark the performance of functions used in the DMVis library. To ensure the speed of the library, a function can be wrapped within this function to see the time it takes to execute. The results will be pushed to `stdout` and can be found in the console of the browser.

## Table of contents

- [Parameters](#parameters)
- [Returns](#returns)
- [Example](#example)

## Parameters

- `function`: The function that you want to benchmark. Please provide the name only, so without the `()`.
- `args`: Any arguments you would normally pass to the function are added as parameters.

> Note: Functions from within a class that refer to `this` will not work with this function.

## Returns

The function executes the given function as a callback, starts and stops a timer around it and returns any value(s) that the given function returns.

- `Promise<any|undefined>`: The return value of the given function or `undefined` if the function does not return anything. Wrapped in a promise for async handling.

## Example

Below is an example of how to use the `Performance` function:

```html
<script lang="ts">
  import { Performance } from '@dmvis/dmvis/utils';

  const myFunction = (a: number, b: number) => {
    return a + b;
  };

  Performance('myFunction', 1, 2).then((result) => {
    console.log(result); // 3
  });
</script>
```
