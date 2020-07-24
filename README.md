```yaml
name: 'Example workflow'

on: push

jobs:
  example:
    runs-on: ubuntu-18.04

    steps:
    - uses: actions/checkout@v2

    - name: Private actions checkout
      uses: daspn/private-actions-checkout@v2
      with:
        actions_list: '["inmar/my-private-action-1@v1", "inmar/my-private-action-2@v1"]'
        checkout_base_path: ./.github/actions
        github_pat: ${{ secrets.ORG_PAT }}

    - name: Validation
      run: |
        ls -lR ./.github/actions

    # the custom private action will be available on the job's workspace
    - name: 'Using custom private action 1'
      uses: ./.github/actions/my-private-action-1
      with:
        some_arg: test

    - name: 'Using custom private action 2'
      uses: ./.github/actions/my-private-action-2
```
