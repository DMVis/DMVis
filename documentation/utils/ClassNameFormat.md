# ClassNameFormat

The `ClassNameFormat` function is a small, but necessary utility function that formats a string into a valid class name. This is useful when you want to use a string as a class name in your Svelte components that may contain spaces or special characters.

### Table of Contents

- [Parameters](#parameters)
- [Returns](#returns)
- [Example Usage](#example-usage)

## Parameters

- `name`: string - The string to be formatted into a class name.

## Returns

- `string`: The formatted class name. It uses the following regex: `/[^a-zA-Z0-9-]/g` to remove any characters that are not letters, numbers, or hyphens.

## Example Usage

Below is an example of how to use the `ClassNameFormat` function in a Svelte component:

```html
<script lang="ts">
  import { ClassNameFormat } from '@dmvis/dmvis/utils';

  const className = ClassNameFormat('My Class Name');
  console.log(className); // 'MyClassName'
</script>
```
