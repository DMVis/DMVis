# RankColumn

`RankColumn` is a `Column` component that displays the rank of each value in the data array.

## Table of Contents

- [Referenced Components](#referenced-components)`
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

<table style="width: 75%">
  <thead>
    <tr>
      <th>Attribute</th>
      <th>Type</th>
      <th>Default value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="#/columns/RankColumn?id=x">x</a>*</td>
      <td><code>number</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td><a href="#/columns/RankColumn?id=width">width</a>*</td>
      <td><code>number</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td><a href="#/columns/RankColumn?id=height">height</a>*</td>
      <td><code>number</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td><a href="#/columns/RankColumn?id=length">length</a>*</td>
      <td><code>number</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td><a href="#/columns/RankColumn?id=padding">padding</a></td>
      <td><code>number</code></td>
      <td><code>10</code></td>
    </tr>
    <tr>
      <td><a href="#/columns/RankColumn?id=icons">icons</a></td>
      <td><code>IconType[]</code></td>
      <td><code>[IconType.More]</code></td>
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

The number of ranks to display.

## Optional Attributes

### padding

- Type: `number`
- Default: `10`

The padding around the column in pixels.

### icons

- Type: `IconType[]`
- Default: `[IconType.More]`

A list of icons which will be displayed at the top of the column. See [IconType](../components/Icons.md) for the different icons you can use.

## Events

This component emits the following events:

- `dragStart`
- `dragMove`
- `dragStop`
- `mouseHover`
- `mouseRowClick`

See the [Events](../utils/Events.md) documentation to read more about these events.

## Example Usage

<b> Creating a rank column with 10 entries.</b>

```svelte
<script lang="ts">
  import { RankColumn } from '@dmvis/dmvis/components';
</script>

<svg width={1000} height={1000}>
  <RankColumn x={50} width={200} height={800} length={10} />
</svg>
```
