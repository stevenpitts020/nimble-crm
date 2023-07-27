# Contributing to NimbleFi `backoffice` (crm)

The following is a set of guidelines for contributing to NimbleFi, which are
hosted in the [NimbleFi Group](https://gitlab.com/nimblefi) on GitLab. These are
mostly guidelines, not rules. Use your best judgment, and feel free to propose
changes to this document in a pull request.

## Development Lifecycle

### Getting Started

The development lifecycle starts locally;
see  [Local Development Setup](https://gitlab.com/nimblefi/nimble-crm/-/blob/master/README.md#local-development-setup)
to get started.

### Testing

Tests should be added for any new behaviors and missed behaviors when
refactoring. It is not necessary to, or rather it is technical debt, to add
tests for the sole purpose of coverage. Please do not add a test which asserts
that a data-object returns a value it's holding via a "getter". Do test that a
component returns, or rejects, some combination of values based on inputs.

### Style

Style is personal, but this project attempts to keep a similar code-voice
using [TSLint](https://palantir.github.io/tslint/). Branch pipelines are both
checked by tests and for lint. Changes to tslint's configuration should __
never__ be made within the context of feature development. Further, this project
has undergone several iterations of change to its desired style, as such, there
may be many files which would not pass the current linting configuration; this
is by-design, periodically the codebase may be lint-baselined, but such
baselining should __never__ occur within the context of another change/feature.

### Feature Branches

A feature branch is a development branch which is prefixed with `feature-*`
(e.g. `feature-auth-mfa`). Using this naming convention will create an isolated
feature application
(
see [app-spots:feature](#app-spots)). When public application testing is
required, it is always preferable to use a feature-branch rather than deploying
to the dev or staging. While the reasons for this are myriad; the most simple
explanation is that your work should not have to affect the work of others. Keep
your work isolated, if at all possible, and only deploy to public environments
when absolutely necessary.

### Environment Branches

Environment branches (i.e. `env.*`) hold the actual code which is deployed to
its corresponding [app-spot](#app-spots). These branches cannot be merged
upstream and can only be pushed to from branch's pipeline. While you can pull (
i.e. merge downstream) from such a branch, you __should not__ do so; environment
branches have no guarantee as to their contents and necessarily will deviate
from `master` widely at any given point in time. They can be used as a reference
when understanding differences, for example, between your local checkout and
what is deployed and running in staging, but they should not be considered part
of the main code trunk, `master` is the __only__ source of truth.

### Manual Deployments

Three environments require manual deployments via pressing a button in the CI
pipeline for your branch - `development`, `staging`, and `production`. While it
is unlikely that you will need to deploy any of these during development, there
are several cases why it may be necessary to push the button.

- `>> development` - feature branches handle this 99% of the time, but some
  situations require testing on a public and static domain
- `>> staging` - e.g. you have a feature, or group of features, which the
  business has asked you to make available for demonstration
- `>> production` - your branch has been merged into master and is ready in and
  of itself for GA

### Pull Requests (Merge Requests)

Pull/Merge Requests (PR) should be small and contain a single feature which, by
itself, adds value at the production level. In keeping with this practice, we

1) reduce the complexity of reviewing the code
2) reduce the probability of introducing a bug or causing a regression
3) increase the fidelity between business feature and its corresponding code
4) ensure tests are focused and testing is single purposed and concise

### Definition of Done

Q: I'm "done" with my feature... I've written relevant tests, I've verified it
on my feature branch, I've demoed it on dev for my team, I'm ready to get it
into `master`... how?

A: Simple, pull `master`, then create a PR (Merge Request) from your branch
into `master`. Add one or more reviewers. Wait for reviews, respond to comments,
and merge... done.

Note: Once merged, your feature will be available on `edge` and the pipeline for
the PR will allow deployment to production (`>> production`) if desired. It is
not always the case that you will want to deploy to production, for example, it
may be desirable to wait for other features which are part of a minimally viable
feature-set.

#### App Spots

App Spots are public environments and a versioned public API environment.

| Environment   | Branch            | API/Core     | Location                                | Description                                                   |
|---------------|-------------------|--------------|-----------------------------------------|---------------------------------------------------------------|
| `development` | `env.development` | `dev` v1     | https://backoffice-dev.nimblefi.com     | sanity checking and intra-dev-team demos                      |
| `feature`     | `feature-*`       | `dev` v1     | https://`feature-*`.nimblefi.com        | isolated public feature testing                               |
| `staging`     | `env.staging`     | `staging` v1 | https://backoffice-staging.nimblefi.com | demo, acceptance, and pre-production feature bundled releases |
| `production`  | `env.production`  | `prod` v1    | https://backoffice.nimblefi.com         | general availability                                          |
| `edge`        | `master`          | `prod` v1    | https://backoffice-edge.nimblefi.com    | general availability for pre-production features              |

