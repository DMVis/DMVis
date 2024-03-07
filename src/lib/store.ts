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
    this.marginTop = writable(20);
    this.marginBottom = writable(20);
    this.marginLeft = writable(20);
    this.marginRight = writable(20);
    this.width = writable(640);
    this.height = writable(400);
    this.minX = writable(0);
    this.maxX = writable(20);
    this.minY = writable(0);
    this.maxY = writable(20);
  }

  get xScale() {
    return derived(
      [this.marginLeft, this.marginRight, this.width, this.minX, this.maxX],
      ([$marginLeft, $marginRight, $width, $minX, $maxX]) =>
        scaleLinear()
          .domain([$minX, $maxX])
          .range([$marginLeft, $width - $marginRight])
    );
  }

  get yScale() {
    return derived(
      [this.marginBottom, this.marginTop, this.height, this.minY, this.maxY],
      ([$marginBottom, $marginTop, $height, $minY, $maxY]) =>
        scaleLinear()
          .domain([$minY, $maxY])
          .range([$height - $marginBottom, $marginTop])
    );
  }
}

export const graphStore = new GraphStore();
