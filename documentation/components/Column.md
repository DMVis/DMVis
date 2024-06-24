# Column

The column is a component that represents a column in a table. It can be used to display data in a table or to create a visual representation of data.

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
      <td><a href="#/components/Draggable">Draggable</td>
      <td>Enables drag-and-drop interactions.</td>
    </tr>
    <tr>
      <td><a href="#/components/Icon.md">Icon</a></td>
      <td>Provides a way to display icons in the UI for visualisations</td>
    </tr>
    <tr>
      <td><a href="#/components/Label.md">Label</a></td>
      <td>Used for the column headers.</td>
    </tr>
  </tbody>
</table>

## Attributes

<table style="width: 50%">
  <thead>
    <tr>
      <th style="width: 33%;">Attribute</th>
      <th style="width: 33%;">Type</th>
      <th style="width: 33%;">Default Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="#components/Column?id=x">x</a>*</td>
      <td><code>number</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td><a href='#components/Column?id=width'>width</a>*</td>
      <td><code>number</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td><a href='#components/Column?id=height'>height</a>*</td>
      <td><code>number</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td><a href='#components/Column?id=type'>type</a>*</td>
      <td><code>ColumnType</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td><a href='#components/COlumn?id=y'>y</a></td>
      <td><code>number</code></td>
      <td><code>100</code></td>
    </tr>
    <tr>
      <td><a href='#components/Column?id=name'>name</a></td>
      <td><code>Position</code></td>
      <td><code>'top'</code></td>
    </tr>
    <tr>
      <td><a href='#components/Column?id=padding'>padding</a></td>
      <td><code>number</code></td>
      <td><code>10</code></td>
    </tr>
    <tr>
      <td><a href='#components/Column?id=icons'>icons</a></td>
      <td><code>IconType[]</code></td>
      <td><code>[]</code></td>
    </tr>
    <tr>
      <td><a href='#components/Column?id=showseparator'>showSeperator</a></td>
      <td><code>boolean</code></td>
      <td><code>true</code></td>
    </tr>
  </tbody>
</table>

## Required Attributes

### x

- Type: `number`
- <span style="color:coral">Required</span>

The x-coordinate of the column.

### width

- Type: `number`
- <span style="color:coral">Required</span>

The width of the column.

### height

- Type: `number`
- <span style="color:coral">Required</span>

The height of the column.

### type

- Type: `ColumnType`
- <span style="color:coral">Required</span>

The type of the column. Influences the rendering of the column. See the `ColumnType` enum for more information.

### ColumnType

An enum, containing types of columns. This can be selected by importing `ColumnType` and using it as the type of the `type` attribute. The types are:

- `'Bar'`
- `'Rank'`
- `'Select'`
- `'Separator'`
- `'Sum'`
- `'Text'`

## Optional Attributes

### y

- Type: `number`
- Default: `100`

The y-coordinate of the column.

### name

- Type: `string`
- Default: `'Column'`

The name is at the top of the column. Set this to the attribute name.

### padding

- Type: `number`
- Default: `10`

The padding around the column in pixels.

### icons

- Type: `IconType[]`
- Default `[]`

A list of icons to display in the top of the column. See [Icon](components/Icon.md) for more information.

### showSeparator

- Type: `boolean`
- Default: `true`

Whether to show the separator line at the bottom of the column header.

## Events

This component emits the following events:

- `dragStart`
- `dragMove`
- `dragStop`
- `filter`
- `group`
- `mouseHover`
- `mouseRowClick`
- `search`
- `sort`

See the [Events](../utils/Events.md) documentation to read more about these events.

## Example Usage

<b>Creating a column.</b>

> Note: In itself the `Column` component does not do anything. Use one of the more specific column components for functionality.

```svelte
<script lang="ts">
  import { Column } from '@dmvis/dmvis/components';
  import { ColumnType } from '@dmvis/dmvis/enums';
</script>

<svg width={500} height={1000}>
  <Column x={100} width={200} height={800} type={ColumnType.Bar} />
</svg>
```
