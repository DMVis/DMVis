# ThrowError

ThrowError is a function in the DMVis library that both throws an error in the console and displays the error in the DOM.

# ThrowError

The `ThrowError` function takes in the following parameters:

- `title`: The title of the error.
- `message`: The message describing the error.
- `component`: The component where the error is thrown.

The function creates a message container in the DOM of the website, containing all the given information and also throws an error with the same information.

See an example of how `ThrowError` works below:

```javascript
throw ThrowError('Error', 'Oops, something went wrong.', 'ThrowError');
```
