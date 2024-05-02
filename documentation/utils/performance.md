# Performance

The `Performance` function is used to benchmark the performance of functions used in the DMVis library. To assure the speed of the library function within can be wrapped with this function to see the time it takes to execute. The results will be pushed to `stdout` and can be found in the console of the browser.

The `Performance` function takes in the following parameters:

- `function`: The function that you want to benchmark. Please provide the name only, so without the `()`.
- `args`: Any arguments you would normally pass to the function are added as parameters.

The function executes the given function ass a callback, starts and stops a timer around it and returns any value(s) that the given function returns.

See an example of how `Performance` works below:

```javascript
Performance(function, arg1, arg2);
```

> Note: Functions from within a class that refer to `this` will not work with this function.
