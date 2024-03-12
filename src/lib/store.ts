import { scaleLinear } from 'd3';
import { derived, writable, type Writable } from 'svelte/store';

export class GraphStore {
  public marginTop: Writable<number>;
  public marginBottom: Writable<number>;
  public marginLeft: Writable<number>;
  public marginRight: Writable<number>;
  public width: Writable<number>;
  public height: Writable<number>;
  public minX: Writable<number>;
  public maxX: Writable<number>;
  public minY: Writable<number>;
  public maxY: Writable<number>;
  constructor() {
    this.marginTop = writable(40);
    this.marginBottom = writable(40);
    this.marginLeft = writable(40);
    this.marginRight = writable(40);
    this.width = writable(640);
    this.height = writable(400);
    this.minX = writable(0);
    this.maxX = writable(100);
    this.maxY = writable(100);
    this.minY = writable(0);
  }

  get xScale() {
    return derived(
      [this.marginLeft, this.marginRight, this.width, this.minX, this.maxX],
      ([$marginLeft, $marginRight, $width, $minX, $maxX]) =>
        scaleLinear()
          .domain([$minX, $maxX])
          .range([$marginLeft, $width - $marginRight])
          .nice()
    );
  }

  get yScale() {
    return derived(
      [this.marginTop, this.marginBottom, this.height, this.minY, this.maxY],
      ([$marginTop, $marginBottom, $height, $maxY, $minY]) =>
        scaleLinear()
          .domain([$maxY, $minY])
          .range([$height - $marginBottom, $marginTop])
          .nice()
    );
  }
}
