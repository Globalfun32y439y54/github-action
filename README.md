<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/Globalfun32y439y54/github-action/refs/heads/main/icon/logo-White.png">
    <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/Globalfun32y439y54/github-action/refs/heads/main/icon/logo-Dark.png">
    <img width="340" height="137" src="https://raw.githubusercontent.com/Globalfun32y439y54/github-action/refs/heads/main/icon/logo-Dark.png">
  </picture>
</p>

# GitHub Badge Creator
<div align="center">
A GitHub action to manage and synchronize localization resources with your Crowdin project
</div>

<div align="center">

[**`Examples`**](/EXAMPLES.md) |
[**`Wiki`**]()

[![test](https://github.com/Globalfun32y439y54/github-action/actions/workflows/test-action.yml/badge.svg)](https://github.com/Globalfun32y439y54/github-action/actions/workflows/test-action.yml)
[![GitHub Used by](https://img.shields.io/static/v1?label=Used%20by&message=1&color=brightgreen&logo=github&cacheSeconds=10000)](https://github.com/Globalfun32y439y54/github-action/network/dependents)
[![GitHub release (latest by date)](https://img.shields.io/github/v/release/Globalfun32y439y54/github-action?logo=github&cacheSeconds=5000)](https://github.com/Globalfun32y439y54/github-action/releases/latest)
[![GitHub contributors](https://img.shields.io/github/contributors/Globalfun32y439y54/github-action?cacheSeconds=5000)](https://github.com/Globalfun32y439y54/github-action/graphs/contributors)
[![GitHub](https://img.shields.io/github/license/Globalfun32y439y54/github-action?cacheSeconds=50000)](https://github.com/Globalfun32y439y54/github-action/blob/master/LICENSE)

</div> 

# Usage

Set up a workflow in *.github/workflows/crowdin.yml* (or add a job to your existing workflows).

Read the [Configuring a workflow](https://help.github.com/en/articles/configuring-a-workflow) article for more details on creating and setting up GitHub workflows.

## Sample workflow

```yaml
name: Badge Creator

on:
  push:
    branches: [ main ]

jobs:
  badge:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4.2.2

      - name: badge-creator
        uses: Globalfun32y439y54/github-action@V1.0.11
        with:
            token: ${{ secrets.TOKEN }}
            project_id: ${{ secrets.PROJECT_ID }}

      - name: Commit and Push Outputs
        run: |
          git config --global user.name "github-actions[bot]"
          git config --global user.email "github-actions[bot]@users.noreply.github.com"
          git add **/badge.svg
          git commit -m "Updaed Your Badge" || echo "No changes to commit"
          git push
```

Enter the `PROJECT_ID` and `TOKEN` secrets under the Repository settings -> Secrets and variables -> Actions > Repository secrets.

### Supported options

| Option                     | Description                                                                                        | Example value                |
|----------------------------|----------------------------------------------------------------------------------------------------|------------------------------|
| `token`                    | Your Crowdin API token so it can get your translations                                             | `${{ secrets.TOKEN }}`       |
| `project_id`               | You Crowdin Project ID so it can get the right translations                                        | `${{ secrets.PROJECT_ID }}`  |
| `output_path`              | The path your .svg file is saved to                                                                | `./icon`                     |
| `language_rename_map`      | So you rename the name of the translations in the .svg file                                        | `{"German":"Deutsch","Spanish":"Español"}`            |
| `toggledefault`            | This allow you set add your default language into the .svg file                                    | `false` (default)            |
| `defaultlanguage`          | This is the feild you add the progress and name of the default language                            | Scroll Down To Default Language Example |




### Default Language Example
```json
  { "name": "English", "progress": 100, "url": "https://crowdin.com/project/bettercanvas", "color": "#2eccaa" }
```

#### Supported options for default language

| Option                     | Description                                                                                        | Example value                |
|----------------------------|----------------------------------------------------------------------------------------------------|------------------------------|
| `name`                     | The name of the default language                                                                   | `English`                    |
| `progress`                 | The total progress of the language (Dont add a % sign. It adds it for you)                         | `100`                        |
| `url`                      | The url to the language strings                                                                    | `https://crowdin.com/project/bettercanvas`                |
| `color`                    | This depends of the progress of your language: <br/>Progress > 90, color = #2eccaa, <br/>Progress > 50, color = #38f, <br/>Progress > 0, color = #f6664c | `#2eccaa`                    |
