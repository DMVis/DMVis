# DMVisError

DMVisError is a function in the DMVis library that standardises the way of error handling and messages.

# DMVisError

The `DMVisError` function takes in the following parameters:

- `message`: The message describing the error. Defaults to `'Sorry, something went wrong.'`.
- `component`: The component where the error is thrown. Defaults to `'DMVis'`.

The function takes the parameters and throws an error with a message build up from them.

See an example of how `DMVisError` works below:

```javascript
throw DMVisError('Sorry, something went wrong.', 'DMVis');
```
