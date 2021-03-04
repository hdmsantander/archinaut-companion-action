# Archinaut companion action 

This action is a companion to the Archinaut Action. It updates pull requests (if they exist) with the results of the execution of the Archinaut action, it can also upload the results of the scan.

The project is compiled using **ncc**.

```
ncc build index.js --license licenses.txt
```

## Inputs

### `results`

**Required** The CSV filename containing the archinaut results. Default is *archinaut.csv*

## Example usage of action

_.github/workflows/main.yml_

```
- name: Archinaut companion
  id: archinaut-companion
  uses: hdmsantander/archinaut-companion-action@main
  with:
    results: ${{ env.workspace }} archinaut.csv
    AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
    AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
    REGION: us-east-2
```
