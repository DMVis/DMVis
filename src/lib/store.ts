import { extent, scaleBand, scaleLinear } from 'd3';
import { derived, writable, type Writable } from 'svelte/store';

export class GraphStore {
  public marginTop: Writable<number>;
  public marginBottom: Writable<number>;
  public marginLeft: Writable<number>;
  public marginRight: Writable<number>;
  public width: Writable<number>;
  public height: Writable<number>;
  public padding: Writable<number>;
  public data: Writable<Array<Array<number | string>>>;

  constructor() {
    this.marginTop = writable(40);
    this.marginBottom = writable(40);
    this.marginLeft = writable(40);
    this.marginRight = writable(40);
    this.width = writable(640);
    this.height = writable(400);
    this.padding = writable(0.1);
    this.data = writable([]);
  }

  get columnNames() {
    return derived([this.data], ([$data]) => {
      return $data[0];
    });
  }

  get xScales() {
    return derived(
      [this.data, this.marginLeft, this.marginRight, this.width, this.padding],
      ([$data, $marginLeft, $marginRight, $width, $padding]) => {
        return this.getScales($data, $marginLeft, $marginRight, $width, $padding);
      }
    );
  }

  get yScales() {
    return derived(
      [this.data, this.marginBottom, this.marginTop, this.height, this.padding],
      ([$data, $marginBottom, $marginTop, $height, $padding]) => {
        return this.getScales($data, $marginBottom, $marginTop, $height, $padding);
      }
    );
  }

  getScales = (
    data: Array<Array<number | string>>,
    marginLow: number,
    marginHigh: number,
    dimension: number,
    padding: number
  ) => {
    const scales: Array<d3.ScaleLinear<number, number> | d3.ScaleBand<string>> = [];

    for (let i = 0; i < data[0].length; i++) {
      const columnData: Array<number | string> = [];

      data.slice(1).forEach((row) => {
        columnData.push(row[i]);
      });

      // Check for ScaleLinear of ScaleBand depending on data type
      if (typeof columnData[0] === 'string') {
        scales.push(
          scaleBand()
            .domain(columnData as Array<string>)
            .range([marginLow, dimension - marginHigh])
            .padding(padding)
        );
      } else {
        const domain = extent(columnData as Array<number>);

        if (domain[0] === undefined) {
          throw new Error(
            `Data is incompatable, value range could not be found in column ${data[0][i]}`
          );
        } else {
          scales.push(
            scaleLinear()
              .domain([domain[0], domain[1]])
              .range([marginLow, dimension - marginHigh])
              .nice()
          );
        }
      }
    }
    return scales;
  };
}
