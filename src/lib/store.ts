// Imports
import { extent, scaleBand, scaleLinear, type ScaleBand, type ScaleLinear } from 'd3';
import { derived, writable, type Writable } from 'svelte/store';

// DMVis Imports
import { DMVisError } from '$lib/utils/DMVisError.js';
import { StyleUtils } from '$lib/utils/StyleUtils.js';

export class VisualisationStore {
  public marginTop: Writable<number>;
  public marginBottom: Writable<number>;
  public marginLeft: Writable<number>;
  public marginRight: Writable<number>;
  public width: Writable<number>;
  public height: Writable<number>;
  public padding: Writable<number>;
  public data: Writable<Array<Array<number | string>>>;
  public columns: Writable<Array<string>>;
  public styleUtil: Writable<StyleUtils>;

  constructor() {
    this.marginTop = writable(40);
    this.marginBottom = writable(40);
    this.marginLeft = writable(40);
    this.marginRight = writable(40);
    this.width = writable(640);
    this.height = writable(400);
    this.padding = writable(0.1);
    this.data = writable([]);
    this.columns = writable([]);
    this.styleUtil = writable(new StyleUtils());
  }

  get xScales() {
    return derived(
      [this.data, this.columns, this.marginLeft, this.marginRight, this.width, this.padding],
      ([$data, $columns, $marginLeft, $marginRight, $width, $padding]) => {
        return this.getScales($data, $columns, $marginLeft, $marginRight, $width, $padding);
      }
    );
  }

  get yScales() {
    return derived(
      [this.data, this.columns, this.marginBottom, this.marginTop, this.height, this.padding],
      ([$data, $columns, $marginBottom, $marginTop, $height, $padding]) => {
        return this.getScales($data, $columns, $marginBottom, $marginTop, $height, $padding);
      }
    );
  }

  getScales = (
    data: Array<Array<number | string>>,
    columns: Array<string>,
    marginLow: number,
    marginHigh: number,
    dimension: number,
    padding: number
  ) => {
    if (data.length === 0) {
      return [];
    }

    const scales: Array<ScaleLinear<number, number> | ScaleBand<string>> = [];

    for (let i = 0; i < columns.length; i++) {
      const columnData: Array<number | string> = [];

      data.forEach((row) => {
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
          throw DMVisError(
            `Data is incompatable, value range could not be found in column ${data[0][i]}`,
            'VisualisationStore'
          );
        } else {
          scales.push(
            scaleLinear()
              .domain([domain[1], domain[0]])
              .range([marginLow, dimension - marginHigh])
              .nice()
          );
        }
      }
    }
    return scales;
  };
}
