# Events

Events are a way to communicate between different parts of the code. They are used to notify that something has happened. For example, when a user clicks a button, an event is triggered to notify the rest of the code that the button has been clicked.

# How to use events

If you want to subscribe to an event you can use the `on` method. This method takes the name of the event in the format of `on:event` and a callback function. The callback function will be called every time the event is triggered.

```svelte
<Component on:event={handleEvent} />
```

Inside the event handler, you can access the event object. The event object contains information about the event that was triggered. Each has its own properties, so you should check the events to see what properties are available inside the `event.detail` object. Below is an example of how to access the full event details.

```typescript
function handleEvent(event: CustomEvent) {
  console.log(event.detail);
}
```

# Functions

Here is a list of all the events that are used in DMVis.

- [axisOrderChanged](#axisOrderChanged)
- [check](#check)
- [checkAll](#checkAll)
- [dragStart](#dragStart)
- [dragMove](#dragMove)
- [dragStop](#dragStop)
- [filter](#filter)
- [group](#group)
- [mouseBarClick](#mouseBarClick)
- [mouseBarEnter](#mouseBarEnter)
- [mouseBarLeave](#mouseBarLeave)
- [mouseHover](#mouseHover)
- [mouseLabelEnter](#mouseLabelEnter)
- [mouseLabelLeave](#mouseLabelLeave)
- [mouseIconClick](#mouseIconClick)
- [mouseIconEnter](#mouseIconEnter)
- [mouseIconLeave](#mouseIconLeave)
- [mouseLabelClick](#mouseLabelClick)
- [mouseLabelEnter](#mouseLabelEnter)
- [mouseLabelLeave](#mouseLabelLeave)
- [mousePointClick](#mousePointClick)
- [mousePointEnter](#mousePointEnter)
- [mousePointLeave](#mousePointLeave)
- [mouseRowClick](#mouseRowClick)
- [remove](#remove)
- [renderAxis](#renderAxis)
- [scroll](#scroll)
- [search](#search)
- [sort](#sort)

## axisOrderChanged

The `axisOrderChanged` event is triggered when the user changes the order of the axes.

### Components using this event

- [DynamicAxis](../components/dynamicaxis.md)

### Event Properties

- `axisOrder` - The new order of the axes

## check

`check` dispatches an event when the user checks a checkbox.

### Components using this event

- [SelectColumn](../columns/selectcolumn.md)

### Event Properties

- `checked` - A boolean value indicating whether the checkbox is checked or not.
- `row` - The row that the checkbox belongs to.

## checkAll

`checkAll` dispatches an event when the user checks the checkbox at the top of the SelectColumn. This event is used to check all the checkboxes in the column.

### Components using this event

- [SelectColumn](../columns/selectcolumn.md)

### Event Properties

- `checked` - A boolean value indicating whether the checkbox is checked or not.

## dragStart

This event is called when the user starts dragging the component inside the `Draggable` wrapper. Specifically, this means that if the user has clicked on this, this event will fire the first time the mouse is moved.

### Components using this event

- [Axis](../components/axis.md)
- [BarColumn](../columns/barcolumn.md)
- [Column](../components/column.md)
- [Draggable](../components/draggable.md)
- [DynamicAxis](../components/dynamicaxis.md)
- [RankColumn](../columns/rankcolumn.md)
- [SelectColumn](../columns/selectcolumn.md)
- [SumColumn](../columns/sumcolumn.md)
- [TextColumn](../columns/textcolumn.md)

### Event Properties

- elementName: `string` - This is the parameter that is passed to the `Draggable` wrapper, used for identifying which component is being dragged.

## dragMove

This event is called while the user is dragging the component inside the `Draggable` wrapper. Specifically, this means that if the user has clicked on this, the events will fire as long as the user keeps their mouse button down. The event fires every time the mouse is moved.

### Components using this event

- [Axis](../components/axis.md)
- [BarColumn](../columns/barcolumn.md)
- [Column](../components/column.md)
- [Draggable](../components/draggable.md)
- [DynamicAxis](../components/dynamicaxis.md)
- [RankColumn](../columns/rankcolumn.md)
- [SelectColumn](../columns/selectcolumn.md)
- [SumColumn](../columns/sumcolumn.md)
- [TextColumn](../columns/textcolumn.md)

### Event Properties

- elementName: `string` - This is the parameter that is passed to the `Draggable` wrapper, which is used for identifying which component is being dragged.
- movementX: `number` - The number of pixels that the mouse moved in the horizontal direction.
- movementY `number` - The number of pixels that the mouse moved in the vertical direction.

## dragStop

This event is called when the user stops dragging the component inside the `Draggable` wrapper. Specifically, this means that if the user has clicked on this, the event will fire the next time the user lets the mouse button go.

### Components using this event

- [BarColumn](../columns/barcolumn.md)
- [Column](../components/column.md)
- [Draggable](../components/draggable.md)
- [RankColumn](../columns/rankcolumn.md)
- [SelectColumn](../columns/selectcolumn.md)
- [SumColumn](../columns/sumcolumn.md)
- [TextColumn](../columns/textcolumn.md)

### Event Properties

- elementName: `string` - This is the parameter that is passed to the `Draggable` wrapper, used for identifying which component is being dragged.

## filter

An event which handles the filtering of the data. It contains either text or numerical data to filter by.

### Components using this event

- [BarColumn](../columns/barcolumn.md)
- [Column](../components/column.md)
- [FilterColumn](../columns/filtercolumn.md)
- [SumColumn](../columns/sumcolumn.md)

### Event Properties

- `column` - The name of the column.
- `value` - Either a string or a number representing the value to filter by.
- `isMin` - A boolean value indicating whether the filter should be a minimum or maximum filter.

## group

An event which handles the grouping of the data. Contains the name of the column to group by.

### Components using this event

- [Column](../components/column.md)
- [SelectColumn](../columns/selectcolumn.md)
- [SumColumn](../columns/sumcolumn.md)

### Event Properties

- `column` - The name of the column to group by.
- `isGrouped` - A boolean value indicating whether the column is grouped or not.

## mouseBarClick

Fire an event when the user clicks on a bar.

### Components using this event

- [Bar](../components/bar.md)

### Event Properties

- `name` - The name of the bar. This is set by the parent component and is used to identify the bar.

## mouseBarEnter

Fire an event when the mouse of a user enters a bar.

### Components using this event

- [Bar](../components/bar.md)
- [BarColumn](../columns/barcolumn.md)

### Event Properties

- `name` - The name of the bar. This is set by the parent component and is used to identify the bar.

## mouseBarLeave

Fire an event when the mouse of a user leaves a bar.

### Components using this event

- [Bar](../components/bar.md)
- [BarColumn](../columns/barcolumn.md)

### Event Properties

- `name` - The name of the bar. This is set by the parent component and is used to identify the bar.

## mouseHover

This event is triggered when the user hovers over a component. This is mainly used for highlighting rows.

### Components using this event

- [BarColumn](../columns/barcolumn.md)
- [Column](../components/column.md)
- [RankColumn](../columns/rankcolumn.md)
- [SelectColumn](../columns/selectcolumn.md)
- [SumColumn](../columns/sumcolumn.md)
- [TextColumn](../columns/textcolumn.md)

### Event Properties

- `row` - A number representing the row that the user is hovering over.

## mouseLabelEnter

An event that is fired when the mouse enters a label.

### Components using this event

- [Label](../components/label.md)
- [TextColumn](../columns/textcolumn.md.md)

### Event Properties

- `name` - The name of the label.

## mouseLabelLeave

An event that is fired when the mouse leaves a label.

### Components using this event

- [Label](../components/label.md)
- [TextColumn](../columns/textcolumn.md.md)

### Event Properties

- `name` - The name of the label.

## mouseIconClick

An event that is triggered when the user clicks on an icon.

### Components using this event

- [Icon](../components/icon.md)

### Event Properties

- `x` - A number representing the x-coordinate of the mouse.
- `y` - A number representing the y-coordinate of the mouse.

## mouseIconEnter

An event that is triggered when the user hovers over an icon.

### Components using this event

- [Icon](../components/icon.md)

### Event Properties

- `x` - A number representing the x-coordinate of the mouse.
- `y` - A number representing the y-coordinate of the mouse.

## mouseIconLeave

An event that is triggered when the user stops hovering over an icon.

### Components using this event

- [Icon](../components/icon.md)

### Event Properties

- `x` - A number representing the x-coordinate of the mouse.
- `y` - A number representing the y-coordinate of the mouse.

## mouseLabelClick

An event that is fired when the user clicks on a label.

### Components using this event

- [Label](../components/label.md)

### Event Properties

- `name` - The name of the label.

## mouseLabelEnter

An event that is fired when the mouse enters a label.

### Components using this event

- [Label](../components/label.md)

### Event Properties

- `name` - The name of the label.

## mouseLabelLeave

An event that is fired when the mouse leaves a label.

### Components using this event

- [Label](../components/label.md)

### Event Properties

- `name` - The name of the label.

## mousePointClick

An event that is fired when the user clicks on a point.

### Components using this event

- [Point](../components/point.md)
- [Scatterplot](../visualisations/Scatterplot.md)

### Event Properties

- `name` - The name of the point.

## mousePointEnter

An event that is fired when the mouse enters a point.

### Components using this event

- [Point](../components/point.md)
- [Scatterplot](../visualisations/Scatterplot.md)`

### Event Properties

- `name` - The name of the point.
- `x` - The x-coordinate of the point.
- `y` - The y-coordinate of the point.

## mousePointLeave

An event that is fired when the mouse leaves a point.

### Components using this event

- [Point](../components/point.md)
- [Scatterplot](../visualisations/Scatterplot.md)

### Event Properties

- `name` - The name of the point.
- `x` - The x-coordinate of the point.
- `y` - The y-coordinate of the point.

## mouseRowClick

An event that is triggered when the user clicks on a row.

### Components using this event

- [BarColumn](../columns/barcolumn.md)
- [Column](../components/column.md)
- [RankColumn](../columns/rankcolumn.md)
- [SelectColumn](../columns/selectcolumn.md)
- [SumColumn](../columns/sumcolumn.md)
- [TextColumn](../columns/textcolumn.md)

### Event Properties

- `row` - A number representing the row that the user clicked on.

## remove

An event that is triggered when a column is removed from the visualisation.

### Components using this event

- [BarColumn](../columns/barcolumn.md)
- [Column](../components/column.md)
- [RankColumn](../columns/rankcolumn.md)
- [SelectColumn](../columns/selectcolumn.md)
- [SumColumn](../columns/sumcolumn.md)
- [TextColumn](../columns/textcolumn.md)

### Event Properties

- `column` - The name of the column that is being removed.

## renderAxis

An event that is triggered when an `Axis` component is rendered.

### Components using this event

- [Axis](../components/axis.md)
- [DynamicAxis](../components/dynamicaxis.md)

## scroll

An event that is triggered when the user uses the scrolling functionality in a component that is wrapped by the `Scrollable` component.

### Components using this event

- [Scrollable](../components/scrollable.md)

## search

An event that is triggered when the user searches for a specific value.

### Components using this event

- [Column](../components/column.md)
- [TextColumn](../columns/textcolumn.md)

### Event Properties

- `column` - The name of the column that the user is searching in.
- `value` - The value that the user is searching for.

## sort

An event that is triggered when the user sorts the data.

### Components using this event

- [BarColumn](../columns/barcolumn.md)
- [Column](../components/column.md)
- [FilterColumn](../columns/filtercolumn.md)
- [SelectColumn](../columns/selectcolumn.md)
- [SumColumn](../columns/sumcolumn.md)
- [TextColumn](../columns/textcolumn.md)

### Event Properties

- `column` - The name of the column that the user is sorting by.
- `sorting` - The sorting order. This can be one of the following values: `asc`, `desc`, or `none`.
