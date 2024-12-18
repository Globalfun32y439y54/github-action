# Badge Creator Usage Examples

- [Basic Config](#basic-config)
- [Translations export options configuration](#translations-export-options-configuration)
- [Triggers](#triggers)
  - [Cron schedule](#cron-schedule)
  - [Manually](#manually)
  - [When a localization file is updated in the specified branch](#when-a-localization-file-is-updated-in-the-specified-branch)

---

### Basic Config

```yaml
name: Crowdin Action

on:
  push:
    branches: [ main ]

permissions:
  contents: write
  pull-requests: write

jobs:
  crowdin:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Synchronize with Crowdin
        uses: crowdin/github-action@v2
        with:
          upload_sources: true
          upload_translations: true
          download_translations: true
          localization_branch_name: l10n_crowdin_translations

          create_pull_request: true
          pull_request_title: 'New Crowdin translations'
          pull_request_body: 'New Crowdin pull request with translations'
          pull_request_base_branch_name: 'main'
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          CROWDIN_PROJECT_ID: ${{ secrets.CROWDIN_PROJECT_ID }}
          CROWDIN_PERSONAL_TOKEN: ${{ secrets.CROWDIN_PERSONAL_TOKEN }}
```

### Translations export options configuration

```yaml
name: Crowdin Action

on:
  push:
    branches: [ main ]

jobs:
  crowdin:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Synchronize with Crowdin
        uses: crowdin/github-action@v2
        with:
          upload_sources: true
          upload_translations: false
          download_translations: true

          # Export options
          skip_untranslated_strings: true
          export_only_approved: true
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          CROWDIN_PROJECT_ID: ${{ secrets.CROWDIN_PROJECT_ID }}
          CROWDIN_PERSONAL_TOKEN: ${{ secrets.CROWDIN_PERSONAL_TOKEN }}
```

## Triggers

### Cron schedule

```yaml
on:
  schedule:
    - cron: '0 */12 * * *' # Every 12 hours - https://crontab.guru/#0_*/12_*_*_*
```

### Manually

```yaml
on:
  workflow_dispatch:
```

### When a localization file is updated in the specified branch

```yaml
on:
  push:
    paths:
      - 'src/locales/en.json'
    branches: [ main ]
```

### When a new GitHub Release is published

```yaml
on:
  release:
    types: [published]
```

### Dealing with concurrency

```yaml
on:
  push:
    branches:
      - main
concurrency:
  group: ${{ github.workflow }}-${{ github.event.pull_request.number || github.ref }}
  cancel-in-progress: true
```

### Handling parallel runs

In case your action fails when a build is in progress (409 error code), you need to configure the workflow in a way to avoid parallel runs.

```yaml
strategy:
  max-parallel: 1
```

[Read more](https://github.com/crowdin/github-action/wiki/Handling-parallel-runs)

## Outputs

### `pull_request_url`, `pull_request_number`

There is a possibility to get the URL or number of the created Pull Request. You can use it in the next steps of your workflow.

```yaml
# ...
- name: Crowdin
  uses: crowdin/github-action@v2
  id: crowdin-download
  with:
    download_translations: true
    create_pull_request: true
    env:
      CROWDIN_PROJECT_ID: ${{ secrets.CROWDIN_PROJECT_ID }}
      CROWDIN_PERSONAL_TOKEN: ${{ secrets.CROWDIN_PERSONAL_TOKEN }}

- name: Enable auto-merge for the PR
  if: steps.crowdin-download.outputs.pull_request_url
  run: gh pr --repo $GITHUB_REPOSITORY merge ${{ steps.crowdin-download.outputs.pull_request_url }} --auto --merge
  env:
    GITHUB_TOKEN: ${{secrets.GITHUB_TOKEN}}

- name: Approve the PR
  if: steps.crowdin-download.outputs.pull_request_url
  run: gh pr --repo $GITHUB_REPOSITORY review ${{ steps.crowdin-download.outputs.pull_request_url }} --approve
  env:
    GITHUB_TOKEN: ${{secrets.GITHUB_TOKEN}}
```