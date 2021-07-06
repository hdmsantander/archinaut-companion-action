# archinaut companion action

This action is a companion to the [archinaut action](https://github.com/hdmsantander/archinaut-action). It generates a JSON object called _archinaut.json_ with the contents of the [archinaut](https://github.com/hdmsantander/archinaut) CSV results file, plus the following info as atributes within the JSON object:

- Commit ID (idCommit)
- Date of execution (date)
- Name of the repository (id)

The project is compiled using **ncc**.

```BASH
ncc build index.js --license licenses.txt
```

## Inputs

### `results`

**Required** The CSV filename containing the archinaut results. Default is _archinaut.csv_

## Example usage of action

_.github/workflows/main.yml_

```
- name: Archinaut companion
  id: archinaut-companion
  uses: hdmsantander/archinaut-companion-action@main
  with:
    results: ${{ env.workspace }} archinaut.csv
```
