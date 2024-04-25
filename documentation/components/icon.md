# Icon

Some visualisations, like LineUp, require icons to be displayed. This component provides a way to display icons in the UI.

## Supported icons

Out of the box, we support the following icons:

- `sort`
- `search`
- `filter`
- `more`

## Required Attributes

### x

- Type: `number`

X-coordinate of the icon.

### y

- Type: `number`

Y-coordinate of the icon.

### icon

- Type: `string`

Name of the icon to display. This can be either one of the supported icons (see above) or an SVG path with your own icon. The icon is 25px by 25px, so you may need to adjust the path to fit within these dimensions.

## Optional Attributes

### color

- Type: `string`
- Default: `#000000`

Color of the icon.

## Example usage

If you want to create a stock sorting icon you can use the following code:

```svelte
<Icon x={10} y={10} icon="sort" />
```

If you want to create a custom icon you can use the following code:

```svelte
<Icon x={10} y={10} icon="M0,0 L10,10 L0,10 Z" />
```
