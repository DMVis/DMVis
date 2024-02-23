<script lang="ts">
  export let x: number; //Note that these coordinates need to be scaled beforehand!
  export let y: number; //Note that these coordinates need to be scaled beforehand!
  export let r: number = 5;
  export let c: string = 'rgb(0, 153, 255)';
  export let borderColor: string = 'black';
  export let borderWidth: number = 1;
</script>

<!--
@component
### Point
The point allows you to plot a point at a given coordinate.
It is used in combination with other components to create a chart.

#### Required attributes
  * x: number             - Scaled x-coordinate of the point
  * y: number             - Scaled y-coordinate of the point

#### Optional attributes
  * r: number             - Radius of the point, defaulted to 5
  * c: string             - Color of the center of the point, defaulted to blue. Can be any hex-code, rgb or plain string colors
  * borderColor: string   - Color of the border of the point, defaulted to Black. Can be any hex-code, rgb or plain string colors
  * borderWidth: number   - Width of the border, defaulted to 1
-->
<circle cx={x} cy={y} {r} stroke={borderColor} fill={c} stroke-width={borderWidth} />
