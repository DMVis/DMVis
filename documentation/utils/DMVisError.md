# DMVisError

DMVisError is a function that standardises the way of error handling and messages in the DMVis library. It is used to throw errors with a standardised message format, displaying the component where the error occurred and a custom message.

## Table of contents

- [Parameters](#parameters)
- [Throws](#throws)
- [Example](#example)

## Parameters

- `message`: string - The message describing the error. Defaults to `'Sorry, something went wrong.'`. It is advised to use a custom message to describe the error and let the user know what went wrong and how to fix it.
- `component`: string - The component where the error is thrown. Defaults to `'DMVis'`.

## Throws

- `Error`: An error with the message built from the `message` and `component` parameters.

## Example

See an example of how `DMVisError` works below:

```html
<script lang="ts">
  import { DMVisError } from '@dmvis/dmvis/utils';

  throw DMVisError(
    'Sorry, something went wrong. Please try again by changing your input.',
    'DMVisComponent'
  );
</script>
```
