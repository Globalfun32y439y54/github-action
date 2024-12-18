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
[**`Configuration File`**]() |
[**`Wiki`**]()

[![test](https://github.com/Globalfun32y439y54/github-action/actions/workflows/test-action.yml/badge.svg)](https://github.com/Globalfun32y439y54/github-action/actions/workflows/test-action.yml)
[![GitHub Used by](https://img.shields.io/static/v1?label=Used%20by&message=1&color=brightgreen&logo=github&cacheSeconds=10000)](https://github.com/crowdin/github-action/network/dependents?package_id=UGFja2FnZS0yOTQyNTU3MzA0)
[![GitHub release (latest by date)](https://img.shields.io/github/v/release/Globalfun32y439y54/github-action?logo=github&cacheSeconds=5000)](https://github.com/Globalfun32y439y54/github-action/releases/latest)
[![GitHub contributors](https://img.shields.io/github/contributors/Globalfun32y439y54/github-action?cacheSeconds=5000)](https://github.com/Globalfun32y439y54/github-action/graphs/contributors)
[![GitHub](https://img.shields.io/github/license/Globalfun32y439y54/github-action?cacheSeconds=50000)](https://github.com/Globalfun32y439y54/github-action/blob/master/LICENSE)

</div> 

## Supported options

| Option                     | Description                                                                                        | Example value                |
|----------------------------|----------------------------------------------------------------------------------------------------|------------------------------|
| `token`                    | Your Crowdin API token so it can get your translations                                             | `${{ secrets.TOKEN }}`       |
| `project_id`               | You Crowdin Project ID so it can get the right translations                                        | `${{ secrets.PROJECT_ID }}`  |
| `output_path`              | The path your .svg file is saved to                                                                | `./icon`                     |
| `language_rename_map`      | So you rename the name of the translations in the .svg file                                        | `{"German":"Deutsch","Spanish":"Español"}`            |
