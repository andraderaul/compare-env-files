# compare-env-files 1.0.0

Check your file envs through github actions

## Features

- Compare two file envs to certify if their have the same keys

## Parameters

`firstEnv`
**Required**, File path to the **Path to the firstEnv file** so that it knows where to find the file that contains the keys property.

`secondEnv`
**Required**, File path to the **Path to the secondEnv file** so that it knows where to find the file that contains the keys property.

## Example

```yaml
jobs:
  build:
    runs-on: ubuntu-latest

    steps:
        - name: Compare env files
        uses: andraderaul/compare-env-files@v0.3.0
        with:
          firstEnv: .env.local
          secondEnv: .env.staging
```
