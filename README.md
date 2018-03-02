# EchoHub Hubber

Local daemon to support EchoHub interactions

## Installation

TODO: Downloads for windows and Mac

``` bash
npm install hubber
```

## Usage

TODO: How to run this as a daemon

``` bash
hubber
```

## Based On

This project should be base lined against
* project: https://github.com/chentsulin/electron-react-boilerplate
* 0.13.2 (2018.1.31) + git:586b84 (2018-02-03)

## Development

After checking out the repo, run `npm test` to run the tests.

To release a new version:

* Update package.json to new version *Don't use yarn version*

Every commit will push to GitHub release with that version as well as staging S3
buckets.

For final release

* Merge to production branch
* Publish the release on GitHub when done.
* Bump the version.

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/echohubio/hubber. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](contributor-covenant.org) code of conduct.

## License

The gem is available as open source under the terms of the [ISC License](http://opensource.org/licenses/ISC).
