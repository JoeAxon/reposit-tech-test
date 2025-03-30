import * as fs from 'fs';
import * as csv from 'fast-csv';

type CsvData = {[key: string]: string};

async function getCsvData(filename: string): Promise<CsvData[]> {
  return await new Promise((res, rej) => {
    const rows: {[key: string]: any}[] = [];

    fs.createReadStream(filename)
      .on('error', (error) => rej(error))
      .pipe(csv.parse({ headers: true }))
      .on('data', r => rows.push(r))
      .on('end', () => res(rows))
  });
}

export { getCsvData, CsvData };
