# SelectColumn

The SelectColumn is a column that allows you to select a row using a checkbox.

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
      <td><a href="#/columns/SelectColumn?id=x">x</a>*</td>
      <td><code>number</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td><a href="#/columns/SelectColumn?id=width">width</a>*</td>
      <td><code>number</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td><a href="#/columns/SelectColumn?id=height">height</a>*</td>
      <td><code>number</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td><a href="#/columns/SelectColumn?id=length">length</a>*</td>
      <td><code>number</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td><a href="#/columns/SelectColumn?id=selected">selected</a>*</td>
      <td><code>Set<number></code></td>
      <td>-</td>
    </tr>
    <tr>
      <td><a href="#/columns/SelectColumn?id=padding">padding</a></td>
      <td><code>number</code></td>
      <td><code>10</code></td>
    </tr>
    <tr>
      <td><a href="#/columns/SelectColumn?id=icons">icons</a></td>
      <td><code>IconType[]</code></td>
      <td><code>[IconType.Group, IconType.More]</code></td>
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

### length

- Type: `number`
- <span style="color: coral;">Required</span>

The number of checkboxes to display.

### selected

- Type: `Set<number>`
- <span style="color: coral;">Required</span>

A set of numbers that represent the selected rows.

## Optional Attributes

### padding

- Type: `number`
- Default: `10`

The padding around the column in pixels.

### icons

- Type: `IconType[]`
- Default: `[IconType.Group, IconType.More]`

A list of what icons to display at the top of the column. See [Icon](../components/Icon.md) for more information.

## Events

This component emits the following events:

- `check`
- `checkAll`
- `dragStart`
- `dragMove`
- `dragStop`
- `mouseHover`
- `mouseRowClick`
- `sort`

See the [Events](../utils/Events.md) documentation to read more about these events.

## Example Usage

<b> Creating a basic select column with 10 checkboxes.</b>

```svelte
<script lang="ts">
  import { SelectColumn } from '@dmvis/dmvis/components';
</script>

<svg width={1000} height={1000}>
  <SelectColumn x={50} width={200} height={800} length={10} selected={new Set()} />
</svg>
```

<b> Creating a basic select column with 10 checkboxes, with some checkboxes already selected.</b>

```svelte
<script lang="ts">
  import { SelectColumn } from '@dmvis/dmvis/components';
</script>

<svg width={1000} height={1000}>
  <SelectColumn x={50} width={200} height={800} length={10} selected={new Set([0, 4, 6])} />
</svg>
```
