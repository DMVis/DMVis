import { scaleLinear } from 'd3';
import { derived, writable, type Writable } from 'svelte/store';

class GraphStore {
  public marginTop: Writable<number>;
  public marginBottom: Writable<number>;
  public marginLeft: Writable<number>;
  public marginRight: Writable<number>;
  public width: Writable<number>;
  public height: Writable<number>;
  public minX: Writable<number>;
  public maxX: Writable<number>;

  constructor() {
    this.marginTop = writable(20);
    this.marginBottom = writable(20);
    this.marginLeft = writable(20);
    this.marginRight = writable(20);
    this.width = writable(640);
    this.height = writable(400);
    this.minX = writable(0);
    this.maxX = writable(20);
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
      [this.marginLeft, this.marginRight, this.width, this.minX, this.maxX],
      ([$marginTop, $marginBottom, $height]) =>
        scaleLinear()
          .domain([0, 100])
          .range([$height - $marginBottom, $marginTop])
    );
  }
}

export const graphStore = new GraphStore();
