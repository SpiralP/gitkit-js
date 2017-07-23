var RepoUtils = require('../RepoUtils');
var BranchUtils = require('../BranchUtils');
var fetch = require('./fetch');

/**
 * Clone a repository.
 * See http://stackoverflow.com/a/16428258
 *
 * @param {Repository}
 * @param {Transport}
 * @return {Promise}
 */
function clone(repo, transport, opts) {
    return fetch(repo, transport, opts)

    // Finally checkout master
    .then(function(ref) {
        if (repo.isBare()) return;
        return BranchUtils.getCurrent(repo)
            .then(function(currentBranch) {
                return RepoUtils.checkout(repo, 'refs/heads/' + currentBranch);
            });
    });
}

module.exports = clone;
