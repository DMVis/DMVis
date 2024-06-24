# TextColumn

TextColumn is a column that shows the text of the given column.

## Table of Contents

- [Referenced Components](#referenced-components)
- [Attributes](#attributes)
- [Required Attributes](#required-attributes)
- [Optional Attributes](#optional-attributes)
- [Events](#events)
- [Example Usage](#example-usage)

## Referenced Components

This component utilises the following components:

<table style="width: 50%">
  <thead>
    <tr>
      <th style="width: 20%;">Component</th>
      <th style="width: 80%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="#/components/Column.md">Column</a></td>
      <td>The column is a component that represents a column in a table. It can be used to display data in a table or to create a visual representation of data.</td>
    </tr>
    <tr>
      <td><a href="#/components/Label.md">Label</a></td>
      <td>The label allows you to add text with a background.</td>
    </tr>
  </tbody>
</table>

## Attributes

<table>
  <thead>
    <tr>
      <th>Attribute</th>
      <th>Type</th>
      <th>Default value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="#/columns/TextColumn?id=x">x</a>*</td>
      <td><code>number</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td><a href="#/columns/TextColumn?id=width">width</a>*</td>
      <td><code>number</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td><a href="#/columns/TextColumn?id=height">height</a>*</td>
      <td><code>number</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td><a href="#/columns/TextColumn?id=data">data</a>*</td>
      <td><code>string[]</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td><a href="#/columns/TextColumn?id=padding">padding</a></td>
      <td><code>number</code></td>
      <td><code>10</code></td>
    </tr>
    <tr>
      <td><a href="#/columns/TextColumn?id=name">name</a></td>
      <td><code>string</code></td>
      <td><code>'Column'</code></td>
    </tr>
    <tr>
      <td><a href="#/columns/TextColumn?id=icons">icons</a></td>
      <td><code>IconType[]</code></td>
      <td><code>[IconType.Sort, IconType.Search, IconType.Filter, IconType.More]</code></td>
    </tr>
  </tbody>
</table>

## Required Attributes

### x

- Type: `number`
- <span style="color: coral;">Required</span>

The x-coordinate of the column.

### width

- Type: `number`
- <span style="color: coral;">Required</span>

The width of the column in pixels.

### height

- Type: `number`
- <span style="color: coral;">Required</span>

The height of the column in pixels.

### data

- Type: `string[]`
- <span style="color: coral;">Required</span>

The data to display as text.

## Optional Attributes

### padding

- Type: `number`
- Default: `10`

The padding around the column in pixels.

### name

- Type: `string`
- Default: `'Column'`

The name of the column. It should contain the name of the attribute you're displaying.

### icons

- Type: `IconType[]`
- Default: `[IconType.Sort, IconType.Search, IconType.Filter, IconType.More]`

A list of what icons to display in the top of the column. See [Icon](../components/Icon.md) for more information.

## Events

This component emits the following events:

- `dragStart`
- `dragMove`
- `dragStop`
- `mouseHover`
- `mouseLabelEnter`
- `mouseLabelLeave`
- `mouseRowClick`
- `search`
- `sort`

See the [Events](../utils/Events.md) documentation to read more about these events.

## Example Usage

<b>Creating a `TextColumn` with no interactivity.</b>

```svelte
<script lang="ts">
  import { TextColumn } from '@dmvis/dmvis/components';

  const strings = ['Row 1', 'Row 2', 'Row 3', 'Row 4', 'Row 5'];
</script>

<svg width={1000} height={1000}>
  <TextColumn x={50} height={500} width={200} data={strings} icons={[]} />
</svg>
```

<b>Creating a `TextColumn` with built-in search functionality.</b>

```svelte
<script lang="ts">
  import { TextColumn } from '@dmvis/dmvis/components';

  const inputValues = ['Apple', 'Banana', 'Pear', 'Kiwi', 'Mango'];

  function onSearch(e: CustomEvent) {
    const searchedValue = e.detail.value;
    if (searchedValue !== '') {
      let results: string[] = [];
      inputValues.forEach((value) => {
        if (value.toLowerCase().includes(searchedValue.toLowerCase())) results.push(value);
      });
      console.log('The results from the search are: ', results);
    }
  }
</script>

<svg width={1000} height={1000}>
  <TextColumn x={50} height={500} width={200} data={inputValues} on:search={onSearch} />
</svg>
```
